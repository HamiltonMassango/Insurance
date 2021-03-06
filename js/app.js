// Variables 
const form = document.getElementById('request-quote')
const html =  new HTMLUI();

eventListener();

function eventListener(){
    //  Event Listeners 

    document.addEventListener('DOMContentLoaded', () => {
        // Create the <option> for the years 
        
        html.displayYears();
    });
    // When the form is submitted 
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Read the values form the Form 
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
        // Read the values from the radio buttons 
        const level = document.querySelector('input[name="level"]:checked').value;
        if(!!make & !!year & !!level){
            // Clear the previous quotes
            const prevResult = document.querySelector('#result div');
            if(prevResult != null) {
                prevResult.remove();
            }
            // Make the quotation 
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation();
            // Print the result form HTMLUI();
            html.showResults(price, insurance);
        }else{
            html.displayError('All the fields are mandory !');
        }

    });
}

// Object 

// Everything related to the quotation and calculations is Insurance 
function Insurance(make, year, level){
    this.make = make;
    this.year = year;
    this.level = level;
}
// Calculate the price for the current quotation 

Insurance.prototype.calculateQuotation = function (){
    let price;
    const base = 2000;

    // get the make 
    const make = this.make;

    /*

        1 - American 15%
        2 - Asian 5%
        3 - European 35%

    */
   switch (make) {
       case '1':
           price = base * 1.15; 
           break;
       case '2':
           price = base * 1.05; 
           break;
       case '3':
           price = base * 1.35; 
           break;
   }
   // Get the year 
   const year = this.year;
   const difference = this.getYearDiffence(year);

   // Each year the cost od the insurance is going to be 3% cheaper 
   price = price - ((difference * 3) * price) / 100;

   price = this.calculateLevel(price);
   return price;
}

// Returns the difference between years 

Insurance.prototype.getYearDiffence = function (year) {
    return new Date().getFullYear() - year;
}
// Adds the value based on the level of protoction 
Insurance.prototype.calculateLevel = function (price){
        /*
            Basic insurance is going to increase the value by 30%
            Complete insurance is going increaste the value by 50%
        */
       if(this.level === 'basic') {
           price = price * 1.30;
       } else {
           price = price * 1.50;
       }
    return price;
}

function HTMLUI(){}

// Displays the latest 28 years in the select 

HTMLUI.prototype.displayYears = function (){
    // Max & min years 
    const max = new Date().getFullYear(),
          min = max - 20;
    const selectYears = document.getElementById('year');

    for(let i = max; i >= min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYears.appendChild(option);
    }
    
}

HTMLUI.prototype.displayError = function (message){
  // create a div 
  const div = document.createElement("div");
  div.classList = 'error';

  // insert the message 
    div.innerHTML = `
        <p>${message}</p>
    `;
    form.insertBefore(div, document.querySelector('.form-group'));
    setTimeout(function(){
        document.querySelector('.error').remove();
    }, 3000);
}

// Prints the result into the HTMLUI
HTMLUI.prototype.showResults = function (price, insurance){
    // Print the result 
    const result = document.getElementById('result');
    // Create a div for out result  
    const div = document.createElement('div');
    // Get Make from the object an assign a readable name 
    let make = insurance.make;

    switch (make) {
        case '1':
            make = 'American';
            break;
        case '2':
            make = 'Asian';
            break;
        case '3':
            make = 'European';
            break;
        default:
            break;
    }
    // Insert the result 
    div.innerHTML = `
        <p class="header">Summary</p>
        <p>Make : ${make}</p>
        <p>Year : ${insurance.year}</p>
        <p>Level : ${insurance.level}</p>
        <p class="total"> Total : $ ${price}</p>
    `;

    const spinner = document.querySelector('#loading img');
    spinner.style.display = 'block';
    setTimeout(function (){
        spinner.style.display = 'none';
        // Inser this into the HTML
         // Insert this into the HTML
        result.appendChild(div);
    }, 1500);


   
}