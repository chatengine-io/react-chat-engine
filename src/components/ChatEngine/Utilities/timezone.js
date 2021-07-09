export function getDateTime(date, offset) {
    if (!date) return ''
    
    offset = offset ? offset : 0

    const year = date.substr(0,4)
    const month = date.substr(5,2)
    const day = date.substr(8,2)
    const hour = date.substr(11,2)
    const minute = date.substr(14,2)
    const second = date.substr(17,2)
    
    var d = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
}

// export function parseTime(offset) {
//     const time = nd.toLocaleString().split(', ')[1].split(' ')[0].slice(0, -3)
//     const half = nd.toLocaleString().split(', ')[1].split(' ')[1] // AM or PM
//     return `${time} ${half}`
// }