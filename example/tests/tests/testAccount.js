module.exports = {
    "tags": ["home", "ChatEngine"],

    'Login to chat engine': function(browser) {
        const page = browser.page.homePage();
        
        page
        .navigate()
        // Login
        .waitForElementVisible('@userNameInput', 1000, 'Find user name input')
        .waitForElementVisible('@userSecretInput', 1000, 'Find user secret input')
        .waitForElementVisible('@loginButton', 1000, 'Find login button')
        .set('@userNameInput', 'Adam_La_Morre')
        .set('@userSecretInput', 'pass1234')
        .click('@loginButton')
        .waitForElementVisible('@logoutButton', 2500, 'Find logout button (i.e. logged in)')
        
        // New Chat
        .waitForElementVisible('#new-chat-plus-button', 1000, 'Find new chat button')
        .click('#new-chat-plus-button')
        .waitForElementVisible('#ce-new-chat-title-field', 1000, 'Find new chat input');
        
        browser.setValue('#ce-new-chat-title-field', ['Test-Chat', browser.Keys.ENTER]);

        // Edit Chat
        page
        .navigate()
        .waitForElementVisible('#ce-chat-card-title-Test-Chat', 1000, 'Find new Chat Card')
        .waitForElementVisible('#ce-chat-feed-title-Test-Chat', 1000, 'Find new Chat Feed')

        // Add Person
        
        // Delete Person

        // Send Message
        
        // Delete Chat
        .waitForElementVisible('#ce-options-drop-down', 1000, 'Wait for options dorp down')
        .click('#ce-options-drop-down')
        .waitForElementVisible('#ce-delete-chat-button', 1000, 'Wait for options drop down')
        .click('#ce-delete-chat-button')
        .waitForElementNotPresent('#ce-chat-card-title-Test-Chat', 1000, 'Find no more Chat Card')
        .waitForElementNotPresent('#ce-chat-feed-title-Test-Chat', 1000, 'Find no more Chat Feed')

        // Logout
        .click('@logoutButton')
        .waitForElementVisible('@loginButton', 10000, 'Find login button (i.e. logged out)');
    },
}