function init(){
    console.log("LD38");
    ce = document.getElementById('ce');
    c = ce.getContext('2d');
    px = 16;
    loc = [4, 43];
    xoffset = 29;
    yoffset = 19;
    xlim = 60;
    ylim = 40;
    loaded = 0;
    totalimg = 0;
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
    lxmin = -100;
    lxmax = 100;
    lymin = -100;
    lymax = 100;
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
    document.addEventListener('keydown', keydownlistener);
}

init();

function redraw(){
    var i, j;
    for(i=0; i<=xlim; i++) for(j=0; j<=ylim; j++) {
        c.drawImage(visitor(loc[0]+i-xoffset, loc[1]+j-yoffset), (i-1/2)*px, (j-1/2)*px);
    }
    for(i=0; i<xlim; i++) for(j=0; j<ylim; j++){
        switch(v(loc[0]+i-xoffset, loc[1]+j-yoffset)){
        case 8:
            c.drawImage(grass, i*px-2, j*px-2); break;
        case 2:
            c.drawImage(tree1, i*px, j*px); break;
        case 2.25:
            c.drawImage(tree2, i*px-4, j*px-4); break;
        case 2.5:
            c.drawImage(tree3, i*px-8, j*px-8); break;
        case 7:
            c.drawImage(rock1, i*px, j*px); break;
        case 7.25:
            c.drawImage(rock2, i*px, j*px); break;
        case 7.5:
            c.drawImage(rock3, i*px-4, j*px-4); break;
        case 9:
            c.drawImage(monument, i*px, j*px); break;
        case 10:
            c.drawImage(ltree1, i*px, j*px); break;
        case 10.25:
            c.drawImage(ltree2, i*px-4, j*px-4); break;
        case 10.5:
            c.drawImage(ltree3, i*px-8, j*px-8); break;
        }
    }
    c.drawImage(person, xoffset*px, yoffset*px);
}

function keydownlistener(e){
    console.log(e);
    switch(e.code){
    case 'ArrowUp': case 'KeyW':
        if(movable(v(loc[0],loc[1]-1))) loc[1]--; break;
    case 'ArrowDown': case 'KeyS':
        if(movable(v(loc[0],loc[1]+1))) loc[1]++; break;
    case 'ArrowLeft': case 'KeyA':
        if(movable(v(loc[0]-1,loc[1]))) loc[0]--; break;
    case 'ArrowRight': case 'KeyD':
        if(movable(v(loc[0]+1,loc[1]))) loc[0]++; break;
    }
    redraw();
}

function movable(t){
    //    return (t != 0 && t != 7 && t != 7.25 && t != 7.5 && t != 2 && t != 2.25 && t != 2.5);
    return (t!=0);
}

function imgloader(){
    loaded++;
    if(loaded==totalimg) redraw();
}

function visitor(x, y){
    return terrains[terragen(v01(x-1,y-1), v01(x,y-1), v01(x-1,y), v01(x,y))];
}

function terragen(a, b, c, d){
    return a | (b<<1) | (c<<2) | (d<<3);
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
}

function regimg(name){
    var s = new Image();
    totalimg++;
    s.onload = imgloader;
    s.src = 'img/' + name + '.png';
    return s;
}
