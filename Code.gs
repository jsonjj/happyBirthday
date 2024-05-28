 // Global variable to store the curvature of the text
let curvature = 0;
let CURVED_TEXT_GROUP;
let info = {};

// Create a custom menu to access the curved text functionality
function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Curved Text')
    .addItem('Add new...', 'showCurvedTextDialog')
    .addToUi();
}


function showCurvedTextDialog(){
  var html = HtmlService.createHtmlOutputFromFile('dlg')
      .setTitle('Curved Text Settings');
  SlidesApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}
// Show a prompt to input the curvature angle
function showCurvedTextPrompt() {
  const ui = SlidesApp.getUi();
  const response = ui.prompt('Curved Text', 'Input your curved text:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === ui.Button.OK) {
    const txt = response.getResponseText();
    createCurvedText(txt);
  }
}

// Function to create curved text
function createCurvedText(txt,r,cb) {
  const currentSlide = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
  const letters = [];
  const radius = r || 100;
  txt = txt || "test";
  var angleStep = 10 * 100 / radius;
  var angleOffset = angleStep * txt.split("").length/2;
  txt.split("").forEach((letter,idx) => {
    const letterShape = currentSlide.insertTextBox(letter);
    letterShape.setWidth(10);
    letterShape.setRotation(angleStep * idx - angleOffset);

    var curAngle = 90 + angleStep * idx - angleOffset;
    var angleRadians=curAngle*(Math.PI/180);
    var left = -Math.cos(angleRadians) * radius + radius;
    var top = -Math.sin(angleRadians) * radius + radius;

    // if (idx > 0){
      letterShape.setLeft(left);
      letterShape.setTop(top);
    // }
    letters.push(letterShape);
  })
  let group = currentSlide.group(letters);
  let ID = group.getObjectId();
  CURVED_TEXT_GROUP = group;
  CURVED_TEXT_GROUP.txt = txt;
  CURVED_TEXT_GROUP.radius = radius;
  try{
  group.getChildren()[0].setDescription(JSON.stringify({text:txt,radius}));
  }catch(e){
    SlidesApp.getUi().alert(e);
  }
  // SlidesApp.getUi().alert(JSON.stringify({text:txt,radius}));
  return ID;
}

function changeCurvedText(opts){
  if (!opts.id){
    return;
  }
  
  const currentSlide = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
  CURVED_TEXT_GROUP = currentSlide.getPageElementById(opts.id).asGroup();
  var oldOpts = JSON.parse(CURVED_TEXT_GROUP.getChildren()[0].getDescription());
  


  const radius = opts.radius || oldOpts.radius;
  const txt = opts.text || oldOpts.text;
  var angleStep = 10 * 100 / radius;
  var angleOffset = angleStep * txt.split("").length/2;

  
  if (CURVED_TEXT_GROUP){
    CURVED_TEXT_GROUP.getChildren().forEach((letterShape,idx) => {
        letterShape = letterShape.asShape();
        letterShape.setWidth(10);
        
        letterShape.setRotation(angleStep * idx - angleOffset);

    
        var curAngle = 90 + angleStep * idx - angleOffset;
        var angleRadians=curAngle*(Math.PI/180);
        var left = -Math.cos(angleRadians) * radius + radius;
        var top = -Math.sin(angleRadians) * radius + radius;
        letterShape.setLeft(left);
        letterShape.setTop(top);
    })
  }
}
// Function to create curved text
function createCurvedText1() {
  const slides = SlidesApp.getActivePresentation().getSlides();
  slides.forEach(slide => {
    const shapes = slide.getShapes();
    shapes.forEach(shape => {
      // Check if the shape contains text
      if (shape.getText()) {
        // Clear the existing text
        shape.getText().clear();

        // Create the new curved text
        const text = 'Your Curved Text Here';
        const left = shape.getLeft();
        const top = shape.getTop();
        const width = shape.getWidth();
        const height = shape.getHeight();
        const newText = slide.insertText(text, left, top, width, height);
        
        // Apply the curvature angle
        newText.setRotation(curvature);
      }
    });
  });

  // Show a success message
  const ui = SlidesApp.getUi();
  ui.alert('Curved text added successfully.');
}
