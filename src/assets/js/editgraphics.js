var type;


function graphicedit1(){


    var id = document.getElementById('graphicid').value

    var framestart = document.getElementById('graphicframestart').value
    
    var frameend = document.getElementById('graphicframeend').value


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
            
    else if ( end > source.buffer.duration ){
    
    document.getElementById("error").innerHTML = "Ending point is greater than  duration"
    
    end < 0 }
    
    else if ( end <= start){
    
    document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"
    
    }



else{


    var id = document.getElementById('graphicid').value
    var idget = document.getElementById(id)

    

    var framestart = parseFloat(document.getElementById('graphicframestart').value)
    
    var frameend = parseFloat(document.getElementById('graphicframeend').value)

for (i=0;i<drawing.length;i++){

    if(drawing[i].id ===parseInt(id)){

        drawing[i].framestart = framestart
        drawing[i].frameend = frameend

        idget.innerHTML = "Type: "+drawing[i].type + " | " + "StartTime: " + framestart.toFixed(3) + " | " +"EndTime: " + frameend.toFixed(3)
    }
}

}


}
