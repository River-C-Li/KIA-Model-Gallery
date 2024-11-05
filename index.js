// import { currentImageToShow } from "./exportone.js";
// import { API_URL, API_KEY  } from './exportone.js';

const API_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = "DEMO-API-KEY";

let currentImageToShow;



async function showHistoricPic() //////#5 code execution:click the button to show all historic images,
{
  
  document.getElementById('all-options').style.display = 'none';
  document.getElementById('all-results').style.display = 'block';

  const url = `${API_URL}votes?limit=10&order=DESC`; ///????

  const response = await axios(url,{
    method: "GET",
    headers: {
    'x-api-key': API_KEY
  }
});
  // .then((response) => {     ////return promise fetch data//
  //   return response.json();
  // })
  // .then((data) => {       
 //// const jsonData = await response.json();///return fetch json data,//
     
    response.data.map(function(showData) {   ///use axios data: response.data ///
 
    const imageData = showData.image
 
    let image = document.createElement('img');
     //use the url from the image object
     image.src = imageData.url
            
    let gridCell = document.createElement('div');
    
      // if(showData.value<0)
      // {
      //   gridCell.classList.add('red') 
      // } else {
      //   gridCell.classList.add('green')
      // }
      
    gridCell.classList.add('col-lg');

    gridCell.appendChild(image)
       
    document.getElementById('grid').appendChild(gridCell);
       
    })
  .catch(function(error) {
     console.log(error);
  });
  
}


function showAllOptions() ////#2 code execution: display id"all-options", hide id"all-results"
{
  document.getElementById("grid").innerHTML = '';
  
  document.getElementById('all-options').style.display = 'flex';
  document.getElementById('all-results').style.display = 'none';
  
  showImageToShow()
}

function showImageToShow() //////#3 code execution: fetch current image,
{
  
  const url = `${API_URL}images/search`;

  fetch(url,{
    method: "GET",
    headers: {
    'x-api-key': API_KEY
  }})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    currentImageToShow = data[0];
    document.getElementById("image-to-show").src= currentImageToShow.url;
  });
}

function show(value) //////#4 code execution: user interact to click buttons(L/R),and fetch new image option to post here,
{  
  const url = `${API_URL}shows/`;
  const body = {
    image_id:currentImageToShow.id,
    value
  }
  fetch(url,{
    method:"POST",
    body:JSON.stringify(body),
    headers: {
    'content-type':"application/json",
    'x-api-key': API_KEY
  }})
  .then((response) => {
    showAllOptions()
  })
}

showAllOptions() //#1 code execution



