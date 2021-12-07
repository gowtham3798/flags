 // getiing required elements using class name
 const head = document.querySelector(".head");
 const displayResults = document.querySelector(".displayResult");
 


  // reseting search box on every refresh
 document.addEventListener("DOMContentLoaded",function() {
   
const ApiURL = "https://quote-garden.herokuapp.com/api/v3/quotes";


  //nested-function for every individual results
  function renderResult(result) {
   const resultDiv = document.createElement("div");
   resultDiv.className = "card";
   resultDiv.innerHTML = `
     <p>${result.quoteText}</p>
     <h2>"${result.quoteAuthor}"</h2>
     `;
   displayResults.appendChild(resultDiv);
 }

 //function to get all results (displays max 20 results)
 function renderAll(results) {
   displayResults.innerHTML = "";
   for(let result of results){ 
         renderResult(result);
       }
   }
 
   //fetching the results based on searchText
 let func = async function(ApiURL){
     try{
     const response = await fetch(ApiURL);
     var results = await response.json();
     console.log(results);
     renderAll(results.data);
     }
     catch(error){
       console.log(error.message);
       alert("sorry try again one more time friend!!!")
     }
 }
 // since fetching is under anonymous function , calling the function    
 func(ApiURL);
 });