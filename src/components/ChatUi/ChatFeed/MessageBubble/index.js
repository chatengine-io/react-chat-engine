import React from 'react'

import DatePartition from './DatePartition'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'
import SendingMessage from './SendingMessage'

const Message = props => {
    const { lastMessage, message, sending, nextMessage, chats, activeChat } = props
    
    if (!message || !chats || !activeChat || !chats[activeChat]) { return <div /> }

    const chat = chats[activeChat]

    return (
        <div className='ce-message-and-date'>
            {
                !sending &&
                <DatePartition 
                    lastCreated={lastMessage ? lastMessage.created : null} 
                    created={message.created} 
                />
            }

            {
                sending ? 
                <SendingMessage 
                    chat={chat} 
                    conn={props} 
                    lastMessage={lastMessage} 
                    message={message} 
                    nextMessage={nextMessage} 
                /> :
                <div>
                    {
                        !sending && message.sender_username === props.userName ?
                        <MyMessage 
                            chat={chat} 
                            conn={props} 
                            lastMessage={lastMessage} 
                            message={message} 
                            nextMessage={nextMessage} 
                        /> :
                        <TheirMessage 
                            chat={chat} 
                            conn={props} 
                            lastMessage={lastMessage} 
                            message={message} 
                            nextMessage={nextMessage} 
                        />
                    }
                </div>
            }
        </div>
    ) 
}

export default Message