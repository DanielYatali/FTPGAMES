function change_color(event){
  document.querySelector(".greet").style.textShadow = "2px 2px 0px black";
}
function revert_color(event){
  //document.querySelector(".greet").style.color = "gold";
  document.querySelector(".greet").style.textShadow = "2px 2px 0px white";
}
document.querySelector("#browse").addEventListener("mouseover", change_color);

document.querySelector("#browse").addEventListener("mouseout", revert_color);