const fs = require('fs')
const path = require('path')


const stringifyArray = (result) => {
    fs.writeFile('./wordCounts.json', JSON.stringify(result, null, 2), err => {
        if (err) throw err
    
        console.log('Successfully wrote file')
    })
}


const iterateDirectory = () => {
    const arr = []
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
            // console.log(w)
            if (!frequencyMap[w]) {
                frequencyMap[w] = 0
            }
            frequencyMap[w] += 1
        })
        Object.keys(frequencyMap).forEach(key => frequencyMap[key] === undefined ? delete frequencyMap[key] : '')
        return frequencyMap

    } catch (error) {
        console.log(error)
    }
  
}

// json_array.sort(function(a, b){return a.customer > b.customer? 1: -1;})

// console.log(iterateDirectory())

iterateDirectory()


