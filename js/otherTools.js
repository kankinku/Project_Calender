let imageArray = ['../img/sound/1.png', '../img/sound/2.png', '../img/sound/3.png', '../img/sound/4.png', '../img/sound/5.png'
,'../img/sound/4.png','../img/sound/3.png','../img/sound/2.png','../img/sound/1.png']; 
let imageIndex = 0;
let imageIndex2 = 0;

function changeImage() {
  let imgElement = document.getElementById('sound');
  imgElement.src = imageArray[imageIndex];
  imageIndex = (imageIndex + 1) % imageArray.length;
}

function changeImage2() {
  let imgElement2 = document.getElementById('sound2');
  imgElement2.src = imageArray[imageIndex];
  imageIndex2 = (imageIndex2 + 1) % imageArray.length;
}


document.querySelector('#start').onclick = function() { 
  var interval = setInterval(changeImage, 80); 
  var interval2 = setInterval(changeImage2, 80); 
  function stop(){
    clearInterval(interval);
    clearInterval(interval2);
    interval = null;
    interval2 = null;
  }
  setTimeout(stop, 5000);
}


window.addEventListener('resize', function() {
  const eventLeft = document.getElementById('eventLeft');
  const eventRight = document.getElementById('eventRight');
  var windowWidth = window.innerWidth;
  if(windowWidth <= 1700) {
     eventLeft.style.display = "none"
     eventRight.style.display = "none"
  }else{
    eventLeft.style.display = "block"
    eventRight.style.display = "block"
  }
});