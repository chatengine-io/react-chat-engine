module.exports = {
    url: 'http://localhost:3009/direct_chats',
    elements: {
    },
    commands: [{
      set(element, value) {
        return this
          .click(element)
          .clearValue(element)
          .setValue(element, value)
      }
    }]
  }