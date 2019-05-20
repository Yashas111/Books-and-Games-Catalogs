document.addEventListener('DOMContentLoaded', function(){

//tooltip
  $('[data-toggle="tooltip"]').tooltip();

  //for modal
  var books = document.querySelector(".books");
  var itemTitle = document.getElementById("itemTitle");
  var author = document.getElementById("author");
  var itemImg = document.getElementById("itemImg");
  var itemDesc = document.getElementById("itemDesc");
  var itemPrice = document.getElementById("itemPrice");

  books.onclick = function(e){
    if(e.target.className === "btn btn-outline-info details-btn"){
      var parent = e.target.parentElement;
      var bookTitle = parent.firstElementChild.textContent;
      var authorName = e.target.previousSibling.previousSibling.textContent;
      var img = parent.parentElement.firstElementChild.src;
      var desc = parent.lastElementChild.textContent;
      itemTitle.innerHTML = bookTitle;
      author.innerHTML = authorName;
      itemImg.src = img;
      itemDesc.innerHTML = desc;
    }
  }

  //search books
    const searchBar = document.getElementById("searchBar-books");
    searchBar.addEventListener("keyup", (e) => {
      const term = e.target.value.toLowerCase();
      const allBooks = document.getElementsByClassName("book");
      Array.from(allBooks).forEach((book) => {
        const title = book.getElementsByTagName("h3")[0].textContent;
        const auth = book.getElementsByTagName("h5")[0].textContent;
        if(title.toLowerCase().indexOf(e.target.value) != -1){
          book.style.display = "inline-block";
        } else if(auth.toLowerCase().indexOf(e.target.value) != -1){
          book.style.display = "inline-block";
        } else {
          book.style.display = "none";
        }
      });
    });

})
