document.addEventListener('DOMContentLoaded', function(){

//tooltip
  $('[data-toggle="tooltip"]').tooltip();

  //for modal
  var games = document.querySelector(".games");
  var itemTitle = document.getElementById("itemTitle");
  var author = document.getElementById("author");
  var itemImg = document.getElementById("itemImg");
  var itemDesc = document.getElementById("itemDesc");
  var itemPr = document.getElementsByClassName("itemPr")[0];
  var bkname = document.getElementById("bkname");
  var pf = document.getElementById("priceForm");

  games.onclick = function(e){
    if(e.target.className === "btn btn-outline-info details-btn"){
      var parent = e.target.parentElement;
      var gameTitle = parent.firstElementChild.textContent;
      var authorName = e.target.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
      var img = parent.parentElement.firstElementChild.src;
      var gid = parent.parentElement.firstElementChild.nextSibling.nextSibling.action.split("/")[5];
      var desc = parent.lastElementChild.textContent;
      itemTitle.innerHTML = gameTitle;
      bkname.innerHTML = "Order " + gameTitle;
      author.innerHTML = authorName;
      itemImg.src = img;
      itemDesc.innerHTML = desc;
      itemPrice.innerHTML = "Price: Rs." +  e.target.previousSibling.previousSibling.textContent;
      itemPr.innerHTML = "Price: Rs." +  e.target.previousSibling.previousSibling.textContent;
      pf.action = "/profile/orderg/" + gid;
    }
  }


  //search books
    const searchBar = document.getElementById("searchBar-games");
    searchBar.addEventListener("keyup", (e) => {
      const term = e.target.value.toLowerCase();
      const allGames = document.getElementsByClassName("game");
      Array.from(allGames).forEach((game) => {
        const title = game.getElementsByTagName("h3")[0].textContent;
        const auth = game.getElementsByTagName("h5")[0].textContent;
        if(title.toLowerCase().indexOf(e.target.value) != -1){
          game.style.display = "inline-block";
        } else if(auth.toLowerCase().indexOf(e.target.value) != -1){
          game.style.display = "inline-block";
        } else {
          game.style.display = "none";
        }
      });
    });


})
