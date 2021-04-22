module.exports = {
  url: 'http://localhost:3009',
  elements: {
    userNameInput: '#home-page-username-input',
    userSecretInput: '#home-page-password-input',
    loginButton: '#home-page-login-button',
    logoutButton: '#home-page-logout-button',
    newChatButton: '#new-chat-plus-button',
    newChatInput: '#ce-new-chat-title-field',
    addUserInput: '#ce-add-username-input',
    newMessageInput: '#msg-textarea',
    newMessageButton: '#ce-send-message-button',
    optionsSettings: '#ce-options-drop-down',
    deleteChatButton: '#ce-delete-chat-button',
    // Direct Chats
    newDirectChatInput: '#new-dc-user',
    newDirectChatButton: '#new-dc-user-btn',
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