export function timeSinceDate(date) {
    if (!date) return ''

    const day = date.substr(8,2)
    const month = date.substr(5,2)
    const year = date.substr(0,4)

    const hour = date.substr(11,2)
    const minute = date.substr(14,2)
    const second = date.substr(17,2)

    var sent = new Date(`${month} ${day} ${year}`)
    sent.setHours(hour)
    sent.setMinutes(minute)
    sent.setSeconds(second)
    sent = sent.toString()

    const dayStr = sent.substr(0, 10)
    const timeStr = sent.substr(15, 6)
    return `${dayStr} at ${timeStr}`
}

export function daySinceSent(date) {
    if (!date) return ''
    const day = date.substr(8,2)
    const month = date.substr(5,2)
    const year = date.substr(0,4)
    const sent = new Date(`${month} ${day} ${year}`).toString()
    return sent.substr(4, 6)
}
