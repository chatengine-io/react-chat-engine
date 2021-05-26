const images = ['jpg', 'jpeg', 'png', 'gif', 'tiff']

export const isImage = (fileName) => {
    const dotSplit = fileName.split('.')
    return dotSplit.length > 0 && images.indexOf(dotSplit[dotSplit.length - 1].toLowerCase()) !== -1
}