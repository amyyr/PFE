


function addsquare1(){


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



    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 50,
        height: 50,
        });
        
       
      rect.framestart = start
      rect.frameend = end
      rect.animation = false;
      rect.type = "Rectangle"
      rect.animationarray = []
      rect.id = drawingid


  
  

      rect.on("mousedown", function(options){
        selectedid = options.target.id
})

rect.on("scaling",function(options){

    var target = options.target;

    // Get the new scaled width and height
    var newWidth = target.width * target.scaleX;
    var newHeight = target.height * target.scaleY;

    // Set the new dimensions, maintaining the top-left position
    target.set({
        width: newWidth,
        height: newHeight,
        scaleX: 1, // Reset scale back to 1 to prevent compounding scaling issues
        scaleY: 1,
    });

    // Optionally, if you want to maintain the object's top-left corner position:
    var newTop = target.top - (newHeight - target.height) / 2;
    var newLeft = target.left - (newWidth - target.width) / 2;

    target.set({
        top: newTop,
        left: newLeft,
    });

    // Render the canvas to see the changes

})

     
  
        
    drawing.push(rect);

    remove();

    drawingid++;

    canvas22.add(drawing[drawing.length-1])






}
}








