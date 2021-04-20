module.exports = {
    "tags": ["home", "ChatEngine"],

    'Login to chat engine': function(browser) {
        const page = browser.page.homePage();
        
        page
        .navigate()
        .waitForElementVisible('@userNameInput', 1000, 'Find user name input')
        .waitForElementVisible('@userSecretInput', 1000, 'Find user secret input')
        .waitForElementVisible('@loginButton', 1000, 'Find login button')
        .set('@userNameInput', 'Adam_La_Morre')
        .set('@userSecretInput', 'pass1234')
        .click('@loginButton')
        .waitForElementVisible('@logoutButton', 10000, 'Find logout button (i.e. logged in)')
        
        .click('@logoutButton')
        .waitForElementVisible('@loginButton', 10000, 'Find login button (i.e. logged out)');
    },
}