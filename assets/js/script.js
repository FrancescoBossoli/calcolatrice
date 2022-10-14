var display = document.getElementById("displayPrincipale");
var memo = document.getElementById("displayMemo");
var temp = "";

//////////////////////////////////////////////// Calcolatrice Basic ////////////////////////////////////////////////////////

function cancellaSegno() {
    memo.value = memo.value.substring(0, memo.value.length-1);
}

function scriviNumero(num) {
    if (memo.value == display.value && temp !== "") {  /* Fix per reset del numero dopo aver schiacciato uguale */
        temp = ""
        display.value = num;
        memo.value = display.value;
    }
    else if (display.value == "0") {  /* Toglie lo zero digitato davanti a un termine */
        display.value = num;
        cancellaSegno();
        memo.value += num;        
    }
    else {
        display.value += num;
        memo.value += num;
        if (temp !== "") {   /* Attributo variabile temporanea su nuova operazione */
            temp += num;        
        }
    }
}

function scriviZero() {
    if (display.value == "0") {
        display.value = 0;
    }
    else {
        scriviNumero(0);
    }
}

function segno(segno) {
    if (display.value == "" &&  memo.value == "") {  /* Se si schiaccia un operatore a schermo vuoto, il primo termine sarà 0 */
        memo.value +="0";
        memo.value += segno; 
    }
    else if (display.value == "" && memo.value.slice(-1) !== ")") {  /* Se si schiaccia un operatore e poi un altro subito dopo, il secondo sovrascrive il primo */
        cancellaSegno();
        memo.value += segno;
    }
    else     {
        display.value = "";
        memo.value += segno;
    }    
    temp = segno;       /* Reset variabile temporanea */
}

function scriviPunto() {
    if (display.value.includes(".") == false) {
        if (display.value == "") {  /* Fix per il punto schiacciato come primo carattere */
            display.value += "0.";
            memo.value += "0.";
            if (temp !== "") {  
                temp += "0.";        
            }
        }
        else {
            display.value += ".";
            memo.value += ".";
            if (temp !== "") {  
                temp += ".";        
            }
        }
    }
    else if (display.value == memo.value && temp !== "") {  /* Fix per punto schiacciato dopo aver dato = */
        display.value = "0.";
        memo.value = "0.";
        temp = "";
    }
}       /* Fix per il punto schiacciato più volte definendo un termine */

function reset() {
    display.value = "";
    memo.value = "";
    temp = "";
}

function uguale() {
    if (display.value == "" && memo.value.slice(-1) !== ")") { /* fix parentesi */
       display.value = "";      /* Per evitare di visualizzare "undefined" se il display è vuoto */
    } 
    else if (display.value !== memo.value) {
        /* display.value = eval(memo.value);  pare sia meglio non usarlo */
        display.value = (new Function('return '+ memo.value)());                     
    }
    else if (temp == null) {    /* fix per tasti speciali */
        memo.value = display.value;
    }
    else {
        /* Fix per usare = più volte di fila */
        display.value = (new Function('return '+ memo.value + temp)());              
    }
    memo.value = display.value;  
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function solito() {
    temp=null;
    uguale();
}

function cancella() {
    display.value = display.value.slice(0, -1);
    memo.value = memo.value.slice(0, -1);
    temp = temp.slice(0, -1);
}

function parentesi(arg) {
    display.value = "";
    memo.value += arg;
}

function potenza(num) {
    memo.value += "**" + num;
    solito()
}

function frazione() {
    memo.value = 1/(display.value);
    solito()
}

function fattoriale() {
    var risultato = 1;
    if (display.value === 0) {
      display.value = "1";
    } 
    else if (display.value < 0) {
      display.value = "-1";
    } 
    else {
      var risultato = 1;
      for (var i = display.value; i > 0; i--) {
        risultato = risultato * i;
      }
      display.value = risultato;
      memo.value = risultato;
      temp=null;
    }
}

function logaritmoN() {
    memo.value = Math.log(memo.value);
    solito()
}
    
function logaritmo() {
    memo.value = Math.log10(memo.value);
    solito()
}

function radice2() {
    memo.value = Math.sqrt(memo.value);
    solito()
}

function radice3() {
    memo.value = Math.cbrt(memo.value);
    solito()
}

function seno() {
    memo.value = Math.sin(memo.value);
    solito()
}

function coseno() {
    memo.value = Math.cos(memo.value);
    solito()
}

function tangente() {
    memo.value = Math.tan(memo.value);
    solito()
}

function uniforme() {
    temp=null;
    display.value = memo.value;
}

function valoreAssoluto() {
    memo.value = Math.abs(display.value);
    uniforme()
}

function cambiaSegno() {
    memo.value = display.value * -1;
    uniforme()
}

function esponenziale() {
    memo.value = Math.exp(display.value);
    uniforme()
}  