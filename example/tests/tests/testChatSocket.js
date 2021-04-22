module.exports = {
    "tags": ["home", "socket", "feed"],

    'Try the chat socket feed': function(browser) {
        const page = browser.page.homePage();
        
        page
        .navigate('http://localhost:3009/chat_socket')
        .pause(1500)

        // Send a DM
        .waitForElementVisible('.ce-message-bubble', 1000, 'Find message bubble')
        .waitForElementVisible('@newMessageInput', 1000, 'Find message form')
        .waitForElementVisible('@newMessageButton', 1000, 'Find send message button')
        .set('@newMessageInput', 'Test-message')
        .click('@newMessageButton')
        .waitForElementVisible('.ce-message-bubble', 1000, 'Find message bubble');
    },

    'Try the user socket feed': function(browser) {
        const page = browser.page.homePage();
        
        page
        .navigate('http://localhost:3009/user_socket_feed')
        .pause(1500)

        // Send a DM
        .waitForElementVisible('.ce-message-bubble', 1000, 'Find message bubble')
        .waitForElementVisible('@newMessageInput', 1000, 'Find message form')
        .waitForElementVisible('@newMessageButton', 1000, 'Find send message button')
        .set('@newMessageInput', 'Test-message')
        .click('@newMessageButton')
        .waitForElementVisible('.ce-message-bubble', 1000, 'Find message bubble');
        // TODO: This needs to scroll down
    },
}