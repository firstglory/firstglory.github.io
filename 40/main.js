console.log("LD40");

init();

function init(){
    canvas = document.getElementById('ce');
    c = canvas.getContext('2d');
    c.imageSmoothingEnabled = false;
    wall = regimg('wall');
    setInterval(redraw, 1000);
}

function redraw(){
    c.drawImage(wall, 10, 50);
}

function regimg(name){
    var s = new Image();
    s.onload = redraw;
    s.src = 'img/' + name + '.png';
    return s;
}

