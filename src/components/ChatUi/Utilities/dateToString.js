export function timeSinceDate(date) {
    const sent = Date(date)
    const day = sent.substr(0, 10)
    const time = sent.substr(15, 6)
    return `${day} at ${time}`
}
