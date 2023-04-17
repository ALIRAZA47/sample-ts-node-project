export const generateUUID = (): string => {
    let uuid = ''
    for (let j = 0; j < 32; j++) {
        if (j === 8 || j === 12 || j === 16 || j === 20) {
            uuid += '-'
        }
        uuid += Math.floor(Math.random() * 16).toString(16)
    }
    return uuid
}
