// --{Imports}-- //
// Components //
import InputField from './input-field.js';

// Classes //
import FormValidation from '../classes/form-validation.js';

// Utility //
import EventHandler from '../utility/event-handler.js'

export default class Form {
    constructor(formElement) {
        if (!formElement)
            return;

        this.currentForm = formElement;

        this.formValidation = new FormValidation;
        this.eventHandler = new EventHandler(this.currentForm);

        this.eventHandler.new('submitted');

        this._setupForm();
        this._setupFormInputs();
    };

    _setupForm() {
        if (!this.currentForm) {
            return;
        }

        this.eventHandler.connect('submit', (event) => {
            event.preventDefault();
            this._submitForm();
        });
    };

    _setupFormInputs() {
        this.formInputs = {};

        let descendants = this.currentForm.querySelectorAll("*");

        descendants.forEach((descendant) => {
            if (descendant.tagName === 'INPUT') {
                this.formInputs[descendant.name] = new InputField(descendant)
            }
        });
    };

    _submitForm() {
        let [valid, errors] = this.formValidation.validate(this);

        if (valid) {
            this.eventHandler.fire('submitted', this.getFormValues());
            this.resetFormInputs();
            this.updateInvalidFormInputs();
        }
        else {
            this.updateInvalidFormInputs(errors);
        }
    };

    getFormValues() {
        let formValues = {};

        let descendants = this.currentForm.querySelectorAll("*");

        descendants.forEach((descendant) => {
            if (descendant.tagName == 'INPUT') {    
                formValues[descendant.name] = {
                    value: descendant.value,
                    type: descendant.dataset.type
                };
            }
        })
        
        return formValues;
    };

    resetFormInputs() { 
        let descendants = this.currentForm.querySelectorAll("*");

        descendants.forEach((descendant) => {
            if (descendant.tagName === 'INPUT') {
                descendant.value = ""
            }
        });
    };

    updateFormInput(inputName, newValue) {
        let descendants = this.currentForm.querySelectorAll("*");

        descendants.forEach((descendant) => {
            if (descendant.tagName === 'INPUT' && descendant.name === inputName) {
                descendant.value = newValue
                return;
            }
        });
    };

    updateInvalidFormInputs(errors) {
        for (const [inputName, inputField] of Object.entries(this.formInputs)) {
            if (errors && errors[inputName]) {
                let errorMessage = errors[inputName];
                inputField.toggleInvalidity(true, errorMessage);
            }
            else {
                inputField.toggleInvalidity(false);
            }
        }
    }

    remove() {
        this.eventHandler.remove();
        delete this.eventHandler;

        delete this.formValidation;

        for (const [inputName, inputField] of Object.entries(this.formInputs)) {
            this.formInputs[inputName].remove();
            delete this.formInputs[inputName];
        }

        this.currentForm = undefined;
    };
}