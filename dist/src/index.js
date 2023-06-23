//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
var canvas;
var graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
var cv;
var obj;
var ang = 0;
function leerArchivo(e) {
    var archivo = e.target.files[0];
    console.log(archivo);
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
        obj = new Obj3D();
        if (obj.read(contenido)) {
            cv = new CvHLines(graphics, canvas);
            cv.setObj(obj);
            cv.paint();
        }
    };
    lector.readAsText(archivo);
}
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    //
    //readObject(new Input(contenido));
    elemento.innerHTML = contenido;
}
function vp(dTheta, dPhi, fRho) {
    if (obj != undefined) {
        var obj_1 = cv.getObj();
        if (!obj_1.vp(cv, dTheta, dPhi, fRho))
            alert('datos no validos');
    }
    else
        alert('aun no has leido un archivo');
}
function eyeDownFunc() {
    vp(0, 0.1, 1);
}
function eyeUpFunc() {
    vp(0, -0.1, 1);
}
function eyeLeftFunc() {
    vp(-0.1, 0, 1);
}
function eyeRightFunc() {
    vp(0.1, 0, 1);
}
function incrDistFunc() {
    vp(0, 0, 2);
}
function decrDistFunc() {
    vp(0, 0, 0.5);
}
function pza1DerFunc() {
    var af = 10;
    var tr = 0.2;
    Rota3D.initRotate(obj.w[800], obj.w[801], af * Math.PI / 180);
    for (var i_1 = 1; i_1 <= 52; i_1++) {
        obj.w[i_1] = Rota3D.rotate(obj.w[i_1]);
    }
    for (var i_2 = 58; i_2 <= 134; i_2++) {
        obj.w[i_2] = Rota3D.rotate(obj.w[i_2]);
    }
    for (var i = 1; i <= 52; i++) {
        obj.w[i].z = obj.w[i].z + tr;
    }
    for (var i = 58; i <= 134; i++) {
        obj.w[i].z = obj.w[i].z + tr;
    }
    for (var i = 800; i <= 801; i++) {
        obj.w[i].z = obj.w[i].z + tr;
    }
    cv.setObj(obj);
    cv.paint();
}
function bajar() {
    //let af = -10;
    var tr = -0.5;
    for (var i = 377; i <= 408; i++) {
        if (obj.w[408].z >= 0.1) {
            obj.w[i].z = obj.w[i].z + tr;
        }
        else {
            clearInterval(anima);
        }
    }
    console.log("object");
    cv.setObj(obj);
    cv.paint();
}
function subirPB() {
    /*     let af = 20;
        Rota3D.initRotate(obj.w[101], obj.w[102], af * Math.PI / 180);
        for (let i = 1; i <= 8; i++) {
          obj.w[i] = Rota3D.rotate(obj.w[i]);
        } */
    var tr = 0.2;
    for (var i = 377; i <= 408; i++) {
        if (obj.w[377].z <= -4.5) {
            obj.w[i].z = obj.w[i].z + tr;
        }
        else {
            clearInterval(anima);
        }
    }
    cv.setObj(obj);
    cv.paint();
}
var cont = 0;
function RotarReespaldoPositivo() {
    if (cont < 4) {
        var af = 10;
        //console.log(obj.w[29], obj.w[30]);
        Rota3D.initRotate(obj.w[900], obj.w[901], af * Math.PI / 180);
        for (var i = 233; i <= 256; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        for (var i = 281; i <= 376; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cont++;
        cv.setObj(obj);
        cv.paint();
    }
}
function RotarReespaldoNegativo() {
    if (cont > 0) {
        var af = -10;
        //console.log(obj.w[29], obj.w[30]);
        Rota3D.initRotate(obj.w[900], obj.w[901], af * Math.PI / 180);
        for (var i = 233; i <= 256; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        for (var i = 281; i <= 376; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cont--;
        cv.setObj(obj);
        cv.paint();
    }
}
function rotation() {
    var af = -10;
    //console.log(obj.w[29], obj.w[30]);
    Rota3D.initRotate(obj.w[902], obj.w[903], af * Math.PI / 180);
    for (var i = 1; i <= 100; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (var i = 233; i <= 256; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (var i = 281; i <= 408; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (var i = 900; i <= 901; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
}
function animation() {
    pza1DerFunc();
}
function animationR() {
    bajar();
}
function subir() {
    subirPB();
}
function rotar() {
    rotation();
}
function reespaldo() {
    RotarReespaldoPositivo();
}
function returnReespaldo() {
    RotarReespaldoNegativo();
}
function detenerAA() {
    clearInterval(anima);
}
var anima;
function iniciarAnimacion() {
    anima = setInterval(animation, 75);
}
function BajarPosaBrazos() {
    anima = setInterval(animationR, 75);
}
function subirPosaBrazos() {
    anima = setInterval(subir, 75);
}
function rotacion() {
    anima = setInterval(rotar, 75);
}
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);
//movimiento de piezas
document.getElementById('pza1Der').addEventListener('click', subirPosaBrazos, false);
document.getElementById('pza12Izq').addEventListener('click', BajarPosaBrazos, false);
document.getElementById('pza12Der').addEventListener('click', detenerAA, false);
document.getElementById('Patita').addEventListener('click', reespaldo, false);
document.getElementById("Regresar").addEventListener("click", returnReespaldo, false);
document.getElementById("rotacionCompleta").addEventListener("click", rotacion, false);
var Pix, Piy;
var Pfx, Pfy;
var theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
var flag = false;
function handleMouse(evento) {
    Pix = evento.offsetX;
    Piy = evento.offsetY;
    flag = true;
}
function makeVizualization(evento) {
    if (flag) {
        Pfx = evento.offsetX;
        Pfy = evento.offsetY;
        //console.log(Pfx, Pfy)
        var difX = Pix - Pfx;
        var difY = Pfy - Piy;
        vp(0, 0.1 * difY / 50, 1);
        Piy = Pfy;
        vp(0.1 * difX, 0 / 50, 1);
        Pix = Pfx;
        /*if( Piy>Pfy+1 ){
          phi += SensibilidadY;
          vp(0, 0.1*, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Piy=Pfy;
        }
    
        if(Pfy>Piy+1){
          phi -= SensibilidadY;
          vp(0,-0.1, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Piy=Pfy;
        }*/
        /*if (Pix > Pfx + 1) {
          theta += SensibilidadX;
          vp(0.1, 0, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Pix = Pfx;
        }
            
        if (Pfx > Pix + 1) {
          theta -= SensibilidadX;
          vp(-0.1, 0, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Pix = Pfx;
        }*/
    }
}
function noDraw() {
    flag = false;
}
canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);
