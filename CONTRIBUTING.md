# Contributing to Chat Engine

So you're interested in helping out, sweet!

Let's show you what you need to get developer access to the project:

### 1. Create a consts/index.js file.

Create a example/src/consts/index.js file with the following contents. NOTE: Replace the values with the correct parts of _your_ Chat Engine project.

```
export const DEVELOPMENT = false

export const ROOT_URL = 'https://api.chatengine.io/'

export const PROJECT_ID = prod ? '00000000-0000-0000-0000-000000000000'
export const USER_NAME = 'Adam_La_Morre'
export const USER_SECRET = 'pass1234'

export const CHAT_ID = 1
export const CHAT_ACCESS_KEY = 'ca-00000000-0000-0000-0000-000000000000'

```

### 2. Start the project

In the top-level dir, run `yarn` to install deps, then `yarn start` to start the ongiong build.

Additionally the example dir is where we test the newest react-chat-engine instance. Run `yarn` to install deps for the example projects, then run `yarn start` to start the app in the browser.

### Bonus: YouTube video

You can also check out [this YouTube video](https://youtube.com) for a personalized, conversational tutorial on how to help.
