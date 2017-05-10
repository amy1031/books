function BooksController() {
    var booksService = new BooksService()

    this.getBooks = function(e) {
        debugger
        e.preventDefault();
        var form = e.target;

        booksArray = booksService.getBooks(form.title.value, form.published.value, form.rating.value, form.author.value)
        booksArray.push(form.title.value, form.published.value, form.rating.value, form.author.value);

        booksService.saveBooks(booksArray)

        drawBooks(booksArray)
            
    }

    //Print to screen
    function drawBooks(data) {
        var elem = document.getElementById("books");
        var template = "";

        template += `
        <h2>${data.title}</h2>
        <h3>${data.author}</h3>
        <h4>Published: ${data.published}</h4>
        <h5>Rating: ${data.rating}</h5>
        `
        return elem.innerHTML = template
    }
}