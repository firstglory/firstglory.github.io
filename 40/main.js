console.log("LD40");

init();

function init(){
    canvas = document.getElementById('ce');
    c = canvas.getContext('2d');
    c.imageSmoothingEnabled = false;
    wall = regimg('wall');
    setInterval(redraw, 1000);
    dimensions();
}

function dimensions(){
    asize = 24;
    acols = 13;
    arows = acols;
    avision = acols * asize;
    aw = canvas.width;
    ah = canvas.height;
    aleft = (ah - arows * asize) / 2;
    atop = aleft;
}

function redraw(){
    c.clearRect(0, 0, aw, ah);
    c.save(); // save current state to restore later
    c.beginPath();
    c.moveTo(aleft, atop);
    c.lineTo(aleft+avision, atop);
    c.lineTo(aleft+avision, atop+avision);
    c.lineTo(aleft, atop+avision);
    c.clip();
    var i, j, disp;
    for (i=0; i<arows; i++){
        for (j=0; j<acols; j++){
            if (i==0 || i==12 || j==0 || j==12){
                disp = true;
            } else if (i%2 == 0 && j%2 == 0){
                disp = true;
            } else if (i%2 == 1 && j%2 == 1){
                disp = false;
            } else {
                disp = Math.random() < 0.5;
            }
            if (disp){
                c.drawImage(wall, aleft + asize * i, atop + asize * j);
            }
        }
    }
    c.restore(); // restore
}

function regimg(name){
    var s = new Image();
    s.onload = redraw;
    s.src = 'img/' + name + '.png';
    return s;
}

