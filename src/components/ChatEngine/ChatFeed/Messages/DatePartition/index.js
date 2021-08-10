import React from 'react'
import { getDateTime, formatDateTime } from '../../../Utilities/timezone'

const DatePartition = props => {
    const { lastCreated, created } = props

    function getDate(date) {
        return date ? date.substr(0, 10) : null
    }

    const lastDate = getDate(lastCreated)
    const thisDate = getDate(created)

    if (lastCreated && lastDate === thisDate) return <div />

    return (
        <div style={styles.dateText} className='ce-message-date-text'>
            { formatDateTime(getDateTime(created, props.offset)) }
        </div>
    )
}

export default DatePartition

const styles = {
    dateText: { 
        width: '100%', 
        textAlign: 'center',
        paddingTop: '4px',
        paddingBottom: '10px',
        fontSize: '15px',
        color: 'rgba(0, 0, 0, .40)'
    }
}