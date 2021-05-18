import React from 'react'

import { parseMessage } from './parser'

const Body = props => {
    const sections = parseMessage(props.text)
    return (
        <div className='ce-message-body'>
            { 
                sections.map((section, index) => {
                    if (section.type === 'code') {
                        return (
                            <span>
                                <span 
                                    key={`index_${index}`}
                                    style={{ 
                                        color: '#545454', 
                                        fontFamily: 'Monaco',
                                        fontSize: '13px',
                                        padding: '2px',
                                        borderRadius: '2px',
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >
                                    {section.text}
                                </span>
                                {' '}
                            </span>
                        )
                    }

                    if (section.type === 'link') {
                        return (
                            <span>
                                <a href={section.text} style={{ color: 'inherit' }} key={`index_${index}`}>{section.text}</a>
                                {' '}
                            </span>
                        )
                    }

                    return (
                        <span 
                            key={`section_${index}`}
                            style={{
                                fontWeight: section.type.indexOf('bold') !== -1 ? '600' : 'inherit',
                                fontStyle: section.type.indexOf('italic') !== -1 ? 'italic' : 'normal',
                                textDecoration: section.type.indexOf('strikethrough') !== -1 ? 'line-through' : 'none',
                            }}
                        >
                            {section.text}{' '}
                        </span>
                    )
                }) 
            }
        </div>
    ) 
}

export default Body