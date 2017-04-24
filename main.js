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
    person = regimg('char');
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
    spade = regimg('spade');
    inventoryimages = ({
        12: axe, 12.25: rope, 12.5: protectionsuit,
        12.75: pickaxe, 11: gun, 7: rock2,
        2: wood, 14: spade
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
    ocean = terrains[0];
    loc = [4, 43];
    inventory = [14]
    focus = 0;
    inventoryopened = true;
    hasaxe = false;
    hasrope = false;
    hasprotectionsuit = false;
    haspickaxe = false;
    hasgun = false;
    hardwood = 0;
    lightwood = 0;
    document.addEventListener('keydown', keydownlistener);
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
        case 2: c.drawImage(tree1, i*px, j*px); break;
        case 2.25: c.drawImage(tree2, i*px-4, j*px-4); break;
        case 2.5: c.drawImage(tree3, i*px-8, j*px-8); break;
        case 7: c.drawImage(rock1, i*px, j*px); break;
        case 7.25: c.drawImage(rock2, i*px, j*px); break;
        case 7.5: c.drawImage(rock3, i*px-4, j*px-4); break;
        case 9: c.drawImage(monument, i*px, j*px); break;
        case 10: c.drawImage(ltree1, i*px, j*px); break;
        case 10.25: c.drawImage(ltree2, i*px-4, j*px-4); break;
        case 10.5: c.drawImage(ltree3, i*px-8, j*px-8); break;
        case 4: c.drawImage(mountain, i*px, j*px-64); break;
        case 6: c.drawImage(volcano, i*px, j*px-64); break;
        case 5: c.drawImage(hugemountain, i*px, j*px-128); break;
        }
    }
    c.drawImage(person, xoffset*px, yoffset*px);

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
        newloc=[loc[0], loc[1]-1]; break;
    case 'ArrowDown': case 'KeyS':
        inventoryopened = false;
        newloc=[loc[0], loc[1]+1]; break;
    case 'ArrowLeft': case 'KeyA':
        inventoryopened = false;
        newloc=[loc[0]-1, loc[1]]; break;
    case 'ArrowRight': case 'KeyD':
        inventoryopened = false;
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
    case 0: break;
    case 2: if(inventory[focus] == 12){terra[newloc[1]][newloc[0]] = 8;}else{timedialog('Wood is too hard to cut through.');} break;
    case 10: if(inventory[focus] == 12){terra[newloc[1]][newloc[0]] = 8;}else{timedialog('Wood is too hard to cut through.');} break;
    case 3: case 4: if(inventory[focus]==12.25){loc = newloc;}else{timedialog('Mountain is too hard to climb.');} break;
    case 7: if(inventory[focus]==12.75){terra[newloc[1]][newloc[0]] = 1;}else{timedialog('Rock is too hard to climb across.');}break;
    case 9: converse(['This statue holds a story.']); break;
    case 12:
        switch(newloc[0]){
        case 11: if(!hasaxe){hasaxe = true; inventoryopened = true; inventory.push(12); timedialog('Found an axe!');} break;
        case 41: if(!hasrope){hasrope = true; inventoryopened = true; inventory.push(12.25); timedialog('Found a rope!');} break;
        case 65: if(!hasprotectionsuit){hasprotectionsuit = true; inventoryopened = true; inventory.push(12.5);timedialog('Found a protection suit!');} break;
        case 112: if(!haspickaxe){haspickaxe = true; inventoryopened = true; inventory.push(12.75); timedialog('Found a pickaxe!');} break;
        }
    case 11:
        switch(newloc[0]){
        case 96: if(!hasgun){hasgun = true; inventoryopened = true; inventory.push(11);} break;
        }
    default: loc = newloc;
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
    console.log(str);
}

function converse(strlist){
    console.log(strlist);
}
