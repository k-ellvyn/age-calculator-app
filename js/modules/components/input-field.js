// --{Imports}-- //
// Utility //
import EventHandler from '../utility/event-handler.js'

export default class InputField {
    constructor(inputElement) {
        if (!inputElement)
            return;

        this.element = inputElement;

        this.eventHandler = new EventHandler(this.element);

        this._setupInput();
    };

    _setupInput() {
        if (!this.element) {
            return;
        }

        if (this.element.type === "text" || this.element.type === "number" || this.element.type === "password") {
            this.eventHandler.connect("beforeinput", (event) => {
                let initialValue = this.element.value;
            
                this.eventHandler.connect("input", (event) => {
                    let pattern = /^[0-9]+$/;

                    if ((this.element.value.length > 0 && !pattern.test(this.element.value)) || this.element.value.length > this.element.dataset.charLimit) {
                        this.element.value = initialValue;
                    } 
                }, { once: true })
            }); 
        }
    };

    toggleInvalidity(enable, errorMsg) {
        let inputFieldInfo = this.element.nextElementSibling

        if (enable) {
            this.element.parentElement.classList.add("invalid");
            inputFieldInfo.textContent = errorMsg;
        } 
        else {
            this.element.parentElement.classList.remove("invalid");
            inputFieldInfo.textContent = "";
        }
    };

    remove() {
        this.eventHandler.remove();
        delete this.eventHandler;

        this.element = undefined;
    };
}