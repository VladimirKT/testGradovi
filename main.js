
var xml = new XMLHttpRequest();
var divIn = document.querySelector("#serS");
var place = document.getElementById("inputName");
var timeS = document.getElementById("vr");
var partS = document.getElementById("ob");
var butt =  document.getElementById("posalji");
var bodyT = document.getElementById("display");
var dellB= document.getElementsByClassName("pdB");
var buZZ = document.getElementById("kraj");
var rezZ = document.getElementById("sRez");
var pom = document.getElementById("proc");
var sve = [];
var opcije = [];
var gradovi = [];
var tacni = [];
var rez = 0;
var text="";

function first(){
localStorage.removeItem('tacni');
localStorage.removeItem('gradovi')
butt.addEventListener("click", dodaj);
buZZ.addEventListener("click", kraj);
place.addEventListener("keyup", function()  {
  var text="";
 if (place.value.length >= 1){
  for(var i = 0; i<sve.length; i++){
    if(sve[i].toUpperCase().startsWith(place.value.toUpperCase())){
      console.log(sve[i].toUpperCase());
      console.log(place.value.toUpperCase());
      text+= "<p>"+sve[i]+"</p>"
     }
   }
   divIn.innerHTML= text;
  }
})
    xml.open('get','podaci.json');
    xml.onreadystatechange = function (){
  if(this.status == 200 && this.readyState == 4){
    getData(xml)
     }
  }
  xml.send();
}
function getData(xml){
  var data = xml.responseText;
  var xmlData = JSON.parse(data);
  var ponuda = xmlData.ponudjene;
  var vreme = xmlData.vreme;
  var oblast = xmlData.oblast;
  var tac = xmlData.tacno;
  for( var i = 0; i<tac.length; i++){
    tacni.push(tac[i].toUpperCase())
  };
  for( var i = 0; i<ponuda.length; i++){
    sve.push(ponuda[i].toUpperCase())
  }
  partS.innerHTML = oblast.toUpperCase();
  timeS.innerHTML = vreme;
  var odbr = setInterval(function(){
    vreme--;
    timeS.innerHTML = vreme;
    if(vreme===0){
      clearInterval(odbr);
      location.href = "rez.html";
    }
  },1000)
  localStorage.tacni = JSON.stringify(tacni);

}




function dodaj(e) {
  e.preventDefault()
  var inpCity = place.value.toUpperCase()
  gradovi.push(inpCity)
  place.value = "";
  iks = gradovi.length-1;
  text += "<p>"+gradovi[iks]+" " +" <button id='"+inpCity+"' class='pdB'>Delete</button></p>";
  bodyT.innerHTML = text;
  console.log(rez);
  for(var i = 0; i<dellB.length; i++){
  dellB[i].addEventListener("click", dellP);
  localStorage.gradovi = JSON.stringify(gradovi);
  }
 };



function dellP(){
  gradovi = JSON.parse(localStorage.gradovi);
  for(var i = 0; i<gradovi.length; i++){
    if(this.id === gradovi[i]){
      gradovi.splice(i ,1)
    }
  }

  refreshGui();
}

function kraj(){
  location.href = "rez.html";
  }

function rezultat(){
  gradovi = JSON.parse(localStorage.gradovi);
  tacni = JSON.parse(localStorage.tacni);

  for(var i = 0; i<gradovi.length; i++){
  if(gradovi[i]===tacni[0] || gradovi[i]===tacni[1] || gradovi[i]===tacni[2] || gradovi[i]===tacni[3]){
   rez++;
  }
 }
 var reza = rez;
 var ukup = gradovi.length;
 var procent = reza / ukup * 100;
 var proc = Math.floor(procent);
 rezZ.innerHTML = proc;
 var piksel = proc * 8;
 var pos = 0;

 var pomeranje = setInterval(function() {
  if(pos == piksel){
    clearInterval(pomeranje)
  }else{
    pos++
    pom.style.width = pos + "px";
  }
 },10)

}

function refreshGui(){
   localStorage.gradovi = JSON.stringify(gradovi)
    var text="";
    for( var i=0; i<gradovi.length; i++){
      text += "<p>"+gradovi[i]+" " +" <button id='"+gradovi[i]+"' class='pdB'>Delete</button></p>";
    }
    bodyT.innerHTML = text;
    for(var i = 0; i<dellB.length; i++){
    dellB[i].addEventListener("click", dellP);
    }
}
