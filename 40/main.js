console.log("LD40");

init();

function init(){
    canvas = document.getElementById('ce');
    c = canvas.getContext('2d');
    c.imageSmoothingEnabled = false;
    wall = regimg('wall');
    floor = regimg('floor');
    pleft = regimg('person_left1');
    pright = regimg('person_right1');
    avatar = pright;
    setInterval(redraw, 50);
    dimensions();
    starthearing();
    createmap();
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

function createmap(){
    map = {};
    var disp, i, j;
    for(i=0; i<13; i++){
        for(j=0; j<13; j++){
            if (i==0 || i==12 || j==0 || j==12){
                disp = true;
            } else if (i%2 == 0 && j%2 == 0){
                disp = true;
            } else if (i%2 == 1 && j%2 == 1){
                disp = false;
            } else {
                disp = Math.random() < 0.5;
            }
            map[[i,j]]=disp;
        }
    }
    loc = [1,1];
}

function cplus(a, b){
    return [a[0]+b[0], a[1]+b[1]];
}

function pgo(b){
    loc[0] += b[0];
    loc[1] += b[1];
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
            if (map[[i,j]]){
                c.drawImage(wall, aleft + asize * i, atop + asize * j);
            }else{
                c.drawImage(floor, aleft + asize * i, atop + asize * j);
            }
        }
    }
    c.restore(); // restore
    c.drawImage(avatar, aleft + asize * loc[0], atop + asize * loc[1]);
}

function regimg(name){
    var s = new Image();
    s.onload = redraw;
    s.src = 'img/' + name + '.png';
    return s;
}

function starthearing(){
    document.onkeydown = keylistener;
}

function keylistener(e){
    var locnew;
    switch(e.code){
    case 'ArrowRight': case 'KeyD':
        locnew = cplus(loc, [1, 0]);
        avatar = pright;
        break;
    case 'ArrowLeft': case 'KeyA':
        locnew = cplus(loc, [-1, 0]);
        avatar = pleft;
        break;
    case 'ArrowUp': case 'KeyW':
        locnew = cplus(loc, [0, -1]); break;
    case 'ArrowDown': case 'KeyS':
        locnew = cplus(loc, [0, 1]); break;
    default:
        locnew = loc;
    }
    if (! map[locnew]){
        loc = locnew;
    }
    redraw();
}


