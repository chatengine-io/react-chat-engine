module.exports = {
    url: 'http://localhost:3001',
    elements: {
      landingPage: '#home-section',
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