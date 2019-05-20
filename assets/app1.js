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
  var itemPr = document.getElementsByClassName("itemPr")[0];
  var bkname = document.getElementById("bkname");
  var pf = document.getElementById("priceForm");

  books.onclick = function(e){
    if(e.target.className === "btn btn-outline-info details-btn"){
      var parent = e.target.parentElement;
      var bookTitle = parent.firstElementChild.textContent;
      var authorName = e.target.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
      var img = parent.parentElement.firstElementChild.src;
      var bid = parent.parentElement.firstElementChild.nextSibling.nextSibling.action.split("/")[5];
      var desc = parent.lastElementChild.textContent;
      itemTitle.innerHTML = bookTitle;
      bkname.innerHTML = "Order - <span class='text-info'>" + bookTitle + "</span>";
      author.innerHTML = authorName;
      itemImg.src = img;
      itemDesc.innerHTML = desc;
      itemPrice.innerHTML = "Price: Rs." +  e.target.previousSibling.previousSibling.textContent;
      itemPr.innerHTML = "Price: Rs." +  e.target.previousSibling.previousSibling.textContent;
      pf.action = "/profile/orderb/" + bid;
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
