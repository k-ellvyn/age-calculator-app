export default class FormValidation {
    constructor() {
        this.defaultInvalidMessage = "This field is required"
    }

    validate(form) {
        let valid = true;
        let errors = null;

        for (const [name, data] of Object.entries(form.getFormValues())) {
            let [success, errorMessage] = this[data.type + "Check"](data.value);

            if (!success) {
                valid = false;
                errors = (!errors && {}) || errors;
                errors[name] = errorMessage;
            } 
        };

        return [valid, errors]
    };

    emailCheck(emailAddress) {
        let formattedEmailAddress = String(emailAddress).toLowerCase()

        let expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!formattedEmailAddress || formattedEmailAddress.length < 0 || !expression.test(formattedEmailAddress)) {
            return [false, "Must be a valid email"]
        }
        else {
            return [true, null]
        }
    };

    dayCheck(day) {
        if (day == "") {
            return [false, this.defaultInvalidMessage]
        }
        else if (day > 31 || day < 0 || day.length < 2) {
            return [false, "Must be a valid day"]
        }
        else {
             return [true, null]
        }
    };

    monthCheck(month) {
        if (month == "") {
            return [false, this.defaultInvalidMessage]
        }
       else if (month > 12 || month <= 0 || month.length < 2) {
            return [false, "Must be a valid month"]
       }
       else {
            return [true, null]
        }
    };

    yearCheck(year) { // wip
        const currentYear = new Date().getFullYear();
        
        if (year == "") {
            return [false, this.defaultInvalidMessage]
        }
        else if (year <= 1901) {
            return [false, "Must be after 1901"]
        }
        else if (year > currentYear) {
            return [false, "Must be in the past"]
        }
        else {
            return [true, null]
        }
    };
 }