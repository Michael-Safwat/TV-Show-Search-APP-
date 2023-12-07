const form=document.querySelector("form");
const button=document.querySelector("button");
const showsList=document.querySelector("#shows")

form.addEventListener('submit',async (e)=>{
  e.preventDefault();

  const searchTerm=form.elements.input.value;
  const shows=await searchForShow(searchTerm);
  console.log(shows);
  
  await displayShowImages(shows);
  form.elements.input.value="";
})

const searchForShow=async (searchTerm)=>{
  const config={params:{q:searchTerm}};
  const shows=await axios.get(`https://api.tvmaze.com/search/shows`,config);
  return shows.data;
}

const displayShowImages=async (shows)=>{
  
  document.getElementById("shows").innerHTML = "";

  for(let i of shows)
  {
    if(i.show.image)
    {
      const img=document.createElement('img');
      img.src=i.show.image.medium;
      showsList.append(img);
    }
  }
}