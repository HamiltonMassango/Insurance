// Variables 
const form = document.getElementById('request-quote')
const html = new HTMLUI();

eventListener();

function eventListener() {
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
        if (!!make & !!year & !!level) {
            // Clear the previous quotes
            const prevResult = document.querySelector('#result div');
            if (prevResult != null) {
                prevResult.remove();
            }
            // Make the quotation 
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation();
            // Print the result form HTMLUI();
            html.showResults(price, insurance);
        } else {
            html.displayError('All the fields are mandory !');
        }

    });
}

