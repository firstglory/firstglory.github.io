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
    document.onkeydown = keylistener;
    createmap();
    window.onresize = redraw;
}

function dimensions(){
    asize = 24;
    acols = 13;
    arows = acols;
    avision = acols * asize;
    aw = Math.floor(window.innerWidth/2);
    ah = Math.floor(window.innerHeight/2);
    aleft = (ah - arows * asize) / 2;
    atop = aleft;
    canvas.style.width = (2*aw)+'px';
    canvas.style.height = (2*ah)+'px';
    canvas.width = aw;
    canvas.height = ah;
    awc=Math.round(aw/2)-asize/2;
    ahc=Math.round(ah/2)-asize/2;
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
    loc = [1,5];
}

function cplus(a, b){
    return [a[0]+b[0], a[1]+b[1]];
}

function pgo(b){
    loc[0] += b[0];
    loc[1] += b[1];
}

function redraw(){
    dimensions();
    c.clearRect(0, 0, aw, ah);
    var i, j, disp;
    for (i=0; i<arows; i++){
        for (j=0; j<acols; j++){
            if (map[[i,j]]){
                c.drawImage(wall, awc+(i-loc[0])*asize, ahc+(j-loc[1])*asize);
            }else{
                c.drawImage(floor, awc+(i-loc[0])*asize, ahc+(j-loc[1])*asize);
            }
        }
    }
    c.drawImage(avatar, awc, ahc);
}

function regimg(name){
    var s = new Image();
    s.onload = redraw;
    s.src = 'img/' + name + '.png';
    return s;
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


