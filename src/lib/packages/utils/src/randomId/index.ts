let randomIdCount = 0
export const randomId = (prefix = '') => `${prefix}${+new Date()}${randomIdCount++}`
