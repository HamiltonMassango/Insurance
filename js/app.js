// Variables 





//  Event Listeners 

document.addEventListener('DOMContentLoaded', function (){
    // Create the <option> for the years 
    const html =  new HTMLUI();
    html.displayYears();
});

 
// Object 

function HTMLUI(){}

// Displays the latest 28 years in the select 

HTMLUI.prototype.displayYears = function (){
    // Max & min years 
    const max = new Date().getFullYear(),
          min = max - 20;
    const selectYears = document.getElementById('year');

    for(let i = max; i >= min; i--){
        let option = document.createElement('option');
        console.log(option);
        option.value = i;
        option.textContent = i;
        selectYears.appendChild(option);
    }
    
}