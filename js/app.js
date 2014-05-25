var username="";
var loginas ="";
var map;


var dest;
var destCircle;
var m1;
var m2;
var legend;

var divs = ["splash","menu", "homeClient", "homeCourier", "dashboard", "request", "communication", "aboutApp","drawer-controller-hide","drawer-controller-show", "profilo", "legend-content","dettaglio","signature"];
//"drawer-controller",


var stati = ["da ritirare", "da consegnare", "consegnato"];
var stato=0;

var azioni = ["Ritira", "Consegna", "Chuso"];
var azione=0;

// PRENDERE POSIZIONE DA GPS!!
var posizione = {"lat":"41.891735559388124" , "lon" : "12.491819858551025"};

var destinazioni = [
{"lat":"" , "lon":"" , "name": "Universita", "items":"0"},
{"lat":"" , "lon":"" , "name": "Casa", "items":"0"},
{"lat":"41.9132638845839" , "lon":"12.504587173461914" , "name": "Mamma", "items":"2"},
];
var destinazione = 0;

var percorsi = [
{"latfrom":"41.89205502378826", "lonfrom":"12.49094009399414",  "latto":"41.914",  "lonto":"12.499",  "from":"Via del Colosseo, 12",  "to":"Via di Villa Albani",  "obj":"Busta",  "note":"URGENTE", "peso": "30g"},
{"latfrom":"41.892550190450876", "lonfrom":"12.492753267288208",  "latto":"41.91228983675952",  "lonto":"12.507333755493164",  "from":"Via della Polveriera",  "to":"Viale Regina Marg..",  "obj":"Pacco",   "note":"FRAGILE", "peso": "500g"}
];
var percorso=0;


function hideAll(){
  for(i=0;i<divs.length;i++){
    document.getElementById(divs[i]).style.display = "none";    
  }
}

function showDrawerController(){
  document.getElementById("drawer-controller-hide").style.display = "block";
  document.getElementById("drawer-controller-show").style.display = "block";
  document.getElementById("menu").style.display = "block";
}



function startApp(){
  hideAll();
  if(username == ""){
    document.getElementById("splash").style.display = "block";

    //POPOLA MENU (da spostare alla login + ciclo from server)
    document.getElementById("btn-Request0").innerHTML = destinazioni[0].name + " <em>("+ destinazioni[0].items  +")</em>";
    document.getElementById("btn-Request1").innerHTML = destinazioni[1].name + " <em>("+ destinazioni[1].items  +")</em>";
    document.getElementById("btn-Request2").innerHTML = destinazioni[2].name + " <em>("+ destinazioni[2].items  +")</em>";

    // DO TEST HERE
  }else{
      // do something if logged in
  }
}


function showHome(){
  if(loginas == "courier"){
    showHomeCourier();
  }else if(loginas == "client"){
    showHomeClient();
  }else{
    startApp();
  }

}


function showHomeClient(){
  hideAll();
  loginas = "client";
  showDrawerController();
  document.getElementById("homeClient").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Client";
}

function showHomeCourier(){
  hideAll();
  loginas = "courier";
  showDrawerController();
  document.getElementById("homeCourier").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Home";
  
  if(typeof(map) == "undefined" ){  
  map =  L.mapbox.map('homeCourier', 'riccardante.i974c6me') 
.setView([posizione.lat, posizione.lon], 16);
  L.circle([posizione.lat, posizione.lon], 200).addTo(map);

  }else{

  map.setView([posizione.lat, posizione.lon], 16)
  map.removeLayer(m1);
  map.removeLayer(m2);
  map.removeLayer(dest);
  map.removeLayer(destCircle);
//  map.removeControl(legend);
//  legend = map.legendControl.removeLegend(legend);
  document.getElementById("legend-content").style.display = "none";



  }

}


function showProfilo(){
  hideAll();
  showDrawerController();
  document.getElementById("profilo").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Profilo";

}


