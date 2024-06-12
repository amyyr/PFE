var type;


function animationedit1(){


    var id = document.getElementById('getid').value

    var from = document.getElementById('fromnew').value
    
    var to = document.getElementById('tonew').value

    var start = document.getElementById('stnew').value

    var end = document.getElementById('etnew').value
    rectx = "null"
    rectwidth = "null"
    clearInterval(intervalid);
    clearInterval(intervalid12);
    clearInterval(videointerval)

        var start = parseFloat(document.getElementById("start").value);
    var end = parseFloat(document.getElementById("end").value);

 
    time=0;
        if(source){
            source.stop();
        }

        if(source1){
            source1.stop();
        }
    
     
        document.getElementById("timer").innerHTML = time;
      
        if (check === null ){
    
    document.getElementById("error").innerHTML = "Please select a file"
    
    }
    
    else if (bufferarray===null){
    
    document.getElementById("error").innerHTML = "No data available"
    
    }
    
    else if (isNaN(start)){
    document.getElementById("error").innerHTML = "Starting Time is not a number"
    
    
    }
    else if (start >= source.buffer.duration){
    document.getElementById("error").innerHTML = "starting point is greater than or equal to source buffer duration"
    
    } 
    
    else if (start < 0 )
    {
    
    document.getElementById("error").innerHTML = "Starting Point must be greater than 0"
    
    }
    else if (start >= end) {
    document.getElementById("error").innerHTML = "Starting Point must be less than Ending Point"
    
    }
    
    else if (isNaN(end)){
    document.getElementById("error").innerHTML = "Ending Time is not a number"
    } 

    else if (isNaN(id)){
        document.getElementById("error").innerHTML = "Id is not a number"
        } 
        else if (isNaN(from)){
            document.getElementById("error").innerHTML = "From Point is not a number"
            } 

            else if (isNaN(to)){
                document.getElementById("error").innerHTML = "To Point is not a number"
                } 
        
    else if ( end > source.buffer.duration ){
    
    document.getElementById("error").innerHTML = "Ending point is greater than  duration"
    
    end < 0 }
    
    else if ( end <= start){
    
    document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"
    
    }



else{


    var id = document.getElementById('getid').value

    var from = document.getElementById('fromnew').value
    
    var to = document.getElementById('tonew').value

    var start = document.getElementById('stnew').value

    var end = document.getElementById('etnew').value

   
var final = end - start

for(i=0;i<drawing.length;i++){


    for(j=0;j<drawing[i].animationarray.length;j++){

if(drawing[i].animationarray[j].animationid === parseInt(id)){

    drawing[i].animationarray[j].startvalue = parseFloat(from) 
    drawing[i].animationarray[j].endvalue = parseFloat(to) 
    drawing[i].animationarray[j].framestart = parseFloat(start) 
    drawing[i].animationarray[j].initialvalue = parseFloat(from) 
    drawing[i].animationarray[j].frameend = parseFloat(end) 

    var totalvalue = to-from
    var totalfinal = final*videoinfo.samplerate

    var z = totalvalue/totalfinal

    drawing[i].animationarray[j].jump = z

    type = drawing[i].animationarray[j].property



}
    }
}

var animationtab = document.getElementById(id);

animationtab.innerHTML = "Id: "+parseInt(id) + " | "+ "Type: "+animationtab.maindata.property+ " | " + "ST: " +parseFloat(start).toFixed(3) + " | " +"ET: " + parseFloat(end).toFixed(3)  + " | " + "From: " + parseFloat(from) .toFixed(3) + " | " + "To: "+parseFloat(to) .toFixed(3)
animationtab.maindata.startvalue = parseFloat(from) 
animationtab.maindata.initialvalue = parseFloat(from) 
animationtab.maindata.endvalue = parseFloat(to) 
animationtab.maindata.framestart = parseFloat(start) 
animationtab.maindata.frameend = parseFloat(end) 




}


}
