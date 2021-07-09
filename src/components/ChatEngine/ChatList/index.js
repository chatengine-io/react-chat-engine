import React, { useContext, useEffect, useRef, useState } from 'react'

import { ChatEngineContext } from '../../Context'

import { getLatestChats, getChatsBefore } from '../../../actions/chats'

import _ from 'lodash'

import ChatLoader from './ChatLoader'
import NewChatForm from './NewChatForm'
import ChatCard from './ChatCard'

let count = 50
const interval = 75

const ChatList = props => {
    const didMountRef = useRef(false)
    const [loadChats, setLoadChats] = useState(false)
    const [hasMoreChats, setHasMoreChats] = useState(true)
    const { conn, chats, setChats, setActiveChat } = useContext(ChatEngineContext)

    function renderChats(chats) {
        return chats.map((chat, index) => {
            if (!chat) {
                return <div key={`chat_${index}`} />

            } else if (props.renderChatCard) {
                return <div key={`chat_${index}`}>{props.renderChatCard(chat, index)}</div>
                
            } else {
                return (
                    <div 
                        key={`chat_${index}`}
                        onClick={() => props.onChatClick && props.onChatClick()}
                    >
                        <ChatCard chat={chat} />
                    </div>
                )
            }
        })
    }

    function getDate(date) {
        if (!date) return ''
        const year = date.substr(0,4)
        const month = date.substr(5,2)
        const day = date.substr(8,2)
        const hour = date.substr(11,2)
        const minute = date.substr(14,2)
        const second = date.substr(17,2)
        return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
    }

    function sortChats(chats) {
        return chats.sort((a, b) => { 
            const aDate = a.last_message && a.last_message.created ? getDate(a.last_message.created) : getDate(a.created)
            const bDate = b.last_message && b.last_message.created ? getDate(b.last_message.created) : getDate(b.created)
            return new Date(bDate) - new Date(aDate); 
        })
    }

    function onGetChats(chatList) {
        const oldChats = chats !== null ? chats : {}
        const newChats = _.mapKeys({...chatList}, 'id')
        const allChats = {...oldChats, ...newChats}
        setChats(allChats);
        (count && count > Object.keys(allChats).length) && setHasMoreChats(false);
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true

            getLatestChats(
                props, 
                count, 
                (chats) => {
                    onGetChats(chats)
                    const chatList = sortChats(chats)
                    chatList.length > 0 && setActiveChat(chatList[0].id)
                }
            )
        }
    })

    useEffect(() => {
        if (!loadChats) return;
        setLoadChats(false)

        count = count + interval
        const chatList = chats !== null ? sortChats(Object.values(chats)) : []
        if (chatList.length > 0) {
            const before = chatList[chatList.length - 1].created
            getChatsBefore(props, before, interval, (chats) => onGetChats(chats))
        }
    }, [loadChats, chats])

    const chatList = sortChats(
        chats ? 
        Object.values(chats) : 
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    )

    return (
        <div style={styles.chatListContainer} className='ce-chat-list'>
            <div style={styles.chatsContainer} className='ce-chats-container'>
                { 
                    props.renderNewChatForm ? 
                    props.renderNewChatForm(conn) : 
                    <NewChatForm onClose={props.onClose ? () => props.onClose() : undefined} /> 
                }

                { renderChats(chatList) } 

                { 
                    hasMoreChats && chatList.length > 0 &&
                    <div>
                        <ChatLoader onVisible={() => setLoadChats(true)} />
                        <div style={{  height: '8px' }} />
                    </div>
                }
            </div>
        </div>
    )
}

const styles={
    chatListContainer: { 
        height: '100%', 
        maxHeight: '100vh', 
        overflow: 'scroll', 
        overflowX: 'hidden',
        borderRight: '1px solid #afafaf', 
        backgroundColor: 'white',
        fontFamily: 'Avenir'
    },
    chatsContainer: { 
        width: '100%', 
        height: '100%',
        backgroundColor: 'white', 
        borderRadius: '0px 0px 24px 24px'
    },
}

export default ChatList;
