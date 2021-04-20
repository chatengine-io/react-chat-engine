import React, { useState } from 'react'

import { ChatEngine, getOrCreateChat } from 'react-chat-engine'

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
            development
            userName={'Adam_La_Morre'}
            userSecret={'pass1234'}
            projectID={'1ed59673-1fd6-46ed-9eb9-56239a6a4f82'}
            renderNewChatForm={(creds) => renderChatForm(creds)}
        />
    )
}

export default DirectChatPage