console.log("LD40");

init();

function init(){
    stage = 'title';
    terrax = terra[0].length;
    terray = terra.length;
    canvas = document.getElementById('ce');
    c = canvas.getContext('2d');
    c.imageSmoothingEnabled = false;
    loadimages();

    resetgame();
    setInterval(slocly, 25);
    setInterval(redraw, 25);
    document.onkeydown = keylistener;
    window.onresize = redraw;
}

function resetgame(){
    var i, rmap;
    rmap = [];
    for (i=0; i<terray; i++){
        rmap.push(terra[i].concat());
    }
    map = rmap;
    avatar = pright;
    makemap();
}

function loadimages(){
    wall = regimg('wall');
    floor = regimg('floor');
    pleft = regimg('person_left1');
    pright = regimg('person_right1');
    coin = regimg('coin');
    door = regimg('door');
    key = regimg('key');
    shadow = regimg('shadow');
}

function makemap(){
    for(i=0; i<terrax; i++){
        for(j=0; j<terray; j++){
            if (ofind([i,j]) == 'start'){
                loc = [i,j];
                sloc = loc;
            }
        }
    }
    visited = {};
    makevisited(loc);
}

function ofind(myloc){
    if (myloc[0]<0 || myloc[0]>=terrax || myloc[1]<0 || myloc[1]>=terray){
        return null;
    }else{
        return map[myloc[1]][myloc[0]];
    }
}

function boundary(x){
    if (x%12==0){
        return [x/12-1, x/12];
    }else{
        return [Math.floor(x/12), Math.floor(x/12)];
    }
}

function makevisited(myloc){
    var b0 = boundary(myloc[0]);
    var b1 = boundary(myloc[1]);
    var i, j;
    for (i=b0[0]; i<=b0[1]; i++) for (j=b1[0]; j<=b1[1]; j++){
        visited[[i, j]] = true;
    }
}

function isvisited(myloc){
    var b0 = boundary(myloc[0]);
    var b1 = boundary(myloc[1]);
    for (i=b0[0]; i<=b0[1]; i++) for (j=b1[0]; j<=b1[1]; j++){
        if([i, j] in visited){
            return true;
        }
    }
    return false;
}

function slocly(){
    //    sloc = cplus(sloc, scale(cplus(loc, scale(sloc, -1)), 5/10));
    sloc = scale(cplus(sloc, loc), .5);
}

function cplus(a, b){
    return [a[0]+b[0], a[1]+b[1]];
}

function scale(a, k){
    return [a[0]*k, a[1]*k];
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

function redraw(){
    // clarify dimensions and redraw boundaries
    dimensions();
    isloc = sloc;
    var i0, i1, j0, j1;
    i0 = Math.floor(isloc[0]-awc/asize-1);
    i1 = Math.ceil(isloc[0]+(aw-awc)/asize);
    j0 = Math.floor(isloc[1]-ahc/asize-1);
    j1 = Math.ceil(isloc[1]+(ah-ahc)/asize);

    // redraw
    switch(stage){
    case 'play':
        c.clearRect(0, 0, aw, ah);
        var i, j, sprite;
        for (i=i0; i<=i1; i++){
            for (j=j0; j<=j1; j++){
                switch (ofind([i,j])){
                case 'wall':
                    sprite = wall; break;
                case 'floor': case 'start': case 'end':
                    sprite = floor; break;
                case 'door':
                    sprite = door; break;
                case 'coin':
                    sprite = coin; break;
                case null: case undefined: default:
                    sprite = null; break;
                }
                if(sprite){
                    c.drawImage(sprite, Math.round(awc+(i-isloc[0])*asize),
                                Math.round(ahc+(j-isloc[1])*asize));
                    if (! isvisited([i, j])){
                        c.drawImage(shadow, Math.round(awc+(i-isloc[0])*asize),
                                    Math.round(ahc+(j-isloc[1])*asize));
                    }
                }
            }
        }
        c.drawImage(avatar, awc, ahc);
        break;
    case 'title':
        txtprep(48);
        c.fillText ("Friendly Dungeon", aw/2, ah/2);
        txtprep(24);
        c.fillText ("Press space to start", aw/2, ah/2+asize*3);
        break;
    case 'gameover':
        txtprep(48);
        c.fillText ("Game Over", aw/2, ah/2);
        txtprep(24);
        c.fillText ("Press space to try again! :-)", aw/2, ah/2+asize*3);
    }
}

function txtprep(size){
    c.textAlign = 'center';
    c.font = size+'px sans-serif';
    c.fillStyle = 'white';
}

function regimg(name){
    var s = new Image();
    s.onload = redraw;
    s.src = 'img/' + name + '.png';
    return s;
}

function keylistener(e){
    switch(stage){
    case 'play':
        var locnew;
        switch(e.code){
        case 'ArrowRight': case 'KeyD': case 'KeyL': case 'KeyF': 
            locnew = cplus(loc, [1, 0]);
            avatar = pright;
            break;
        case 'ArrowLeft': case 'KeyA': case 'KeyH': case 'KeyB': 
            locnew = cplus(loc, [-1, 0]);
            avatar = pleft;
            break;
        case 'ArrowUp': case 'KeyW': case 'KeyK': case 'KeyP': 
            locnew = cplus(loc, [0, -1]); break;
        case 'ArrowDown': case 'KeyS': case 'KeyJ': case 'KeyN': 
            locnew = cplus(loc, [0, 1]); break;
        default:
            locnew = loc;
        }
        if (ofind(locnew) != 'wall'){
            loc = locnew;
            makevisited(loc);
        }
        if (loc[0]%12==1 && loc[1]%12==1){
            stage = 'gameover';
        }
        redraw();
        break;
    case 'title':
        if (e.code == 'Space'){
            stage = 'play';
        }
        break;
    case 'gameover':
        if (e.code == 'Space'){
            stage = 'play';
            resetgame();
        }
    }
}

