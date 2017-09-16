//block definition
//light switch block - 스위치 color on or off

//(dropdown,"lightcolor" )

Blockly.Blocks['lightswitch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn")
        .appendField(new Blockly.FieldDropdown([["red","R"], ["yellow","Y"], ["green","G"], ["all","all"]]), "lightcolor")
        .appendField(new Blockly.FieldDropdown([["very on","on"], ["real off","off"]]), "switch");
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
    var code = "document.getElementById('circle').style.backgroundColor='red';"
  }
  if(dropdown_switch == "off"){
    var code = "document.getElementById('circle').style.backgroundColor='white';"
  }
  return code;
};


