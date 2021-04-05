import React, { useContext } from 'react'

import { ChatEngineContext } from '../../../../Context'

import DatePartition from './DatePartition'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'
import SendingMessage from './SendingMessage'

const Message = props => {
    const { lastMessage, message, nextMessage, sending, chat } = props

    const { conn } = useContext(ChatEngineContext)

    if (!message || !chat) { return <div /> }

    if (!conn || conn === null) { return <div /> }

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
                    conn={conn} 
                    lastMessage={lastMessage} 
                    message={message} 
                    nextMessage={nextMessage} 
                /> :
                <div>
                    {
                        message.sender_username === conn.userName || message.sender_username === conn.senderUsername ?
                        <MyMessage 
                            chat={chat}
                            conn={conn}
                            lastMessage={lastMessage}
                            message={message}
                            nextMessage={nextMessage}
                        /> :
                        <TheirMessage 
                            chat={chat}
                            conn={conn}
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