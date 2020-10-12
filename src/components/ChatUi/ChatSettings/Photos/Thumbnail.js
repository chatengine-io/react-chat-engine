import React from 'react'

export default class Thumbnail extends React.Component {

    componentDidMount() {
        // const { attachment } = this.props 
        // var textarea = document.getElementById(`image-${attachment.id}`);
        // console.log(textarea.style.height, textarea.style.width)
        // textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
    }
  
    render() {
        const { attachment } = this.props 

        if (!attachment) { return <div /> }

        return (
            <div style={styles.container}>
                
                <div style={{ paddingTop: '100%' }} />
                
                <img
                    alt={attachment.id}
                    style={styles.image}
                    src={attachment.file}
                    id={`image-${attachment.id}`}
                />
                
            </div>
        )
    }
}

const styles = {
    container: { 
        position: 'relative', 
        width: 'calc(33% - 2px)', 
        border: '1px solid white', 
        display: 'inline-block'
    },
    image: {
        top: '0px', 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        objectFit: 'cover'
    }
}