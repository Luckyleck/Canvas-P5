const fs = require('fs');

function decode(textFile) {
    const fileContent = fs.readFileSync(textFile, 'utf8');

    textLines = fileContent.split(/\r?\n/);

    // convert textLines into an object " 'num': 'word' "
    const dictionary = {};

    textLines.forEach(line => {
        // line format => '123 hello'
        const [number, word] = line.split(' ');

        dictionary[number] = word;
    });

    const keys = Object.keys(dictionary);

    // build pyramid
    let pyramid = [];
    let current = 0;

    for (let i = 0; i < keys.length; i++) {
        const row = [];

        for (let j = 0; j <= i; j++) {
            if (dictionary[current + 1]) {
                row.push(dictionary[current + 1]);
            }
            current++;
        }

        if (row.length) {
            pyramid.push(row);
        }
    }

    const result = pyramid.map(row => {
        // grab last word of each row
        return row[row.length - 1];
    }).join(' '); // join the words as a string

    return result;
}

const messageFile = 'message_file.txt';
console.log(decode(messageFile));


