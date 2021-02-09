const express = require("express")
const app = express()
const router = express.Router()
let dataBuku = require("./database/db_books.json")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get('/api/v1/buku', (req,res) => {
    res.status(200).json(dataBuku)
})

router.get('/api/v1/buku:id', (req,res) => {
    const buku = dataBuku.find(i => i.id === + req.params.id)
    res.status(200).json(buku)
})

router.post('/api/v1/buku', (req,res) => {
    //destructuring isi json
    const {isbn,judul,sinopsis,penulis,genre} = req.body

    const id = dataBuku[dataBuku.length - 1].id + 1
    const isiBuku = {id,isbn,judul,sinopsis,penulis,genre}

    dataBuku.push(isiBuku)
    res.status(201).json(dataBuku)
})

router.put("/api/v1/buku/:id", (req,res) => {
    const id = req.params.id
    dataBuku.filter(buku => {
        if(buku.id == id){
            buku.isbn = req.body.isbn
            buku.judul = req.body.judul
            buku.sinopsis = req.body.sinopsis
            buku.penulis = req.body.penulis
            buku.genre = req.body.genre
            return buku
        }
    })
    res.status(200).json(dataBuku)
})

router.delete('/api/v1/buku/:id', (req,res) => {
    dataBuku = dataBuku.filter(i => i.id !== +req.params.id)
    res.status(200).json({
        message: `Post dengan id ${req.params.id} sudah berhasil dihapus!`
    })
})

module.exports = router