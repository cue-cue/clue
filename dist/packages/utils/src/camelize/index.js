export const camelize = (str) => str.replace(/\W+(.)/g, (m, chr) => chr.toUpperCase());
