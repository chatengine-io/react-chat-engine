import React, { useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import Thumbnail from './Thumbnail'

import SettingsBlock from '../SettingsBlock'


const PhotosSettings = () => {
    const { chats, activeChat } = useContext(ChatEngineContext)  
    const chat = chats && chats[activeChat] 

    if (!chat) return <div />

    function renderPhotos(attachments) {
        return attachments.map((attachment, index) => {
            return <Thumbnail key={`person_${index}`} attachment={attachment} />
        })
    }

    return (
        <div style={{ borderTop: '1px solid #f0f0f0' }} className='ce-photo-section'>
            <SettingsBlock
                label='Photos'
                className='ce-section-title-container ce-photo-title-container'
            >
                <div className='ce-photo-feed'>
                    <div style={{ height: '12px' }} />

                    { renderPhotos(chat.attachments) }
                </div>
            </SettingsBlock>
        </div>
    )
}

export default PhotosSettings
