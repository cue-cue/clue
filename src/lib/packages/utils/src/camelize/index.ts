export const camelize = (str: string) => str.replace(/\W+(.)/g, (m, chr) => chr.toUpperCase())
