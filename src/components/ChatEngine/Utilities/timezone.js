export function getDateTime(date, offset) {
    if (!date) return ''
    
    date = date.replace(' ', 'T')
    offset = offset ? offset : 0

    const year = date.substr(0,4)
    const month = date.substr(5,2)
    const day = date.substr(8,2)
    const hour = date.substr(11,2)
    const minute = date.substr(14,2)
    const second = date.substr(17,2)
    
    var d = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
    d.setHours(d.getHours() + offset)
    return d
}

const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }

export function formatTime(dateTime) {
    var time = dateTime.toLocaleString('en-US')
    return time.split(' ')[1].slice(0, -3) + ' ' + time.slice(-2)
}

export function formatDate(dateTime) {
    return dateTime.toLocaleString('en-US', options)
}

export function formatDateTime(dateTime) {
    return formatTime(dateTime) + ', ' + formatDate(dateTime)
}

export function pythonFormatDate(d) {
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minute = d.getMinutes(),
        second = d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hour.length < 2) 
        hour = '0' + hour;
    if (minute.length < 2) 
        minute = '0' + minute;
    if (second.length < 2) 
        second = '0' + second;

    const date = [year, month, day].join('-');
    const time = `${hour}:${minute}:${second}.000000+00:00`
    return `${date} ${time}`
}