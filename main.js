function init(){
    console.log("LD38");
    ce = document.getElementById('ce');
    c = ce.getContext('2d');
    c.imageSmoothingEnabled = false;
    px = 16;
    xoffset = 29;
    yoffset = 19;
    xlim = 60;
    ylim = 40;
    loaded = 0;
    totalimg = 0;
    lavaxmin = 43
    lavaxmax = 74
    lavaymin = 0
    lavaymax = 40
    // person = regimg('char');
    grass = regimg('grass');
    tree1 = regimg('tree1');
    tree2 = regimg('tree2');
    tree3 = regimg('tree3');
    ltree1 = regimg('light_tree1');
    ltree2 = regimg('light_tree2');
    ltree3 = regimg('light_tree3');
    rock1 = regimg('rock1');
    rock2 = regimg('rock2');
    rock3 = regimg('rock3');
    monument = regimg('monument');
    mountain = regimg('mountain');
    volcano = regimg('volcano');
    hugemountain = regimg('huge_mountain');
    axe = regimg('axe');
    rope = regimg('rope');
    protectionsuit = regimg('protection_suit');
    pickaxe = regimg('pickaxe');
    gun = regimg('gun');
    wood = regimg('wood');
    lightwood = regimg('light_wood');
    spade = regimg('spade');
    lava = regimg('lava');
    boat = regimg('boat');
    charn = regimg('charn');
    chars = regimg('chars');
    charw = regimg('charw');
    chare = regimg('chare');
    charfacing = chars;
    rabbitl = regimg('rabbit_left');
    rabbitr = regimg('rabbit_right');
    wolfl = regimg('wolf_left');
    wolfr = regimg('wolf_right');
    UFO = regimg('UFO'); // modified
    end = regimg('the_end'); // modified
    inventoryimages = ({
        12: axe, 12.25: rope, 12.5: protectionsuit,
        12.75: pickaxe, 11: gun, 7: rock2,
        2: wood, 10: lightwood, 14: spade,
    });
    makegrounds();
    terrainnames = ['ocean','land_1','land_2','land_12',
                    'land_3','land_13','land_23','land_123',
                    'land_4','land_14','land_24','land_124',
                    'land_34','land_134','land_234','land'];
    terrains = [];
    var i;
    for(i in terrainnames){
        terrains[i] = regimg(terrainnames[i]);
    }
    audio1 = new Audio();
    audio1.autoplay = true;
    audio1.loop = true;
    audio1.src = 'A01.wav';
    audio2 = new Audio();
    audio2.loop = true;
    audio2.src = 'B01-7.wav';
    nowplaying = 1;
    ocean = terrains[0];
    loc = [4, 43];
    // loc = [64, 36];
    inventory = [14]
    focus = 0;
    inventoryopened = true;
    hasaxe = false;
    hasrope = false;
    hasprotectionsuit = false;
    haspickaxe = false;
    hasgun = false;
    hardwood = 0;
    hardwoodpos = false;
    lightwood = 0;
    lightwoodpos = false;
    haserupted = false;
    eruptionmap = maperuption();
    document.addEventListener('keydown', keydownlistener);
    // hasaxe = true; inventory.push(12); // modified
    UFO_visible = false; // modified
    xu = 54; // modified
    yu = 60; // modified
}

init();

