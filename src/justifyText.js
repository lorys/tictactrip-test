
const justify = (text) => {
    const maxLength = 80;
    const words = text.split(" ").map((i) => i.trim()).filter(i => i !== "");
    let justified = "";
    let oneLineWords = new Array([]);
    let lastIndex = 0;
    while (words[lastIndex]) {
        let totalLength = 0;
        let wordCount = 0;
        while (words[lastIndex]) {
            if (totalLength+words[lastIndex].length+wordCount >= maxLength)
                break;
            oneLineWords[oneLineWords.length-1].push(words[lastIndex]);
            totalLength += words[lastIndex].length;
            wordCount++;
            lastIndex++;
        }
        oneLineWords.push([]);
    }
    oneLineWords = oneLineWords.map((item) => {
        let tmp = [...item];
        if (tmp.length > 0 && tmp.join("").length < 20)
            return tmp.join(" ")
        while (tmp.length > 0 && tmp.join("").length < maxLength) {
           for (let id = 0; tmp[id] && tmp.join("").length < maxLength; id++)
                tmp[id] = id !== tmp.length-1 ? tmp[id]+" " : tmp[id];
        }
        return tmp.join("");
    });
    return oneLineWords.join("\n");
};

module.exports = justify;