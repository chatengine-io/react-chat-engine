import React from 'react'

import { parseMessage } from './parser'

const Body = props => {
    const sections = parseMessage(props.text)
    return (
        <div className='ce-message-body'>
            { 
                sections.map((section, index) => {
                    if (section.type['code']) {
                        return (
                            <span key={`ce_code_${index}`}>
                                <span 
                                    style={{ 
                                        color: '#e01e5a', 
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

                    if (section.type['link']) {
                        return (
                            <span key={`ce_link_${index}`}>
                                <a href={section.text} style={{ color: 'inherit' }}>{section.text}</a>
                                {' '}
                            </span>
                        )
                    }

                    return (
                        <span 
                            key={`ce_text_${index}`}
                            style={{
                                fontWeight: section.type['bold'] ? '600' : 'inherit',
                                fontStyle: section.type['italic'] ? 'italic' : 'normal',
                                textDecoration: section.type['strikethrough'] ? 'line-through' : 'none',
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