function redraw(){
    var i, j;
    for(j=0; j<=ylim; j++) for(i=0; i<=xlim; i++) {
        c.drawImage(visitor(loc[0]+i-xoffset, loc[1]+j-yoffset), (i-1/2)*px, (j-1/2)*px);
    }
    for(j=0; j<ylim+8; j++) for(i=0; i<xlim; i++) {
        switch(v(loc[0]+i-xoffset, loc[1]+j-yoffset)){
        case 8: c.drawImage(grass, i*px-2, j*px-2); break;
        }
    }
    for(j=0; j<ylim+8; j++) for(i=0; i<xlim; i++) {
        switch(v(loc[0]+i-xoffset, loc[1]+j-yoffset)){
        case 13: c.drawImage(lava, i*px-2, j*px-2); break;
        }
    }
    for(j=0; j<ylim+8; j++) for(i=0; i<xlim; i++) {
        switch(v(loc[0]+i-xoffset, loc[1]+j-yoffset)){
        case 2: c.drawImage(tree1, i*px, j*px); break;
        case 2.25: c.drawImage(tree2, i*px-4, j*px-4); break;
        case 2.5: c.drawImage(tree3, i*px-8, j*px-8); break;
        case 7: c.drawImage(rock1, i*px, j*px); break;
        case 7.25: c.drawImage(rock2, i*px, j*px); break;
        case 7.5: c.drawImage(rock3, i*px-4, j*px-4); break;
        case 11: c.drawImage(rock2, i*px, j*px); break;
        case 9: c.drawImage(monument, i*px, j*px); break;
        case 10: c.drawImage(ltree1, i*px, j*px); break;
        case 10.25: c.drawImage(ltree2, i*px-4, j*px-4); break;
        case 10.5: c.drawImage(ltree3, i*px-8, j*px-8); break;
        case 4: c.drawImage(mountain, i*px, j*px-64); break;
        case 6: c.drawImage(volcano, i*px-24, j*px-48); break;
        case 5: c.drawImage(hugemountain, i*px, j*px-128); break;
        }
    }
    c.drawImage(charfacing, xoffset*px, yoffset*px);
    if(UFO_visible){ // modified
        c.drawImage(UFO, (xoffset+xu-loc[1])*16, (yoffset+yu-loc[0])*16);
    }

    if(inventoryopened){
        c.fillStyle = '#0097c0';
        c.fillRect(8, 8, 4+(4+32)*(inventory.length), 8+32);
        c.fillStyle = '#14d9ff';
        c.fillRect(8+(4+32)*focus, 8, 8+32, 8+32);
        var objn;
        for(objn = 0; objn < inventory.length; objn++){
            c.drawImage(inventoryimages[inventory[objn]], 8+4+(4+32)*objn, 8+4, 32, 32);
        }
    }else{
        c.fillStyle = '#0097c0';
        c.fillRect(8, 8, 8+32, 8+32);
        c.drawImage(inventoryimages[inventory[focus]], 8+4, 8+4, 32, 32);
    }
}

function keydownlistener(e){
    var newloc;
    //console.log(e);
    var newloc = loc;
    switch(e.code){
    case 'ArrowUp': case 'KeyW':
        inventoryopened = false;
        charfacing = charn;
        newloc=[loc[0], loc[1]-1]; break;
    case 'ArrowDown': case 'KeyS':
        inventoryopened = false;
        charfacing = chars;
        newloc=[loc[0], loc[1]+1]; break;
    case 'ArrowLeft': case 'KeyA':
        inventoryopened = false;
        charfacing = charw;
        newloc=[loc[0]-1, loc[1]]; break;
    case 'ArrowRight': case 'KeyD':
        inventoryopened = false;
        charfacing = chare;
        newloc=[loc[0]+1, loc[1]]; break;
    case 'KeyQ':
        inventoryopened = true;
        if(focus==0){
            focus = inventory.length-1;
        }else{
            focus --;
        }
        break;
    case 'KeyE':
        inventoryopened = true;
        if(focus==inventory.length-1){
            focus = 0;
        }else{
            focus ++;
        }
        break;
    }
    switch(Math.floor(vl(newloc))){
    case 0: if(lightwood >= 5){lightwood -= 5; terra[newloc[1]][newloc[0]] = 15;}else{break;} // modified
    case 2: if(inventory[focus] == 12){terra[newloc[1]][newloc[0]] = 8; hardwood++;
                                       if(hardwood==1){hardwoodpos = inventory.length; inventory.push(2);}
                                       inventoryopened = true;
                                      }else{timedialog('Wood is too hard to cut through.');} break;
    case 10: if(inventory[focus] == 12){terra[newloc[1]][newloc[0]] = 8; lightwood++;
                                        if(lightwood==1){lightwoodpos = inventory.length; inventory.push(10);}
                                        inventoryopened = true;
                                       }else{timedialog('Wood is too hard to cut through.');} break;
    case 3: case 4: if(inventory[focus]==12.25){loc = newloc;}else{timedialog('Mountain is too hard to climb.');} break;
    case 7: if(inventory[focus]==12.75){terra[newloc[1]][newloc[0]] = 1;}else{timedialog('Rock is too hard to climb across.');}break;
    case 9: // modified
        converse(['This statue holds a story.']); 
        if(((59-loc[0])*(59-loc[0])+(62-loc[1])*(62-loc[1])) < 4){
            UFO_visible = true;
        }
        break;
    case 12:
        if(inventory[focus]==14){
            switch(newloc[0]){
            case 11: if(!hasaxe){hasaxe = true; inventoryopened = true; inventory.push(12); timedialog('Found an axe!');} break;
            case 41: if(!hasrope){hasrope = true; inventoryopened = true; inventory.push(12.25); timedialog('Found a rope!');} break;
            case 65: if(!hasprotectionsuit){hasprotectionsuit = true; inventoryopened = true; inventory.push(12.5);timedialog('Found a protection suit!');} break;
            case 112: if(!haspickaxe){haspickaxe = true; inventoryopened = true; inventory.push(12.75); timedialog('Found a pickaxe!');} break;
            }
        }else{
            loc = newloc;
        }
    case 11:
        if(inventory[focus]==12.75){
            switch(newloc[0]){
            case 96: if(!hasgun){hasgun = true; inventoryopened = true; inventory.push(11);} break;
            }
        }else{
            loc = newloc;
        }
        break;
    default: loc = newloc;
    }
    if(ccode(loc) in eruptionmap){
        if(!haserupted){
            haserupted = true;
            erupt();
        }
    }
    redraw();
}

