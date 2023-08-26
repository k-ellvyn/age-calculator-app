export default class EventHandler {
    constructor(element) {
        this.element = element;

        this.customEvents = [];
        this.connectedEvents = [];
    };

    new(customEventName, options) {
        if (this.customEvents[customEventName]) {
            return;
        }
        
        this.customEvents[customEventName] = new CustomEvent(customEventName, options);
    };

    fire(customEventName, args) {
        let customEvent = this.customEvents[customEventName];
        customEvent.arguments = args

        this.element.dispatchEvent(customEvent);
        
        delete customEvent.arguments
    };

    connect(eventName, callback, options) {
        if (this.connectedEvents[eventName]) {
            return;
        }
        else if (options && options.once) {
            this.element.addEventListener(eventName, callback, options);
            return;
        }

        this.connectedEvents[eventName] = {
            eventName: eventName,
            callback: callback,
            options: options
        }; 

        this.element.addEventListener(eventName, callback, options);
    };

    disconnect(eventName) {
        let connectedEvent = this.connectedEvents[eventName]
        
        this.element.removeEventListener(connectedEvent.eventName, connectedEvent.callback, connectedEvent.options);
        delete this.connectedEvents[eventName];
    };

    destroy(customEventName) {
        if (!this.customEvents[customEventName]) {
            return;
        }

        this.customEvents[customEventName].remove();
        delete this.customEvents[customEventName]
    };

    remove() {
        for (const customEventName of this.customEvents) {
            this.destroy(customEventName);
        }

        for (const eventName in this.connectedEvents) {
            this.disconnect(eventName);
        }

        delete this.customEvents;
        delete this.connectedEvents;
        
        this.element = undefined;
    };
}