// @param { function(): Boolean } condition - A function that returns a bool
// @param { Number } [timeout] - Optional maximum waiting time in ms after rejected

const RepeatUntil = (condition, timeout) => {
    return new Promise((resolve, reject) => {
        const checkCondition = () => {
            console.log('checking', condition());
            
            if (condition) {
                clearInterval(interval);
                resolve();  
            }
        };
        
        const interval = setInterval(checkCondition, 100);
        checkCondition();

        if (!timeout) {
            return;
        }
        
        setTimeout(() => {
            clearInterval(interval);
            reject();
        }, timeout);
    });
}

export default RepeatUntil