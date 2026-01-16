module.exports = (text) => {
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};
