const express = require("express")
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const aksesBuku = require("./databuku")
app.use(aksesBuku)

app.listen(port, () => {
    console.log("server Siap")
})