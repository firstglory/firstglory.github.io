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
    setInterval(lavagrows, 25);
    document.onkeydown = keylistener;
    window.onresize = redraw;
    dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
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
    gifage = 0;
    coincount = 0;
    oset (cplus(startingpoint, [5, 5]), 'end'); // test
    erupted = false;
    lavarain = {};
    slocatlava = false;
    slocspeed = .5;
}

function loadimages(){
    wall = regimg('wall');
    floor = regimg('floor');
    pleft = regimg('person_left1');
    pright = regimg('person_right1');
    pup = regimg('person_up');
    pdown = regimg('person_down');
    coins = [regimg('coin'), regimg('coin2')];
    wisps = [regimg('wisp1'), regimg('wisp2'), regimg('wisp3')];
    lavas = [regimg('lava1'), regimg('lava2'), regimg('lava3')];
    door = regimg('door');
    key = regimg('key');
    shadow = regimg('shadow');
}

function makemap(){
    for(i=0; i<terrax; i++){
        for(j=0; j<terray; j++){
            if (ofind([i,j]) == 'start'){
                loc = [i,j];
                startingpoint = loc;
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

function oset(myloc, name){
    if (myloc[0]<0 || myloc[0]>=terrax || myloc[1]<0 || myloc[1]>=terray){
        return null;
    }else{
        map[myloc[1]][myloc[0]] = name;
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
    var camera;
    if(slocatlava){
        camera = startingpoint;
    }else{
        camera = loc;
    }
    sloc = cplus(scale(sloc, 1-slocspeed), scale(camera, slocspeed));
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
    gifage ++;
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
    case 'lava':
    case 'play': case 'exit':
        var sprites;
        c.clearRect(0, 0, aw, ah);
        var i, j, k;
        for (i=i0; i<=i1; i++){
            for (j=j0; j<=j1; j++){
                switch (ofind([i,j])){
                case 'wall':
                    sprites = [wall]; break;
                case 'floor': case 'start': case 'end':
                    sprites = [floor]; break;
                case 'door':
                    sprites = [door]; break;
                case 'coin':
                    sprites = [floor, coins[Math.floor(gifage/10)%2]]; break;
                case 'wisp':
                    sprites = [floor, wisps[Math.floor(gifage/10)%3]]; break;
                case 'lava':
                    sprites = [lavas[(i+j+Math.floor(gifage/10))%3]]; break;
                case 'lavawisp':
                    sprites = [lavas[(i+j+Math.floor(gifage/10))%3], wisps[Math.floor(gifage/10)%3]]; break;
                    
                case null: case undefined: default:
                    sprites = []; break;
                }
                for (k = 0; k < sprites.length; k++){
                    c.drawImage(sprites[k], Math.round(awc+(i-isloc[0])*asize),
                                Math.round(ahc+(j-isloc[1])*asize));
                }
                if (! isvisited([i, j])){
                    c.drawImage(shadow, Math.round(awc+(i-isloc[0])*asize),
                                Math.round(ahc+(j-isloc[1])*asize));
                }
            }
        }
        if (stage != 'lava'){
            c.drawImage(avatar, awc, ahc);
        }else{
            c.drawImage(avatar, Math.round(awc+(loc[0]-isloc[0])*asize),
                        Math.round(ahc+(loc[1]-isloc[1])*asize));
            txtprep(16);
            c.fillText ('The dungeon has erupted! Run for your life!', aw/2, ah*3/4);
        }
        if (coincount > 0){
            txtprep(16);
            c.textAlign = 'right';
            c.fillText (coincount + ' coin' + (coincount>1?'s':''), aw-16, asize);
        }
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
        break;
    }
    if (stage == 'exit'){
        transage ++;
        var whitealpha = Math.min(transage / 80, 1);
        c.fillStyle = 'rgba(255,255,255,'+whitealpha+')';
        c.fillRect(0, 0, aw, ah);
        if (transage >= 120){
            var blackalpha = Math.min((transage-120)/80, 1);
            txtprep(48);
            c.fillStyle = 'rgba(0,0,0,'+blackalpha+')';
            c.fillText ("You win!", aw/2, ah/2);
            txtprep(24);
            c.fillStyle = 'rgba(0,0,0,'+blackalpha+')';
            c.fillText ("Thank you for playing!", aw/2, ah/2+asize*3);
        }
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
            locnew = cplus(loc, [0, -1]);
            avatar = pup;
            break;
        case 'ArrowDown': case 'KeyS': case 'KeyJ': case 'KeyN': 
            locnew = cplus(loc, [0, 1]);
            avatar = pdown;
            break;
        default:
            locnew = loc;
        }
        if (ofind(locnew) != 'wall'){
            loc = locnew;
            makevisited(loc);
            switch(ofind(loc)){
            case 'coin':
                oset(loc, 'floor');
                coincount ++;
                break;
            case 'end':
                stage = 'exit';
                transage = 0;
            default: ;
            }
        }
        if (loc[0] == cplus(startingpoint, [1, -5])[0] && loc[1] == cplus(startingpoint, [1, -5])[1]){
            stage = 'gameover'; // test
        }
        if (!erupted){
            var b0 = boundary(loc[0]);
            var b1 = boundary(loc[1]);
            if (b0[0]==2 || b0[1]==2 || b1[0]==3 || b1[1]==3){
                lettherebelava();
            }
        }
        redraw();
        break;
    case 'lava':
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
        break;
    case 'exit':
        break;
        
    }
}

function lettherebelava(){
    erupted = true;
    oset (startingpoint, 'lava');
    lavarain = [startingpoint];
    setTimeout(eruptionpan, 20);
    setTimeout(eruptionpanback, 2020);
    setTimeout(eruptionpanbackfin, 3000);
}

function eruptionpan(){
    stage = 'lava';
    slocatlava = true;
    slocspeed = .1;
}

function eruptionpanback(){
    slocatlava = false;
}

function eruptionpanbackfin(){
    stage = 'play';
    slocspeed = .5;
}

function lavagrows(){
    if (erupted && gifage%40==0){
        var n = lavarain.length;
        var i, j, lavloc, nlavloc, newlavarain = [];
        for (i=0; i<n; i++){
            lavloc = lavarain[i];
            for (j=0; j<4; j++){
                nlavloc = cplus(lavloc, dirs[j]);
                if (ofind(nlavloc) != 'wall' && ofind(nlavloc) != 'lava' && ofind(nlavloc) != 'lavawisp' && ofind(nlavloc) != 'end'){
                    newlavarain.push(nlavloc);
                    if (ofind(nlavloc) == 'wisp'){
                        oset(nlavloc, 'lavawisp');
                    }else{
                        oset(nlavloc, 'lava');
                    }
                }
            }
        }
        lavarain = newlavarain;
    }
}


