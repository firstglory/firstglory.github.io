function qmod(a,b){
    return ((a%b)+b)%b;
}

function enc(a,b){
    return a + ',' + b;
}

function qdiv(a,b){
    return Math.floor(a/b);
}

function newhole(){
    var a = [];
    for(var i=0; i<11; i++){
        a.push(new Array(11));
    }
    return a;
}

function initmap(a,b){
    map = {}
    map[enc(a,b)] = newhole();
    for(var i=0; i<11; i++){
        for(var j=0; j<11; j++){
            map[enc(a,b)][i][j] = (Math.random()<.75)?0:1;
        }
    }
}

function redraw(){
    counter = counter + 1;
    if(counter == 10){
        counter = 0;
    }
    qin = [qmod(xy[0],12), qmod(xy[1],12)];
    if(qin[0]!=0 && qin[1]!=0){
        house = [qdiv(xy[0],12), qdiv(xy[1],12)];
    }
    if(! (enc(house[0],house[1]) in map)){
        initmap(house[0],house[1]);
    }
    c.clearRect(0,0,600,600);
    for(var i=0; i<11; i++){
        for(var j=0; j<11; j++){
            switch(map[enc(house[0],house[1])][i][j]){
            case 0:
                c.fillStyle('white'); break;
            case 1:
                c.fillStyle('black'); break;
            case 2:
                c.fillStyle('green'); break;
            case 3:
                c.fillStyle('red'); break;
            default:
                break;
            }
            if(map[enc(house[0],house[1])][i][j]==1){
                
            }
        }
    }
}

function listen(){
    document.onkeydown = function(e){
        switch(e.code){
        case 'ArrowUp':
            xy[1] -= 1; break;
        case 'ArrowDown':
            xy[1] += 1; break;
        case 'ArrowLeft':
            xy[0] -= 1; break;
        case 'ArrowRight':
            xy[0] += 1; break;
        default:
            break;
        }
    }
}

function init(){
    initmap(0,0);
    cvs = document.getElementById('c');
    c = cvs.getContext('2d');
    listen();
    counter = 0;
    xy = [5,5];
    house = [0,0];
    setInterval(redraw, 50);
}

init();


