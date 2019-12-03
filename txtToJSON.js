const fs = require('fs')
const path = require('path')


const stringifyArray = (result) => {
    fs.writeFile('./wordCounts.json', JSON.stringify(result, null, 2), err => {
        if (err) throw err
    
        console.log('Successfully wrote file')

    })
}


const iterateDirectory = () => {
    let arr = []
    const directoryPath = path.join(__dirname, 'wikipedia/Words')
    fs.readdir(directoryPath, function (err, files) {
        if (err) console.log('Unable to scan directory: ' + err)

        files.forEach(async function (file) {
            let filePathArray = file.split(' ')
            filePathArray.forEach(filestring => {
                let obj = {}
                obj[filestring] = fileReader(path.join(`${directoryPath}/${filestring}`))
                arr.push(obj)
            })
        })
        stringifyArray(arr)
    })
}


const fileReader = (file) => {
    try {
        const readStream = fs.readFileSync(file, 'utf8')
        const words = readStream.replace(/[.]/g, '').split(/\s/)

        const frequencyMap = {}
        words.forEach(w  => {
            if (!frequencyMap[w]) {
                frequencyMap[w] = 0
            }
            frequencyMap[w] += 1
        })
        
        return frequencyMap

    // Wiie
    // const map = words.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())

    // let map = new Map([...new Set(words)].map(
    //     x => [x, words.filter(y => y === x).length]
    // ))
    // console.log(map)

    } catch (error) {
        console.log(error)
    }
  
}


// console.log(iterateDirectory())

iterateDirectory()