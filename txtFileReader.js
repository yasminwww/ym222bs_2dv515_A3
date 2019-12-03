'use strict'
const path = require('path')
const fs = require('fs')
const Stream = require('stream')
const readLine = require('readline')
const es = require('event-stream')
const dirPath = path.join(__dirname, 'wikipedia/Words')

/**
 * @param {filePath} folders iterate every file
 */
const iterateFolders = () => {
    try {
        fs.readdir(dirPath, (err, folders) => {
            if (err) throw err
            folders.forEach((filePath) => {
                
                fs.readdir(`${dirPath}/${filePath}`, (err, files) => {
                    if (err) throw err
                    files.forEach(file => {
                        fileReader(path.join(`${dirPath}/${filePath}/${file}`)).then((wordOccurences) => {
                            fs.writeFile('wordCount.json', JSON.stringify(wordOccurences, null, 4), 'utf8', err => {
                                if (err) throw err
                                console.log('success')
                            })
                        })
                    })
                })
            })
        })
    } catch (err) {
        throw err
    }
}
const fileReader = (file) => {
    return new Promise((resolve, reject) => {  
    let data = ''
    let result = {}
    let readStream = fs.createReadStream(file, 'utf8')

    readStream.on('data', chunk => {
        data += chunk
        console.log(data)
    })
        .on('end', () => {
            result = data.replace(/[.]/g, '')
                .split(/\s/)
                .reduce((map, word) =>
                    Object.assign(map, {
                        [word]: (map[word]) ? map[word] + 1 : 1
                    }),
                    {}
                )
            resolve(result)
        })
    })
}

iterateFolders(dirPath)

// const file = fs.createReadStream((`C:/Users/Mosa/School/arkurs3/2dv515/assignment3/kr222if-ym222bs-2dv515-assignment3/wikipedia/Words/Games/7400_series`, 'utf8')).pipe(es.mapSync((line) => {
//     console.log(line)
// }))