function showRequests(){
  destinazione = 2;

  hideAll();
  showDrawerController();
  document.getElementById("homeCourier").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - " +  destinazioni[destinazione].name ;
  
  // percorso[percorso]

  map.setView([(Number(destinazioni[destinazione].lat)+Number(posizione.lat))/2,
                (Number(destinazioni[destinazione].lon)+Number(posizione.lon))/2], 
        14)

dest = L.marker([Number(destinazioni[destinazione].lat), Number(destinazioni[destinazione].lon)], {
    icon: L.mapbox.marker.icon({
        'marker-size': 'large',
        'marker-symbol': 'embassy',
        'marker-color': '#1087bf'
    })
}).addTo(map);

  destCircle = L.circle([Number(destinazioni[destinazione].lat), Number(destinazioni[destinazione].lon)], 200).addTo(map);


// FROM  41.89205502378826, 12.49094009399414   percorsi[percorso].latfrom 
m1 = L.marker([percorsi[percorso].latfrom, percorsi[percorso].lonfrom], {
    icon: L.mapbox.marker.icon({
        'marker-size': 'small',
        'marker-symbol': 'post',
        'marker-color': '#ff0000'
    })
}).addTo(map);

// TO
m2 = L.marker([percorsi[percorso].latto, percorsi[percorso].lonto], {
    icon: L.mapbox.marker.icon({
        'marker-size': 'small',
        'marker-symbol': 'post',
        'marker-color': '#ff0000'
    })
}).addTo(map);

  //PUBBLICA LEGGENDA
  //legend = map.legendControl.addLegend(document.getElementById('legend-content').innerHTML);
  document.getElementById("legend-content").style.display = "block";

// popola LEGENDA
  document.getElementById("leg-numpercorso").innerHTML=  (percorso+1) + "/" + destinazioni[destinazione].items;
  document.getElementById("leg-from").innerHTML=  percorsi[percorso].from;
  document.getElementById("leg-to").innerHTML=  percorsi[percorso].to;
  document.getElementById("leg-object").innerHTML=  percorsi[percorso].obj + "("+percorsi[percorso].peso+")";
  document.getElementById("leg-note").innerHTML=  percorsi[percorso].note;


}




function selectBike(){
  document.getElementById("div-MezzoTrasporto").style.backgroundImage = "url(style/images/iconBicycle.png)";
  showHome();
}

function selectScooter(){
  document.getElementById("div-MezzoTrasporto").style.backgroundImage = "url(style/images/Transport-scooter-icon.png)";
  showHome();
}

function selectAuto(){
  document.getElementById("div-MezzoTrasporto").style.backgroundImage = "url(style/images/Transport-car-icon.png)";
  showHome();
}

function selectTrain(){
  document.getElementById("div-MezzoTrasporto").style.backgroundImage = "url(style/images/Transport-train-icon.png)";
  showHome();
}


function showAbout(){
  hideAll();
  showDrawerController();
  document.getElementById("aboutApp").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - About";
}

function doLogoff(){
  hideAll();
  document.getElementById("splash").style.display = "block";
  document.getElementById("addtitle").innerHTML="";
}







function doSignIn(){
  hideAll();
  showDrawerController();
  username= document.getElementById("signin-username").value;
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Dashboard";
  document.getElementById("menu").style.display = "block";
  document.getElementById("menuUsername").innerHTML=username;

}

function showCommunication(){
  hideAll();
  showDrawerController();
  document.getElementById("communication").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Messages";
}



function showRequestDetail(){
  hideAll();
  showDrawerController();
  document.getElementById("request").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Detail";
}

function selectPrev(){
  // PULISCI M1 e M2
  map.removeLayer(m1);
  map.removeLayer(m2);
  map.removeLayer(dest);
  map.removeLayer(destCircle);
  //map.removeControl(legend);
  //legend = map.legendControl.removeLegend(legend);
  document.getElementById("legend-content").style.display = "none";



  if(percorso>0){
    percorso=percorso-1;
  }else{
    percorso = Number(destinazioni[destinazione].items-1);
  }
  showRequests();
}
function selectNext(){
  // PULISCI M1 e M2
  map.removeLayer(m1);
  map.removeLayer(m2);
  map.removeLayer(dest);
  map.removeLayer(destCircle);
  //map.removeControl(legend);
  // legend = map.legendControl.removeLegend(legend);
  document.getElementById("legend-content").style.display = "none";

  if(percorso<Number(destinazioni[destinazione].items)-1){
    percorso=percorso+1;
  }else{
    percorso = 0 ;
  }
  showRequests();
}

function doAccetta(){
  stato=0;
  azione=0;
  showDetails();
}

function showDetails(){
  hideAll();
  showDrawerController();

  if(stato==2){
    document.getElementById("bStatus").style.display = "none";
  }

  document.getElementById("addtitle").innerHTML=" - " + azioni[azione];

  document.getElementById("bStatus").innerHTML=  azioni[azione];
  document.getElementById("det-status").innerHTML=  stati[stato];
  document.getElementById("det-from").innerHTML=  percorsi[percorso].from;
  document.getElementById("det-to").innerHTML=  percorsi[percorso].to;
  document.getElementById("det-object").innerHTML=  percorsi[percorso].obj + "("+percorsi[percorso].peso+")";
  document.getElementById("det-note").innerHTML=  percorsi[percorso].note;

  document.getElementById("dettaglio").style.display = "block";

}

function doChangeStatus(){
  azione = azione+1;
  stato = stato+1;
  showDetails();
}


function showSignature(){
  hideAll();
  showDrawerController();
  document.getElementById("addtitle").innerHTML=" - FIRMA" ;

  document.getElementById("signature").style.display = "block";
  
}

