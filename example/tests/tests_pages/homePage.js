module.exports = {
  url: 'http://localhost:3009',
  elements: {
    userNameInput: '#home-page-username-input',
    userSecretInput: '#home-page-password-input',
    loginButton: '#home-page-login-button',
    logoutButton: '#home-page-logout-button',
  },
  commands: [{
    assertText(element, expectedText, assertText){
      return this
        .getText(element, function(result) {
          this.assert.equal(
            result.value,
            expectedText,
            assertText
          );
        })
    },
    set(element, value){
      return this
        .click(element)
        .clearValue(element)
        .setValue(element, value)
    }
  }]
}