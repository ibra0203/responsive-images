var imgDir= "img/";
var imgExt =".jpg";
var pics =[];

//Gets Y of element in the document to check if on the same row 
function findY(element) {
  var rec = element.getBoundingClientRect();
  return rec.top + window.scrollY;
}
//for updating screen dimensions (width x height) 
function displayDim() 
{
    var dim =document.getElementById("dim-disp");
    var w = window.innerWidth;
    var h = window.innerHeight;
    dim.innerHTML = "Screen Dimensions:  " + w +"x"+ h;
}

//automatically loads images
function loadImages()
{
    var nUl = document.getElementById("image-list");
    var dummyPic = nUl.getElementsByTagName("LI")[0];
    var nPic = dummyPic.cloneNode(true);
    nUl.innerHTML="";//
    var i=0;
    for(i=0; i<7;i++)
    {
        nPic = nPic.cloneNode(true);
        
       imgL = imgDir+"img"+(i+1)+"L"+imgExt;
       imgM = imgDir+"img"+(i+1)+"M"+imgExt;
       imgS = imgDir+"img"+(i+1)+"S"+imgExt;
       var imgSrcs = nPic.children[0].children;
       imgSrcs[0].setAttribute("srcset", imgL);
       imgSrcs[1].setAttribute("srcset", imgM);
       imgSrcs[2].setAttribute("srcset", imgS);
       imgSrcs[3].src =imgM;
        
       nUl.appendChild(nPic);
       pics.push(nPic);
    }

}

//registers listeners
function registerListeners()
{
    var i=0;
    for(i=0; i<pics.length;i++)
    {
        pics[i].addEventListener("mouseenter", onItemHover);
        pics[i].addEventListener("mouseout", onItemHoverExit);
    }
}
//classes to be added for additional behaviors when hovering
function onItemHover(e)
{
    var _target = e.target;
    var _targetY = findY(_target);
    _target.classList.add("hovered");
    var i=0;
    for(i=0; i<pics.length;i++)
    {
        var _pic = pics[i];
        var _picY = findY(_pic);
        if(_pic != _target)
        {
            _pic.classList.add("unselected");
            
        }
        if(_picY == _targetY)
        {
            _pic.classList.add("hover-row");
        } 
        
    }
    var lastHoverRow = document.getElementsByClassName("hover-row");
    lastHoverRow = lastHoverRow[lastHoverRow.length-1];
    lastHoverRow.classList.add("last-hover-row");
   
}
//removes classes when unhovering
function onItemHoverExit(e)
{
    var i=0;
    for(i=0; i<pics.length;i++)
    {
        var _pic = pics[i];
        if(_pic.classList.contains("unselected"))
            _pic.classList.remove("unselected");
        if(_pic.classList.contains("hover-row"))
            _pic.classList.remove("hover-row");
        if(_pic.classList.contains("hovered"))
            _pic.classList.remove("hovered");
        if(_pic.classList.contains("last-hover-row"))
            _pic.classList.remove("last-hover-row");
    }

}

//Init the script
function init()
{
    displayDim();
    loadImages();
    registerListeners(); 
}
init();