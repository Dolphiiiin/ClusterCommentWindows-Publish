function openClose(){
    var obj = document.getElementsByClassName("openHere");
    for(var i=0;i<obj.length;i++){
        if(obj[i].style.display == "inline-block")
            obj[i].style.display = "none";
        else
            obj[i].style.display = "inline-block";
    }
}