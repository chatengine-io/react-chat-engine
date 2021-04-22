module.exports = {
    "tags": ["home", "direct", 'dms'],

    'Try the DMs': function(browser) {
        const page = browser.page.homePage();
        
        page
        .navigate('http://localhost:3009/direct')
        .pause(1500)

        // New DM
        .waitForElementVisible('@newDirectChatInput', 1000, 'Find user name input')
        .waitForElementVisible('@newDirectChatButton', 1000, 'Find new DM button')
        .set('@newDirectChatInput', 'Matthew_Orr')
        .click('@newDirectChatButton')
        .pause(2000)

        // New DM but only one exists
        .waitForElementVisible('@newDirectChatInput', 1000, 'Find user name input')
        .waitForElementVisible('@newDirectChatButton', 1000, 'Find new DM button')
        .set('@newDirectChatInput', 'Matthew_Orr')
        .click('@newDirectChatButton')
        .pause(2000)
        
        // Look for new, empty DM Chat
        .waitForElementVisible('#ce-chat-card-title-Matthew_Orr', 1000, 'Find new DM chat card')
        .waitForElementVisible('#ce-chat-feed-title-Matthew_Orr', 1000, 'Find new DM title')

        // Assert no add person
        .waitForElementNotPresent('@addUserInput', 1000, 'Find no add user input')

        // Send a DM
        .waitForElementVisible('@newMessageInput', 1000, 'Find message form')
        .waitForElementVisible('@newMessageButton', 1000, 'Find send message button')
        .set('@newMessageInput', 'Test-message')
        .click('@newMessageButton')
        .waitForElementVisible('.ce-message-bubble', 1000, 'Find message bubble')

        // Delete DM Chat
        .getLocationInView('@optionsSettings')
        .waitForElementVisible('@optionsSettings', 1000, 'Wait for options drop down')
        .click('@optionsSettings')
        .getLocationInView('@deleteChatButton')
        .waitForElementVisible('@deleteChatButton', 1000, 'Wait for delete chat button')
        .click('@deleteChatButton')

        // Look for new, empty DM Chat
        .waitForElementNotPresent('#ce-chat-card-title-Matthew_Orr', 2000, 'Find no more DM chat card')
        .waitForElementNotPresent('#ce-chat-feed-title-Matthew_Orr', 2000, 'Find no more DM title');
    },
}