window.onload = function () {
  // aggiungo i listner	
  document.getElementById("bLoginCourier").addEventListener("click", showHomeCourier);
  document.getElementById("btn-Profilo").addEventListener("click", showProfilo);

  document.getElementById("menuUsername").addEventListener("click", showHome);
  

  document.getElementById("btn-Request2").addEventListener("click", showRequests);

  document.getElementById("btn-About").addEventListener("click", showAbout);

  document.getElementById("prof-bike").addEventListener("click", selectBike);
  document.getElementById("prof-scooter").addEventListener("click", selectScooter);
  document.getElementById("prof-auto").addEventListener("click", selectAuto);
  document.getElementById("prof-treno").addEventListener("click", selectTrain);

  document.getElementById("legprev").addEventListener("click", selectPrev);
  document.getElementById("legnext").addEventListener("click", selectNext);
  document.getElementById("leg-accetta").addEventListener("click", doAccetta);
  document.getElementById("bContattaRitiro").addEventListener("click", showCommunication);
  document.getElementById("bContattaConsegna").addEventListener("click", showCommunication);

  document.getElementById("bChiudiComunica").addEventListener("click", showDetails);
  document.getElementById("bStatus").addEventListener("click", showSignature);


  document.getElementById("bFirma").addEventListener("click", doChangeStatus);


//  document.getElementById("").addEventListener("click", );


/*
  document.getElementById("bLoginClient").addEventListener("click", showHomeClient);
  document.getElementById("btn-LogOff").addEventListener("click", doLogoff);
  document.getElementById("bFormSignIn").addEventListener("click", doSignIn);
  
  //document.getElementById("btn-showNotifications").addEventListener("click", showCommunication);
  //document.getElementById("btn-showRequests").addEventListener("click", showRequests);


  //document.getElementById("req-001").addEventListener("click", showRequestDetail);

 */

  startCanvas();
  startApp();
};












var canvas ;



function startCanvas(){

    var signature = new ns.SignatureControl({ containerId: 'container', callback: function () {
                } 
            });
            signature.init();
/*
canvas = document.getElementById("signatureCanvas"),
    ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", pointerDown, false);
canvas.addEventListener("mouseup", pointerUp, false);
*/
}





(function (ns) {
    "use strict";
 
    ns.SignatureControl = function (options) {
        var containerId = options && options.canvasId || "container",
            callback = options && options.callback || {},
            label = options && options.label || "Signature",
            cWidth = options && options.width || "300px",
            cHeight = options && options.height || "300px",
            btnClearId,
            btnAcceptId,
            canvas,
            ctx;
 
        function initCotnrol() {
///            createControlElements();
//            wireButtonEvents();
            canvas = document.getElementById("signatureCanvas");
            canvas.addEventListener("mousedown", pointerDown, false);
            canvas.addEventListener("mouseup", pointerUp, false);
            ctx = canvas.getContext("2d");            
        }
 
        function createControlElements() {            
            var signatureArea = document.createElement("div"),
                labelDiv = document.createElement("div"),
                canvasDiv = document.createElement("div"),
                canvasElement = document.createElement("canvas"),
                buttonsContainer = document.createElement("div"),
                buttonClear = document.createElement("button"),
                buttonAccept = document.createElement("button");
 
            labelDiv.className = "signatureLabel";
            labelDiv.textContent = label;
 
            canvasElement.id = "signatureCanvas";
            canvasElement.clientWidth = cWidth;
            canvasElement.clientHeight = cHeight;
            canvasElement.style.border = "solid 2px black";
 
            buttonClear.id = "btnClear";
            buttonClear.textContent = "Clear";
 
            buttonAccept.id = "btnAccept";
            buttonAccept.textContent = "Accept";
 
            canvasDiv.appendChild(canvasElement);
            buttonsContainer.appendChild(buttonClear);
            buttonsContainer.appendChild(buttonAccept);
 
            signatureArea.className = "signatureArea";
            signatureArea.appendChild(labelDiv);
            signatureArea.appendChild(canvasDiv);
            signatureArea.appendChild(buttonsContainer);
 
            document.getElementById(containerId).appendChild(signatureArea);
        }
 
        function pointerDown(evt) {
            ctx.beginPath();
            ctx.moveTo(evt.offsetX, evt.offsetY);
            canvas.addEventListener("mousemove", paint, false);
        }
 
        function pointerUp(evt) {
            canvas.removeEventListener("mousemove", paint);
            paint(evt);
        }
 
        function paint(evt) {
            ctx.lineTo(evt.offsetX, evt.offsetY);
            ctx.stroke();
        }
 
        function wireButtonEvents() {
            var btnClear = document.getElementById("btnClear"),
                btnAccept = document.getElementById("btnAccept");
            btnClear.addEventListener("click", function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, false);
            btnAccept.addEventListener("click", function () {
                callback();
            }, false);
        }
 
        function getSignatureImage() {
            return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        }
 
        return {
            init: initCotnrol,
            getSignatureImage: getSignatureImage
        };
    }
})(this.ns = this.ns || {});