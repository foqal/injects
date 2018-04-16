
String.prototype.extractSymbolsWithRegExp = function (regexp) {
    let text = this;
    let match = regexp.exec(text);
    const symbols = [];
    while (match) {
        const item = match[1];
        symbols.push(item);
        match = regexp.exec(this);
    }
    text = text.replace(regexp, "");

    return {symbols, text};
};
