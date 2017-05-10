function BooksService() {
    var url = 'http://localhost:9001/books'

    this.getBooks = function(callWhenDone) {
        $.get(url, function(res) {
            callWhenDone(res)
        })
    }

    this.saveBooks = function(books){
        $.post(url, function(res) {
            callWhenDone(res)
        })
    }
}