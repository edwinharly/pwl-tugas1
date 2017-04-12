const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => {
    let judul = ''
    fs.readdir('cerita/', 'utf8', (err, files) => {
        if (err) {
            throw err
        }
        for (let file of files) {
            judul += `<a href="/${ file.split('.')[0] }">`
            judul += file.split('.')[0]
            judul += '</a><br/>'
        }
        res.send(judul)
    })
})

app.get('/:judul', (req, res, next) => {
    let isi = ''
    fs.readFile('cerita/' + req.params.judul + '.txt', 'utf8', (err, data) => {
        if (err) {
            next()
        }
        isi += '<p>' + data + '</p>' + '<a href="/">Back</a>'
        res.send(isi)
    })
})

app.get('*', (req, res) => {
    res.send('404<br/><a href="/">Back</a>')
})

app.listen(8001, () => {
    console.log('8001')
})