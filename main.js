function init(){
    console.log("LD38");
    ce = document.getElementById('ce');
    c = ce.getContext('2d');
    px = 16;
    loc = [0, 0];
    xoffset = 29;
    yoffset = 19;
    xlim = 60;
    ylim = 40;
/*    ocean = new Image();
    ocean.onload = imgloader;
    ocean.src = "ocean.png"
    sand = new Image();
    sand.onload = imgloader;
    sand.src = "sand.png"
    tree = new Image();
    tree.onload = imgloader;
    tree.src = "tree.png"*/
    person = new Image();
    person.onload = imgloader;
    person.src = "img/char.png"
/*    wolf = new Image();
    wolf.onload = imgloader;
    wolf.src = "wolf.png"*/
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
        terrains[i] = new Image();
        terrains[i].onload = imgloader;
        terrains[i].src = 'img/'+terrainnames[i]+'.png';
    }
    loaded = 0;
    totalimg = 1+16;
    document.addEventListener('keydown', keydownlistener);
}

init();

function redraw(){
    var i, j;
    for(i=0; i<xlim; i++) for(j=0; j<ylim; j++) {
        c.drawImage(visitor(loc[0]+i-xoffset, loc[1]+j-yoffset), i*px, j*px);
    }
    c.drawImage(person, xoffset*px, yoffset*px);
}

function keydownlistener(e){
    console.log(e);
    switch(e.code){
    case 'ArrowUp': case 'KeyW':
        if(visitor(loc[0],loc[1]-1) == terrains[15]) loc[1]--; break;
    case 'ArrowDown': case 'KeyS':
        if(visitor(loc[0],loc[1]+1) == terrains[15]) loc[1]++; break;
    case 'ArrowLeft': case 'KeyA':
        if(visitor(loc[0]-1,loc[1]) == terrains[15]) loc[0]--; break;
    case 'ArrowRight': case 'KeyD':
        if(visitor(loc[0]+1,loc[1]) == terrains[15]) loc[0]++; break;
    }
    redraw();
}

function imgloader(){
    loaded++;
    if(loaded==totalimg) redraw();
}

function visitor(x, y){
    return terrains[terragen(v(x,y), v(x+1,y), v(x,y+1), v(x+1,y+1))];
}

function terragen(a, b, c, d){
    return a | (b<<1) | (c<<2) | (d<<3);
}

function v(x, y){
    return 1/((x-20)*(x-20)+y*y) + 2/((x+10)*(x+10)+y*y) >= 1/100 ? 1 : 0;
}

function makegrounds(){
    
}
