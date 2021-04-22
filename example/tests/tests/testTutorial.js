module.exports = {
    "tags": ["home", "JSM", "tutorial"],

    'Try the JSM tutorial 1': function(browser) {
        const page = browser.page.homePage();
        
        page
        .navigate('http://localhost:3009/tutorial')
        .pause(1500)

        // Send a DM
        .waitForElementVisible('@newChatButton', 1000, 'Find new chat button')
        .click('@newChatButton')
        .waitForElementVisible('@newChatInput', 1000, 'Find new chat input');
    },
}