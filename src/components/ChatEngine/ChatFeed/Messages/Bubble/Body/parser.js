export const parseMessage = (text) => {
    const words = text.split(' ')

    const sections = [
        {text: "", type: { text: true }}
    ]

    words.map(word => {
        let added = false
        
        // Code checks
        if (word.charAt(0) === '`') {
            if (word.charAt(word.length - 1) === '`') {
                word = word.substring(0, word.length - 1)
            }
            sections.push({ text: word.substring(1, word.length), type: { code: true }})
            added = true
        }
        if (word.charAt(word.length - 1) === '`' && sections[sections.length - 1].type === 'code') {
            sections[sections.length - 1].text = `${sections[sections.length - 1].text} ${word.substring(0, word.length - 1)}`
            sections.push({ text: "", type: { text: true }})
            added = true
        }

        // Link Checks
        if (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(word)) {
            sections.push({ text: word, type: { link: true }})
            sections.push({ text: "", type: { text: true }})
            added = true
        }

        if (!added){
            sections[sections.length - 1].text = `${sections[sections.length - 1].text} ${word}`
        }
    })

    return sections
}