//block definition
//light switch block - 스위치 color on or off

//(dropdown,"lightcolor" )
var myGamePiece;
var mycanvas;

function startGame() {
  myGamePiece = new component(30, 30, "../stylesheets/003-happy.png", 10, 10, "image");
  myGameArea.start();
  
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = 270;
      this.canvas.height = 270;
      this.canvas.id= "myCanvas";
      this.context = this.canvas.getContext("2d");
      //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      document.getElementById("canvasdiv").appendChild(this.canvas);
      this.frameNo = 0;
      this.interval = setInterval(updateGameArea, 20);
      },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
      clearInterval(this.interval);
  }
}


Blockly.Blocks['move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["마우스포인터","mouse"], ["all","all"]]), "moveLocation")
        .appendField("위치로 이동");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip('');
 this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['move'] = function(block) {
  var dropdown_moveLocation = block.getFieldValue('moveLocation');
  // TODO: Assemble JavaScript into code variable.
  if(dropdown_moveLocation == "mouse"){
    document.getElementById("myCanvas").style.cursor = "none"; //hide the original cursor    
    window.addEventListener('mousemove', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
  })
  }
  if(dropdown_moveLocation == "off"){
    var code = "document.getElementById('circle').style.backgroundColor='white';"
  }
  return code;
};



function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
      this.image = new Image();
      this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;    
  this.x = x;
  this.y = y;    
  this.update = function() {
      ctx = myGameArea.context;
      if (type == "image") {
          ctx.drawImage(this.image, 
              this.x, 
              this.y,
              this.width, this.height);
      } else {
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
      }
  }
  this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;        
  }
}

function updateGameArea() {
  myGameArea.clear();
  //myGamePiece.newPos();
  //myGamePiece.update();

  if (myGameArea.x && myGameArea.y) {
      myGamePiece.x = myGameArea.x;
      myGamePiece.y = myGameArea.y;        
  }
  myGamePiece.update();
}
function clearmove() {
  myGamePiece.image.src = "../stylesheets/003-happy.png";
  myGamePiece.speedX = 0; 
  myGamePiece.speedY = 0; 
}