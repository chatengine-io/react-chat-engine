module.exports = {
    "tags": ["home", "ChatEngine"],

    'Test ChatEngine component': function(browser) {
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
        .waitForElementVisible('@newChatButton', 1000, 'Find new chat button')
        .click('@newChatButton')
        .waitForElementVisible('@newChatInput', 1000, 'Find new chat input')
        .pause(1000).setValue('@newChatInput', ['Test-Chat', browser.Keys.ENTER]).pause(1000)

        // Edit Chat
        .waitForElementVisible('#ce-chat-card-title-Test-Chat', 5000, 'Find new Chat Card')
        .waitForElementVisible('#ce-chat-feed-title-Test-Chat', 1000, 'Find new Chat Feed')

        // Add Person
        .waitForElementVisible('@addUserInput', 1000, 'Find add user input')
        .set('@addUserInput', '.')
        .waitForElementVisible('#ce-username-option-Alex_Johns', 5000, 'Find Jane Smith')
        .click('#ce-username-option-Alex_Johns')
        
        // Delete Person
        // TODO: We cannot do this at the moment (need hover)

        // Send Message
        .waitForElementVisible('@newMessageInput', 1000, 'Find message form')
        .waitForElementVisible('@newMessageButton', 1000, 'Find send message button')
        .set('@newMessageInput', 'Test-message')
        .click('@newMessageButton')
        .waitForElementVisible('.ce-message-bubble', 1000, 'Find message bubble')
        
        // Delete Chat
        .getLocationInView('@optionsSettings')
        .waitForElementVisible('@optionsSettings', 1000, 'Wait for options drop down')
        .click('@optionsSettings')
        .getLocationInView('@deleteChatButton')
        .waitForElementVisible('@deleteChatButton', 1000, 'Wait for delete chat button')
        .click('@deleteChatButton')
        .waitForElementNotPresent('#ce-chat-card-title-Test-Chat', 5000, 'Find no more Chat Card')
        .waitForElementNotPresent('#ce-chat-feed-title-Test-Chat', 5000, 'Find no more Chat Feed')

        // Logout
        .click('@logoutButton')
        .waitForElementVisible('@loginButton', 10000, 'Find login button (i.e. logged out)');
    },
}