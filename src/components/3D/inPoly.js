export function inPoly(position, sinkState, boxSize, scal){
    // console.log("!!!!!!!!!", position, sinkState, boxSize, scal)
    var x = position.x<0 ? position.x - sinkState.width/scal/2 : position.x + sinkState.width/scal/2;
    var y = position.y<0 ? position.y - sinkState.height/scal/2 : position.y + sinkState.height/scal/2;
    let xp, yp

    if(boxSize.forma === 3){ // ограничение координат для П-образной формы
        // Координаты  П образной модели
        xp = new Array( // Массив X-координат полигона
            -boxSize.widthAll/scal+boxSize.widthRight/scal/2, //1
            -boxSize.widthAll/scal+boxSize.widthRight/scal/2, //2
            boxSize.widthRight/scal/2, //3
            boxSize.widthRight/scal/2, //4
            -boxSize.widthRight/scal/2, //5
            -boxSize.widthRight/scal/2, //6
            -boxSize.widthAll/scal+boxSize.widthRight/scal, //7
            -boxSize.widthAll/scal+boxSize.widthRight/scal, //8
        ); // Массив X-координат полигона
        yp = new Array( // Массив Y-координат полигона
            -boxSize.heightAll/scal/2, //1
            boxSize.heightAll/scal/2, //2
            boxSize.heightAll/scal/2, //3
            -( boxSize.heightAll/scal/2 - (boxSize.heightAll - boxSize.heightRight)/scal ), //4
            -( boxSize.heightAll/scal/2 - (boxSize.heightAll - boxSize.heightRight)/scal ), //5
            boxSize.heightAll/scal/2 - boxSize.heightRight/scal + boxSize.heightInsideRight/scal, //6
            (boxSize.heightAll/2 - (boxSize.heightRight - boxSize.heightInsideRight))/scal, //7
            -boxSize.heightAll/scal/2, //8
        ); // Массив Y-координат полигона
       
    }else if(boxSize.forma === 2){ // ограничение координат для Г-образной формы
        xp = new Array( // Массив X-координат полигона
            -boxSize.widthVertical/scal/2,
            -boxSize.widthVertical/scal/2,
            (boxSize.widthAll-boxSize.widthVertical/2)/scal,
            (boxSize.widthAll-boxSize.widthVertical/2)/scal,
            boxSize.widthVertical/scal/2,
            boxSize.widthVertical/scal/2,
        ); // Массив X-координат полигона
        yp = new Array( // Массив Y-координат полигона
            -boxSize.heightAll/scal/2,
            boxSize.heightAll/scal/2,
            boxSize.heightAll/scal/2,
            (boxSize.heightAll - boxSize.heightGorizonal*2)/scal/2,
            (boxSize.heightAll - boxSize.heightGorizonal*2)/scal/2,
            -boxSize.heightAll/scal/2,
        ); // Массив Y-координат полигона
       
    }

    var npol = xp.length;
    var j = npol - 1;
    var c = false;

    for (var i = 0; i < npol;i++){
        if ((((yp[i]<=y) && (y<yp[j])) || ((yp[j]<=y) && (y<yp[i]))) &&
          (x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) {
          c = !c
        }
      j = i;
    }
    return c;
}
