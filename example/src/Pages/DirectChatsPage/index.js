import React, { useState } from 'react'

import { ChatEngine, getOrCreateChat } from 'react-chat-engine'

import { DEVELOPMENT, PROJECT_ID, USER_NAME, USER_SECRET } from '../../consts'

const DirectChatPage = () => {
    const [username, setUsername] = useState('')

    function createDirectChat(creds) {
        getOrCreateChat(
            creds,
            { is_direct_chat: true, usernames: [username] },
            () => setUsername('')
        )
    }

    function renderChatForm(creds) {
        return (
            <div>
                <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <button onClick={() => createDirectChat(creds)}>Create</button>
            </div>
        )
    }

    return (
        <ChatEngine 
            height='100vh'
            development={DEVELOPMENT}
            userName={USER_NAME}
            userSecret={USER_SECRET}
            projectID={PROJECT_ID}
            renderNewChatForm={(creds) => renderChatForm(creds)}
        />
    )
}

export default DirectChatPage