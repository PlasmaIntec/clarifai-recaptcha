const express = require('express')
const path = require('path')

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')
            IMAGE_FILE = path.join(DIST_DIR, 'sample.jpg')

app.use(express.static(DIST_DIR))

app.get('/pic', (req, res) => {
	res.sendFile(IMAGE_FILE)
})

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})