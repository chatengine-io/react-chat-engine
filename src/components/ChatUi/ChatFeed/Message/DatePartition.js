import React, { Component } from 'react'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const suffix = [
  'st', 'nd', 'rd', 'th', 'th',
  'th', 'th', 'th', 'th', 'th',
  'th', 'th', 'th', 'th', 'th',
  'th', 'th', 'th', 'th', 'th',
  'st', 'nd', 'rd', 'th', 'th',
  'th', 'th', 'th', 'th', 'th',
  'st'
]

export default class DatePartition extends Component {
    getDate(date) {
        return date ? date.substr(0, 10) : null
    }

    formatDate(date_time) {
        const year = date_time.substr(0, 4)
        const month = months[parseInt(date_time.substr(5, 2)) - 1]
        const day = date_time.substr(8, 2)
        const dayDuffix = suffix[parseInt(date_time.substr(8, 2)) - 1]

        var time = date_time.substr(11, 5)
        var timeSuffix = ''

        if(parseInt(time.substr(0, 2)) >= 12){
            if(parseInt(time.substr(0, 2)) > 12){
            time = String(parseInt(time.substr(0, 2)) - 12) + ':' + time.substr(3, 2)
            }
            timeSuffix = 'PM'

        } else {
            timeSuffix = 'AM'
        }

        return time + timeSuffix + ', ' + month + ' ' + day + dayDuffix + ', ' + year
    }

    render() {
        const { lastCreated, created } = this.props

        const lastDate = this.getDate(lastCreated)
        const thisDate = this.getDate(created)

        if (lastCreated && lastDate === thisDate ) {
            return <div />
        }

        return (
            <div style={ styles.dateText }>
                { this.formatDate(created) }
            </div>
        )
    }
}

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