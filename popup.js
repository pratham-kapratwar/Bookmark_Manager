function addBookmark() {
  var link = document.getElementById('bookmarklink').value;
  var name = document.getElementById('bookmarkname').value;  
   if (!name) {
      document.getElementById('error').innerHTML = "<b>Please enter a name</b>";
      return;
  }
   if (!link) {
      document.getElementById('error').innerHTML = "<b>Please enter a link</b>";
      return;
  }
    
  chrome.storage.sync.set({[name]: {"link": [link]}}, function() {});
  document.getElementById('error').innerHTML = ""; 
  document.getElementById('bookmarklink').value = "";
  document.getElementById('bookmarkname').value = "";
  if (document.getElementById('hidebookmark').style.display == "block") {
    getBookmark();
    document.getElementById('error').innerHTML = "";
  }
}

function getBookmark() {
  document.getElementById('bookmarks').innerHTML = "";
  document.getElementById('getbookmark').style.display = "none";
  document.getElementById('hidebookmark').style.display = "block";
  chrome.storage.sync.get(null, function(items) {
   for (key in items) {   
    var newLink = items[key]['link'].toString();    
    var strToAdd = "<br><br>" + key + " - " + "  <a class='GO' href='" + newLink + "' target='_blank'>GO</a>";
    document.getElementById('bookmarks').innerHTML = document.getElementById('bookmarks').innerHTML + strToAdd;
   }
  if (document.getElementById('bookmarks').innerHTML == ""){
      document.getElementById('bookmarks').innerHTML = "No bookmarks found."
    }
});

}

function hideBookmark(){
  document.getElementById('bookmarks').innerHTML = "";
  document.getElementById('getbookmark').style.display = "block";
  document.getElementById('hidebookmark').style.display = "none";
}

function delBookmark(){
  item = document.getElementById('toDelete').value;
  document.getElementById('toDelete').value = "";
  chrome.storage.sync.remove(item, function(removed){
    document.getElementById('deleted').innerHTML = "Successfully deleted!";
    document.getElementById('close').style.display = "block";
  });
  if (document.getElementById('hidebookmark').style.display == "block") {
    getBookmark();
  }
}

function hide(){
  document.getElementById('deleted').innerHTML = "";
  document.getElementById('close').style.display = "none";
}

function clearBookmarks() {
  check = document.getElementById('clearcheck').checked
  if (check){
  chrome.storage.sync.clear();
  document.getElementById('clearcheck').checked = false;
  }
  else{
    alert("Please check (tick) the box first");
    return;
  }
  if (document.getElementById('hidebookmark').style.display == "block") {
    getBookmark();
  }
}

document.getElementById("addbookmark").addEventListener("click", addBookmark);
document.getElementById("getbookmark").addEventListener("click", getBookmark);
document.getElementById("hidebookmark").addEventListener("click", hideBookmark);
document.getElementById("clearbookmarks").addEventListener("click", clearBookmarks);
document.getElementById("delbookmark").addEventListener("click", delBookmark);
document.getElementById("close").addEventListener("click", hide);