function movable(L){
    //    return (t != 0 && t != 7 && t != 7.25 && t != 7.5 && t != 2 && t != 2.25 && t != 2.5);
    return (vl(L)!=0);
}

function imgloader(){
    loaded++;
    if(loaded>=totalimg) redraw();
}

function visitor(x, y){
    return terrains[terragen(v01(x-1,y-1), v01(x,y-1), v01(x-1,y), v01(x,y))];
}

function terragen(a, b, c, d){
    return a | (b<<1) | (c<<2) | (d<<3);
}

function vl(L){
    return v(L[0],L[1]);
}

function v(x, y){
    return (x>=lxmin && x<lxmax && y>=lymin && y<lymax) ? terra[y][x] : 0;
}

function v01(x, y){
    return (x>=lxmin && x<lxmax && y>=lymin && y<lymax) ? (terra[y][x]>0 ? 1 : 0) : 0;
}

function makegrounds(){
    lxmin = 0;
    lxmax = (terra[0]).length;
    lymin = 0;
    lymax = (terra).length;
    var i, j, roll;
    for(i=lymin; i<lymax; i++) for(j=lxmin; j<lxmax; j++){
        if(terra[i][j] == 2 || terra[i][j] == 7 || terra[i][j] == 10){
            roll = Math.random();
            if(roll<1/3){ terra[i][j] += 0.25 }
            else if(roll<2/3){ terra[i][j] += 0.5 }
        }
    }
    terra[58][11] = 12;
    terra[46][41] = 12.25;
    terra[36][65] = 12.5;
    terra[37][112] = 12.75;
    terra[54][96] = 11;
    terra[42][51] = 11.5;
}

function regimg(name){
    var s = new Image();
    totalimg++;
    s.onload = imgloader;
    s.src = 'img/' + name + '.png';
    return s;
}

function timedialog(str){
    c.font="20px Georgia";
    c.fillText('hello world',10,50);
    console.log(str)
}

function converse(strlist){
    console.log(strlist);
}

function maperuption(){
    var start = [52, 22];
    var q = [start];
    var ptr = 0;
    var objs = ({});
    var nowloc, nextloc, i;
    objs[ccode(start)] = [start, 1];
    while(ptr < q.length){
        nowloc = q[ptr];
        for (i=0; i<4; i++){
            nextloc = addv(nowloc,([[0,1],[0,-1],[1,0],[-1,0]])[i]);
            if(vl(nextloc) != 0 && vl(nextloc) != 4 && vl(nextloc) != 3 && ! (nextloc[0] >= 67 && nextloc[1] < 17)){
                if(ccode(nextloc) in objs){}else{
                    q.push(nextloc);
                    objs[ccode(nextloc)] = [nextloc, objs[ccode(nowloc)][1] + 1];
                }
            }
        }
        ptr++;
    }
    return objs;
}

function ccode(L){
    return 'a'+L[0]+'b'+L[1];
}

function addv(L, M){
    return [L[0]+M[0], L[1]+M[1]];
}

function erupt(){
    erupttime = 0;
    setmusic(2);
    setInterval(eruptstep, 1000);
}

function eruptstep(){
    erupttime ++;
    var i;
    for(i in eruptionmap){
        if(erupttime == eruptionmap[i][1] && vl(eruptionmap[i][0]) != 6){
            terra[eruptionmap[i][0][1]][eruptionmap[i][0][0]] = 13;
            if(loc[0]==eruptionmap[i][0][1] && loc[1]==eruptionmap[i][0][0]){ // modified
                init();
            }
        }
    }
    redraw();
}

function setmusic(n){
    if(nowplaying != n){
        if(n==0){ audio1.pause(); audio2.pause();}
        if(n==1){ audio1.play(); audio2.pause(); }
        if(n==2){ audio1.pause(); audio2.play(); }
        nowplaying = n;
    }
}