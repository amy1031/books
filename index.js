var express = require('express')
var bodyParser = require('body-parser')
var server = express()
var port = 9001

server.use(bodyParser.json())

server.get('/', function(req, res, next) {
    res.send(200, '<h1>Are you looking for <a href="/books">Books</a>?</h1>')
})

var books = [{
    title: "Catch Me If You Can",
    published: 1980,
    rating: 4.5,
    author: "Frank Abignale"
}, {
    title: "Split Second",
    published: 2015,
    rating: 4.5,
    author: "Douglas E. Richards"
}]

server.get('/books', function(req, res, next) {
    res.send(books)
})

server.get('/books/:id', function(req, res, next) {
    var id = req.params.id

    if(books[id]) {
        res.send(books[id])
    } else {
        res.send(404, {
            error: {
                message: "Sorry, no book at id " + id
            }
        })
    }
})

server.post('/books', function(req, res, next) {
    var newBook = req.body

    if(newBook.title && newBook.published && newBook.rating && newBook.author) {
        books.push(newBook)
        res.send('Book added')
    } else {
        res.send (401, "Sorry, you must include a title, year published, rating, and author")
    }
})

server.put('/books/:id', function(req, res, next){
    var id = req.params.id

    if (books[id]) {
        var book = books[id]
        book.title = req.body.title || book.title
        book.published = req.body.published || book.published
        book.rating = req.body.rating || book.rating
        book.author = req.body.author || book.author
        res.send(book)
    } else {
        res.send (404, "Sorry, no book at that id")
    }
}) 

server.delete('/books/:id', function(req, res, next) {
    var id = req.params.id

    if(books[id]){
        var book = books[id]
        books.splice(book, 1)
        res.send(books)
    } else {
        res.send(404, "Sorry, no book at that id")
    }
})

server.listen(port, function() {
    console.log("This server is working and listening for requests on port: ", port)
})