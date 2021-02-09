export function timeSinceDate(date) {
    const sent = Date(date)
    const day = sent.substr(0, 10)
    const time = sent.substr(15, 6)
    return `${day} at ${time}`
}

export function daySinceSent(date) {
    if (!date) return ''
    const sent = Date(date)
    return sent.substr(4, 6)
}
