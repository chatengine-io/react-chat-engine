module.exports = {
    "src_folders" : ["tests/tests"],
    "page_objects_path" : ["tests/tests_pages"],
  
    "webdriver" : {
      "start_process": true,
      "server_path": "node_modules/.bin/chromedriver",
      "port": 9515
    },
  
    "test_settings" : {
      "default" : {
        "desiredCapabilities": {
          "browserName": "chrome"
        }
      }
    }
  }