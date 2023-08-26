// --{Imports}-- //
// Components //
import TextFieldHandler from './modules/components/input-field.js'
import Form from "./modules/components/form.js";

// Utility //
import CalculateAge from './modules/utility/calculate-age.js';

function main() {
    // --{Variables}-- //
    const app = document.getElementById("app");
    const appForm = document.getElementById("app-form");
    const formHandler = new Form(appForm);

    const printAge = (event) => {
        const resultsYears = document.getElementById("results-years").querySelector(" span");
        const resultsMonths = document.getElementById("results-months").querySelector(" span");
        const resultsDays = document.getElementById("results-days").querySelector(" span");

        const args = event.arguments;

        const [ageDays, ageMonths, ageYears] = CalculateAge({day: args.day.value, month: args.month.value, year: args.year.value});

        // Check if entire date is in the future
        if (ageDays >= 0 && ageMonths >= 0 && ageYears >= 0) {
            resultsDays.textContent = ageDays;
            resultsMonths.textContent = ageMonths;
            resultsYears.textContent = ageYears;     
        }
        else {
            const errorMessage = "Must be in the past"
            setTimeout(() => formHandler.updateInvalidFormInputs({day: errorMessage, month: errorMessage, year: errorMessage}), 1);
        }
    }

    formHandler.eventHandler.connect('submitted', printAge);
}

window.onload = main