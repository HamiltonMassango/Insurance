// Object 

// Everything related to the quotation and calculations is Insurance 
class Insurance {
    constructor(make, year, level) {
        this.make = make;
        this.year = year;
        this.level = level;
    }
    // Calculate the price for the current quotation 

    calculateQuotation() {
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
    getYearDiffence(year) {
        return new Date().getFullYear() - year;
    }
    // Adds the value based on the level of protoction 
    calculateLevel(price) {
        /*
            Basic insurance is going to increase the value by 30%
            Complete insurance is going increaste the value by 50%
        */
        if (this.level === 'basic') {
            price = price * 1.30;
        } else {
            price = price * 1.50;
        }
        return price;
    }

}




class HTMLUI {
    // Displays the latest 28 years in the select 

displayYears  (){
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

displayError  (message){
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
showResults  (price, insurance){
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
}
