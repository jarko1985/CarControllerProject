const numberInput = document.getElementById('number');
      speedInput = document.getElementById('msg'),
      btnSendSpeed = document.getElementById('btnSendSpeed');
    


const NWLatInput = document.getElementById('msgNWLat');
      NWLngInput = document.getElementById('msgNWLng');        
      NELatInput = document.getElementById('msgNELat');  
      NELngInput = document.getElementById('msgNELng');
      SWLatInput = document.getElementById('msgSWLat');
      SWLngInput = document.getElementById('msgSWLng');
      SELatInput = document.getElementById('msgSELat');
      SELngInput = document.getElementById('msgSWLng');
      btnSendCoordsNWLat = document.getElementById('btnSendCoordsNWLat');
      btnSendCoordsNWLng = document.getElementById('btnSendCoordsNWLng');





btnSendSpeed.addEventListener('click',sendSpeed,false);
btnSendCoordsNWLat.addEventListener('click',sendCoordsNWLat,false);
btnSendCoordsNWLng.addEventListener('click',sendCoordsNWLng,false);


function sendCoordsNWLat(){
const number = numberInput.value.replace(/\D/g,'');
const Coords =  'NWLA'+NWLatInput.value
fetch('/car/:slug',{
method:'post',
headers:{
'Content-type':'application/json'
        },
body:JSON.stringify({number:number,text:Coords})             
        }).then(function(res){
            console.log(res);
        }).catch(function(err){
            console.log(err);
        });
        }



function sendCoordsNWLng(){

    const number = numberInput.value.replace(/\D/g,'');
    const Coords =  //'NWLA'+NWLatInput.value
                    'NWLN'+ NWLngInput.value
                    // 'NELA'+ NELatInput+<br/>+
                    // 'NELN'+ NELngInput+<br/>+
                    // 'SWLA'+ SWLatInput+<br/>+
                    // 'SWLN'+ SWLngInput+<br/>+
                    // 'SELA'+ SELatInput+<br/>+
                    // 'SELN'+ SELngInput;
    
    fetch('/car/:slug',{
    method:'post',
    headers:{
    'Content-type':'application/json'
    },
    body:JSON.stringify({number:number,text:Coords})             
    }).then(function(res){
    console.log(res);
    }).catch(function(err){
    console.log(err);
    });
    }
    

function sendSpeed(){
    const number = numberInput.value.replace(/\D/g,'');
    const text = 'SPDD'+speedInput.value 
fetch('/car/:slug',{
    method:'post',
    headers:{
        'Content-type':'application/json'
    },
body:JSON.stringify({number:number,text:text})

    }).then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    });
}