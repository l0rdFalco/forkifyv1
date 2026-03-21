import icons from "url:../../img/icons.svg"; // Parcel 2

class BoookmarksView {
 #parentElement = document.querySelector(".bookmarks__list");
 #errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
 #message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BoookmarksView();
