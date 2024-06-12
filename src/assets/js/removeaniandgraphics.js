function remove(){


    document.getElementById("removegraphics").innerHTML = ""
    
    for(i=0;i<drawing.length;i++){
        var button = document.createElement("button")
        button.id = drawing[i].id;
        button.innerHTML = "Type: "+drawing[i].type + " | " + "StartTime: " + drawing[i].framestart.toFixed(3) + " | " +"EndTime: " + drawing[i].frameend.toFixed(3)
        button.className = "list-group-item list-group-item-action"
        button.classList.add("backgroundclass")
        button.type = "button"
        document.getElementById("removegraphics").appendChild(button)
    
        button.addEventListener("dblclick", function(event){
    
                          for (i=0;i<drawing.length;i++){
    
            if(parseInt(drawing[i].id)===parseInt(event.target.id)){
    
                drawing.splice(i, 1)
    
             event.target.remove();
             document.getElementById("animationadd").innerHTML = ""
    
    canvas22.clear()
             for(i=0;i<drawing.length;i++){
    
                canvas22.add(drawing[i])
             }
    
               
                
            }
        }
        })
       
    
    
        button.addEventListener("click", function(event){
    
    document.getElementById("graphicid").value = event.target.id
    
    
    for(i=0;i<drawing.length;i++){
    
        if(drawing[i].id ===parseInt(event.target.id)){
    
            document.getElementById("graphicframestart").value = drawing[i].framestart
            document.getElementById("graphicframeend").value = drawing[i].frameend
            
        }
    }
    
    
    
    
            canvas22.clear();
            selectedid = event.target.id
    
            for(i=0;i<drawing.length;i++){
    
                if(drawing[i].id===parseInt(event.target.id)){
    canvas22.add(drawing[i])
    }
               
    
    
            }
    
            
        var uibuttons =  document.getElementsByClassName("backgroundclass")
    
        for (i=0;i<uibuttons.length;i++){
    
            uibuttons[i].style.backgroundColor = "white"
            
            uibuttons[i].style.color = "black"
        }
    
            event.target.style.backgroundColor = "blue"
            event.target.style.color = "white"
        
            document.getElementById("animationadd").innerHTML = ""
        
           for(i=0;i<drawing.length;i++){
        if(parseInt(drawing[i].id) === parseInt(event.target.id)){
        
        for(j=0;j<drawing[i].animationarray.length;j++){
        
        var button2 = document.createElement("button")
        button2.id = drawing[i].animationarray[j].animationid;
        button2.maindata = drawing[i].animationarray[j]
          button2.innerHTML ="Id: "+drawing[i].animationarray[j].animationid +  " | " +"Type: "+drawing[i].animationarray[j].property + " | " + "ST: " + drawing[i].animationarray[j].framestart.toFixed(3) + " | " +"ET: " + drawing[i].animationarray[j].frameend.toFixed(3)  + " | " + "From: " + drawing[i].animationarray[j].initialvalue.toFixed(3) + " | " + "To: "+drawing[i].animationarray[j].endvalue.toFixed(3)
        button2.className = "list-group-item list-group-item-action"
        button2.classList.add("backgroundclass1")
        button2.type = "button"
    
    
    
    
    
        button2.addEventListener("click", function(event){
    
            document.getElementById("getid").value = event.target.id
    
    document.getElementById("fromnew").value = event.target.maindata.initialvalue
    
    document.getElementById("tonew").value = event.target.maindata.endvalue
    document.getElementById("stnew").value = event.target.maindata.framestart
    
    document.getElementById("etnew").value = event.target.maindata.frameend
    
    
            var uibuttons1 =  document.getElementsByClassName("backgroundclass1")
    
            for (i=0;i<uibuttons1.length;i++){
        
                uibuttons1[i].style.backgroundColor = "white"
                
                uibuttons1[i].style.color = "black"
            }
        
                event.target.style.backgroundColor = "blue"
                event.target.style.color = "white"
    
    
        })
        
        
        
        button2.addEventListener("dblclick", function(event){
    
            event.target.remove();
        
            for (i=0;i<drawing.length;i++){
                for(j=0;j<drawing[i].animationarray.length;j++){
                
                    if(parseInt(event.target.id) === drawing[i].animationarray[j].animationid){
               
                        drawing[i].animationarray.splice(j, 1)
        
                        if(drawing[i].animationarray.length<=0){
        
                            drawing[i].animation = false
                        }
                    }
                }
                
                    }
        
        
                    
        })
        
        document.getElementById("animationadd").appendChild(button2)
        
        
        }
        }
        
           }
        })
    
    
    
    
    
    
    }}