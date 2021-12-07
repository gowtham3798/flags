const searchText = document.querySelector(".searchText");
const searchBtn = document.querySelector(".btn");
const displayResults = document.querySelector(".displayResult");
const resultDiv = document.querySelector(".result");


 // reseting search box on every refresh
document.addEventListener("DOMContentLoaded",function() {
    searchText.value="";
});

 
//function to be performed during the search
searchBtn.addEventListener("click", function () {
    if(searchText.value===""){
        resultDiv.hidden=true;
        alert("please come up with any letters to search");
    }
    else if(searchText.value!=""){
 const ApiURL = "https://api.jikan.moe/v3/search/anime?q="+`${searchText.value}`;


 //nested-function for every individual results
 function renderResult(result) {
  const resultDiv = document.createElement("div");
  resultDiv.className = "card";
  resultDiv.innerHTML = `
    <h2>${result.title}</h2>
    <img src="${result.image_url}" class="result-photo" />
    <p>Synopsis - ${result.synopsis}</p>
    <p>Episodes - ${result.episodes}</p>
    <p>Score - ${result.score}</p>
    <p>Rated - ${result.rated}</p>
    `;
  displayResults.appendChild(resultDiv);
}

//function to get all results (displays max 20 results)
function renderAll(results) {
  displayResults.innerHTML = "";
  resultDiv.hidden = false;
  let count=0;
  for(let result of results){
      if(result.rated==="PG-13"){ 
        renderResult(result);
         count++;
       if(count===20)break;
      }
  }
}

  //fetching the results based on searchText
let func = async function(ApiURL){
    try{
    const response = await fetch(ApiURL);
    var result = await response.json();
    renderAll(result.results);
    }
    catch(error){
      console.log(error.message);
      alert("try to be more specific")
    }
}
// since fetching is under anonymous function , calling the function    
func(ApiURL);
}
});