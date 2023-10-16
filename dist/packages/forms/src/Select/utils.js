export const getOptionValueKey = (value, key) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
        if (key) {
            //@ts-ignore
            return value[key];
        }
        else {
            //@ts-ignore
            return value.id;
        }
    }
    return value;
};
