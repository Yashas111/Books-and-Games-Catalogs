document.addEventListener('DOMContentLoaded', function(){

//tooltip
  $('[data-toggle="tooltip"]').tooltip();

  //for modal
  var games = document.querySelector(".games");
  var itemTitle = document.getElementById("itemTitle");
  var author = document.getElementById("author");
  var itemImg = document.getElementById("itemImg");
  var itemDesc = document.getElementById("itemDesc");

  games.onclick = function(e){
    if(e.target.className === "btn btn-outline-info details-btn"){
      var parent = e.target.parentElement;
      var gameTitle = parent.firstElementChild.textContent;
      var authorName = e.target.previousSibling.previousSibling.textContent;
      var img = parent.parentElement.firstElementChild.src;
      var desc = parent.lastElementChild.textContent;
      itemTitle.innerHTML = gameTitle;
      author.innerHTML = authorName;
      itemImg.src = img;
      itemDesc.innerHTML = desc;
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
