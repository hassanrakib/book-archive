// get the search text
document.getElementById("search-btn").addEventListener("click", () => {
    const inputField = document.querySelector("input[type='text']");
    const searchText = inputField.value;

    // clear inputField
    inputField.value = "";

    // get all books information by search text
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(response => response.json())
        .then(data => displayBooks(data));
});



// display search result
const displayBooks = data => {
    
    // books container and clear the previous result
    const booksContainer = document.querySelector(".row");
    booksContainer.textContent = "";

    // result found and result showing
    const booksFound = data.numFound;
    const resultCount = document.querySelector(".result-count");

    if (booksFound === 0) {
        resultCount.innerText = "No result found. Try again.";
    } else {
        resultCount.innerText = `Showing ${data.docs.length} out of ${booksFound} results`;
    }

    // add individual book item to the result
    data.docs.forEach(book => {

        // individual book container
        const bookContainer = document.createElement("div");
        bookContainer.className = "col";

        // individual book card
        const bookCard = document.createElement("div");
        bookCard.classList.add("card", "border-0", "align-items-center");

        // book card childs' container
        const bookCardChildsContainer = document.createElement("div");
        bookCardChildsContainer.className = "mt-3";

        // elements function
        const elements = (innerText, dynamic) => {
            const bookCardChild = document.createElement("div");
            const title = document.createElement("span");
            title.className = "fw-bold";
            title.innerText = innerText;
            const dynamicElement = document.createElement("span");
            dynamicElement.innerText = dynamic;
            bookCardChild.appendChild(title);
            bookCardChild.appendChild(dynamicElement);
            bookCardChildsContainer.appendChild(bookCardChild);
            bookCard.appendChild(bookCardChildsContainer);
        }

        // book Image
        let bookImageProperty = book.cover_i;

        const bookImageContainer = document.createElement("img");
        bookImageContainer.className = "card-img-top";

        if (bookImageProperty === undefined) {
            bookImageContainer.src = "default.jpg";
        } else {
            bookImageContainer.src = `https://covers.openlibrary.org/b/id/${bookImageProperty}-M.jpg`;
        }

        bookCard.appendChild(bookImageContainer);

        // dynamic

        let dynamic;

        // book Name
        const bookNameProperty = book.title;

        if (bookNameProperty === undefined) {
            dynamic = "Unknown";
        } else {
            dynamic = `${bookNameProperty}`;
        }

        elements("Book Name: ", dynamic);

        // book Author Name
        const bookAuthorNameProperty = book.author_name;


        if (bookAuthorNameProperty === undefined) {
            dynamic = "Unknown";
        } else {
            dynamic = `${bookAuthorNameProperty[0]}`;
        }

        elements("Author Name: ", dynamic);


        // book Published
        const bookFirstPublishedProperty = book.first_publish_year;

        if (bookFirstPublishedProperty === undefined) {
            dynamic = "Unknown";
        } else {
            dynamic = `${bookFirstPublishedProperty}`;
        }

        elements("First Published: ", dynamic);

        // book Publisher
        const bookPublisherProperty = book.publisher;

        if (bookPublisherProperty === undefined) {
            dynamic = "Unknown";
        } else {
            dynamic = `${bookPublisherProperty[0]}`
        }

        elements("Publisher: ", dynamic);

        // create individual book container and append them to the all books container
        bookContainer.appendChild(bookCard);
        booksContainer.appendChild(bookContainer);

    });
}