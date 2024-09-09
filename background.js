browser.runtime.onMessage.addListener((message) => {
    
    if (message.tags !== undefined) {
        console.log("Теги:", message.tags);
        browser.storage.local.set({ 'tags': message.tags }, () => {
        console.log('Tags saved:', message.tags);
        });
    };


    if (message.whitelist !== undefined) {
        console.log("Белый список:", message.whitelist);
        browser.storage.local.set({ 'whitelist': message.whitelist }, () => {
        console.log('Whitelist saved:', message.whitelist);
        });
    }

});
