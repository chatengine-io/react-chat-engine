module.exports = {
    "tags": ["auth", "authentication", 'login'],

    'Login to logout': function(browser) {
        const page = browser.page.chatPage();
        
        page
        // Go to home
        .pause(3000)
    },

    'Login bad username': function(browser) {
        const page = browser.page.chatPage();

        page
        // Go to home
        .pause(3000)
    },

    'Login bad password': function(browser) {
        const page = browser.page.chatPage();
        
        page
        // Go to home
        .pause(3000)
    },
}