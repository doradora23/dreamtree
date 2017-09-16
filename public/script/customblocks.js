//block definition
//light switch block - 스위치 color on or off

//(dropdown,"lightcolor" )
var myGamePiece;
var mycanvas;

function startGame() {
  myGamePiece = new component(100, 100, "../stylesheets/cocoding.png", 10, 10, "image");
  myGameArea.start();
  
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = 350;
      this.canvas.height = 350;
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
  myGamePiece.newPos();
  //myGamePiece.update();

  if (myGameArea.x && myGameArea.y) {
      myGamePiece.x = myGameArea.x;
      myGamePiece.y = myGameArea.y;        
  }
  myGamePiece.update();
}
function clearmove() {
  myGamePiece.image.src = "../stylesheets/cocoding.png";
  myGamePiece.speedX = 0; 
  myGamePiece.speedY = 0; 
}


/* block! */

Blockly.Blocks['move_mouse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["마우스커서로","mouse"]]), "moveLocation")
        .appendField("위치 이동");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip('');
 this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['move_mouse'] = function(block) {
  var dropdown_moveLocation = block.getFieldValue('moveLocation');
  // TODO: Assemble JavaScript into code variable.
  if(dropdown_moveLocation == "mouse"){
    document.getElementById("myCanvas").style.cursor = "none"; //hide the original cursor    
    window.addEventListener('mousemove', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
  });
  return code;
  }
};


Blockly.Blocks['lightswitch'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("색 바꾸기")
      .appendField(new Blockly.FieldDropdown([["빨강","red"], ["노랑","yellow"], ["초록","green"]]), "lightcolor")
      .appendField(new Blockly.FieldDropdown([["켜기","on"], ["끄기","off"]]), "switch");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip('');
 this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['lightswitch'] = function(block) {
  var dropdown_lightcolor = block.getFieldValue('lightcolor');
   var dropdown_switch = block.getFieldValue('switch');
   // TODO: Assemble JavaScript into code variable.
   if(dropdown_switch == "on"){
    var code = "document.getElementById('circle').style.backgroundColor=\'"+dropdown_lightcolor+"\';"
 
   }
   if(dropdown_switch == "off"){
     var code = "document.getElementById('circle').style.backgroundColor='white';"
   }
   return code;
};

// ADD move Block 
Blockly.Blocks['move_blk'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("이동하기")
        .appendField(new Blockly.FieldDropdown([["앞으로","forward"], ["뒤로","backward"], ["위로","up"], ["아래로","down"]]), "move_blk_walk");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['move_blk'] = function(block) {
  var dropdown_move_dropdown = block.getFieldValue('move_blk_walk');
  var delayMillis = 1000; //5 second
  var myinterval;

  // Move Element
  if(dropdown_move_dropdown == "forward"){ // 앞으로 일때 
    var code = "myGamePiece.x += 0.1;"
    myinterval = setInterval(code, 1);

    setTimeout(function() {
      //your code to be executed after 5 second
      clearInterval(myinterval);      
    }, delayMillis);

    }
  if(dropdown_move_dropdown == "backward"){ // 뒤로 일때 
    var code = "myGamePiece.x -= 0.1;"
    myinterval = setInterval(code, 1);
    
        setTimeout(function() {
          //your code to be executed after 5 second
          clearInterval(myinterval);      
        }, delayMillis);
    
  }
  if(dropdown_move_dropdown == "up"){ // 위로
    var code = "myGamePiece.y -= 0.1;"
    myinterval = setInterval(code, 1);
    
        setTimeout(function() {
          //your code to be executed after 5 second
          clearInterval(myinterval);      
        }, delayMillis);
    
  }
  if(dropdown_move_dropdown == "down"){ // 아래로 
    var code = "myGamePiece.y += 0.1;"
    myinterval = setInterval(code, 1);
    
        setTimeout(function() {
          //your code to be executed after 5 second
          clearInterval(myinterval);      
        }, delayMillis);
    
  }
  return code;
};
