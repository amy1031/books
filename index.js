var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var server = express()
var port = 9001


// !! Database Stuff
var mongoose = require('mongoose')
var connectionString = 'mongodb://student:student@ds029107.mlab.com:29107/books'
var connection = mongoose.connection

//Does not change
mongoose.connect(connectionString, {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

connection.on('error', function (err) {
    console.log('There was a connection problem', err)
})

connection.once('open', function() {
    console.log('We are now connected to the books database')
    server.listen(port, function() {
        console.log('Yep, it is working', 'http://localhost:' + port)
    })
})

// !!End database stuff


//Parses the request data into json, gives access to req.body
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors())
server.use('/', express.static(`${__dirname}/assets/`))


server.get('/', function(req, res, next) {
    res.send(200, '<h1>Are you looking for <a href="/books">Books</a>?</h1>')
})

// BOOK in the DB (can create multiple schemas)
var Schema = mongoose.Schema
var BookSchema = new Schema({
    title: {type: String, required: true},
    published: {type: Number, required: true},
    rating: {type: Number, required: true},
    author: {type: String, required: true}
})
//{type: Boolean, required: true, default: false}

//In the database, you'll have a collection of 'Book' which will follow the Book schema model
var Book = mongoose.model('Book', BookSchema)
// END BOOK


server.get('/books', function(req, res, next) {
    Book.find({}).then(function(book) {
        res.send(book)
    })
})

server.get('/books/search', function(req, res, next){
    var query = req.query
    Book.find({}).then(function (books) {
        res.send(books)
    })
})


server.get('/books/:id', function(req, res, next) {
    var id = req.params.id

    Book.findById(id).then(function(book) {
        res.send(book)
    }).catch(function(e) {
        res.send(e)
    })
})

server.post('/books', function (req, res, next) {
  var newBook = req.body
  Book.create(newBook)
    .then(function (newlyCreatedBook) {
      res.send(newlyCreatedBook)
    })
})


server.put('/books/:id', function(req, res, next){
    var id = req.params.id
    var updatedBook = req.body
    Book.findByIdAndUpdate(id, updatedBook).then(function() {
        res.send(updatedBook)
    })
}) 


server.delete('/books/:id', function(req, res, next) {
    var id = req.params.id


    Book.findByIdAndRemove(id).then(function() {
        res.send('Book Removed')
    })
 })