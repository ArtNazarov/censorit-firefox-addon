function onSaveWhiteList(message){
    if (message.whitelist !== undefined) {
        console.log("Белый список:", message.whitelist);
        browser.storage.local.set({ 'whitelist': message.whitelist }, () => {
        console.log('Whitelist saved:', message.whitelist);
        });
    }
}

function onSaveTags(message){
    if (message.tags !== undefined) {
        console.log("Теги:", message.tags);
        browser.storage.local.set({ 'tags': message.tags }, () => {
        console.log('Tags saved:', message.tags);
        });
    };
}

function onSavePassword(message){
    if (message.password !== undefined) {
        console.log("Пароль:", message.password);
        browser.storage.local.set({ 'password': message.password }, () => {
        console.log('The password saved:', message.password);
        });
    };
}


function onSaveState(message){
    if (message.state !== undefined) {
        console.log("Состояние:", message.state);
        browser.storage.local.set({ 'state': message.state }, () => {
        console.log('The state saved:', message.state);
        });
    };
}

browser.runtime.onMessage.addListener((message) => {
    
    onSaveWhiteList(message);
    onSaveTags(message);
    onSavePassword(message);
    onSaveState(message);


});
