const express = require('express')

const app = express()
const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {

})


app.listen(PORT, () => { console.log('Server is running on: ' + PORT) })