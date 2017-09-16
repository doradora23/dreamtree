//block definition
//light switch block - 스위치 color on or off

//(dropdown,"lightcolor" )

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
        .appendField(new Blockly.FieldDropdown([["앞으로","forward"], ["뒤로","backward"], ["위로","up"], ["아래로","down"]]), "move_dropdown");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['move_blk'] = function(block) {
  var dropdown_move_dropdown = block.getFieldValue('move_dropdown');
  // Move Element
  if(dropdown_move_dropdown == "forward"){ // 앞으로 일때 
  var code = "document.getElementById('circle').style.left='760px';"
  }
  if(dropdown_move_dropdown == "backward"){ // 뒤로 일때 
  var code = "document.getElementById('circle').style.left='200px';"
  }
  if(dropdown_move_dropdown == "up"){ // 위로
  var code = "document.getElementById('circle').style.top='200px';"
  }
  if(dropdown_move_dropdown == "down"){ // 아래로 
  var code = "document.getElementById('circle').style.top='500px';"
  }
  return code;
};