import React from 'react'

const Body = props => {
    let text = props.text ? props.text : ''
    text = text.replaceAll("<p>", "<div>").replaceAll("</p>", "</div>")
    text = text.replaceAll("<a ", `<a style="color: ${ props.myMessage ? 'white' : '#1890ff' };" `)

    return (
        <div className='ce_message' dangerouslySetInnerHTML={{ __html: text }} />
    ) 
}

export default Body