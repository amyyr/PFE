


function fontsize1(){

    document.getElementById("fontux").style.display = "none"
    rectx = "null"
    rectwidth = "null"
    clearInterval(intervalid);
    clearInterval(intervalid12);
    clearInterval(videointerval)

        var start = parseFloat(document.getElementById("start").value);
    var end = parseFloat(document.getElementById("end").value);
   var fontsize = document.getElementById('fontsize').value

 
   var fontstyle = document.getElementById("fontstyle").value
   var fontfamily = document.getElementById("fontfamily").value
   var fontweight = document.getElementById("fontweight").value
 
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
    document.getElementById("error").innerHTML = "Starting point is not a number"
    
    
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
    document.getElementById("error").innerHTML = "Ending Point is not a number"
    } 
    else if ( end > source.buffer.duration ){
    
    document.getElementById("error").innerHTML = "Ending point is greater than  duration"
    
    end < 0 }
    
    else if ( end <= start){
    
    document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"
    
    }



else{





   for(i=0;i<drawing.length;i++){

    if(drawing[i].id === selectedid){

    

        drawing[i].set({
            fontSize: fontsize,
            fontStyle: fontstyle,
            fontFamily: fontfamily,
            fontWeight:fontweight,
          });
    }
   }

   canvas22.clear()
   

   for(i=0;i<drawing.length;i++){

    canvas22.add(drawing[i])
   }






}
}