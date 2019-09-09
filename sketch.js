// Keep track of our socket connection
var socket;
let cam;
var input, input1, button, greeting, greeting1, reset, stop, dSel, del;
let number, graphics;
var prova;
let canvas;
let gifLength = 100;
let myFont;
var x = '';
var x1;
var x2;
var sensorValue = 0;
var y, q, q2, a, z;
let sel;
let value1 = 0;
var bolean = true;
var pres = 0;
var app=0;
var green1 = false;
var red1 = false;
var rx1,ry1,rz1,tx1,ty1=0;
var arr1 = [-1000, -1000, -1000, -1000, -1000];//ROTATE X , ROTATE Y , ROTATE Z , TRANSLATE X , TRANSLATE Y
var arr2 = [-1000, -1000, -1000, -1000, -1000];//ROTATE X , ROTATE Y , ROTATE Z , TRANSLATE X , TRANSLATE Y
var arr3 = [-1000, -1000, -1000, -1000, -1000];//ROTATE X , ROTATE Y , ROTATE Z , TRANSLATE X , TRANSLATE Y
var arr4 = [-1000, -1000, -1000, -1000, -1000];//ROTATE X , ROTATE Y , ROTATE Z , TRANSLATE X , TRANSLATE Y
var arr5 = [-1000, -1000, -1000, -1000, -1000];//ROTATE X , ROTATE Y , ROTATE Z , TRANSLATE X , TRANSLATE Y
var arr6 = [-1000, -1000, -1000, -1000, -1000];//ROTATE X , ROTATE Y , ROTATE Z , TRANSLATE X , TRANSLATE Y
function setup() {

  dSel = createElement('h3', 'Select a device:');
  dSel.position(1260, 120);
  sel = createSelect();
  sel.position(1260, 180);
  sel.option("None");
  sel.changed(changeBg);
  sel.style('color', '#ff8c00');
  sel.style('padding', '8px 16px');
  sel.style('border', '2px solid #ff8c00');
  sel.style('border-color', '#ff8c00');
  sel.style('cursor', 'pointer');
  sel.style('user-select', 'none');

  del = createButton("Delete");
  del.position(1380, 177);
  del.mousePressed(delet);
  del.style('background-color', 'white');
  del.style('border', '2px solid #555555');
  del.style('color', '#555555');
  del.style('padding', '7px 16px');
  //button.style('border-radius', '10px 10px 10px 10px');
  del.style('text-align', 'center');
  del.style('text-decoration', 'none');
  del.style('display', 'inline-block');
  del.style('font-size', ' 16px');
  del.style('margin', '2px 1px');
  del.style('cursor', 'pointer');
  del.mouseOver(Over3);
  del.mouseOut(Out3);

  greeting = createElement('h3', '');
  greeting.position(1260, 60);

  //bottone
  button = createButton('Add');
  button.position(1260, 80);
  button.style('background-color', 'white');
  button.style('border', '2px solid #4CAF50');
  button.style('color', '#4CAF50');
  button.style('padding', '7px 16px');
  //button.style('border-radius', '10px 10px 10px 10px');
  button.style('text-align', 'center');
  button.style('text-decoration', 'none');
  button.style('display', 'inline-block');
  button.style('font-size', ' 16px');
  button.style('margin', '2px 1px');
  button.style('cursor', 'pointer');
  button.mouseOver(Over);
  button.mouseOut(Out);

  button.mousePressed(greet);
  /*reset = createButton('Reset');
  reset.position(1360, 80);
  reset.mousePressed(res);
 // #008CBA
  reset.style('background-color', 'white');
  reset.style('border', '2px solid  #008CBA');
  reset.style('color', ' #008CBA');
  reset.style('padding', '7px 16px');
 // reset.style('border-radius', '10px 10px 10px 10px');
  reset.style('text-align', 'center');
  reset.style('text-decoration', 'none');
  reset.style('display', 'inline-block');
  reset.style('font-size', ' 16px');
  reset.style('margin', '2px 1px');
  reset.style('cursor', 'pointer');
  reset.mouseOver(Over1);
  reset.mouseOut(Out1);*/
  stop = createButton('Stop');
  stop.position(1380, 80);
  stop.mousePressed(sto);
  stop.style('background-color', 'white');
  stop.style('border', '2px solid  #f44336');
  stop.style('color', '#f44336');
  stop.style('padding', '7px 16px');
  // reset.style('border-radius', '10px 10px 10px 10px');
  stop.style('text-align', 'center');
  stop.style('text-decoration', 'none');
  stop.style('display', 'inline-block');
  stop.style('font-size', ' 16px');
  stop.style('margin', '2px 1px');
  stop.style('cursor', 'pointer');
  stop.mouseOver(Over2);
  stop.mouseOut(Out2);
  /*
    input = createInput('');
    input.position(20, 95);
    input.size(100);*/

  rSlider11 = createElement('h3', 'Rotation X');
  rSlider11.position(1260, 260);
  rSlider1 = createSlider(-143, 142, 00);
  rSlider1.position(1260, 310);
  rSlider21 = createElement('h3', 'Rotation Y');
  rSlider21.position(1260, 330);
  rSlider2 = createSlider(-143, 142, 00);
  rSlider2.position(1260, 380);
  rSlider31 = createElement('h3', 'Rotation Z');
  rSlider31.position(1260, 400);
  rSlider3 = createSlider(-143, 142, 00);
  rSlider3.position(1260, 450);
  rSlider41 = createElement('h3', 'Transalation X');
  rSlider41.position(1260, 470);
  rSlider4 = createSlider(-550, 550, 00);
  rSlider4.position(1260, 520);
  rSlider51 = createElement('h3', 'Transalation Y');
  rSlider51.position(1260, 540);
  rSlider5 = createSlider(-200, 200, 00);
  rSlider5.position(1260, 590);
  //greeting = createElement('h2', 'size?');
  //greeting.position(25, 35);


  textAlign(CENTER);
  textSize(50);

  var p5Canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  //DECOMMENTA
  //canvas = p5Canvas.canvas;
  //capturer.start();




  //  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:8080');
  normalMaterial();
  cam = createCamera();
  socket.on('dati', function (data) {

    // console.log("data "+data);
    x = data.substring(0, 4);
    // console.log("merdaaa "+x);


    // if(data!== "0.01")document.getElementById("bello").innerHTML="dato 1->  "+data.slice(0,data.indexOf("0.01")) + "  dato 2->  "+data.slice(data.indexOf("0.01")+1,data.length);
    //console.log(data);


    console.log("primo dato " + str(x));
    //x2 = str(x);
    //Stampa(x2);
    socket.data = data;
    //string ---> 0.01
    x1 = x;
    x2 = float(x1);
    console.log(x2);
  });

  /*var usernameField = select("#quantity");
  var username = usernameField.value();
  text(username, 10, 20);
  */
  /*
    input = createInput();
    input.position(120, 165);
  
    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(greet);
  
    greeting = createElement('h2', 'what is your name?');
    greeting.position(20, 5);
  
    textAlign(CENTER);
    textSize(50);
    //insert form
    */
  /*
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    socket.on('num1',
      // When we receive data
      function(data) {
        console.log("Got: " + data.x + " " + data.y);
        // Draw a blue circle
        fill(0,0,255);
        noStroke();
        ellipse(data.x,data.y,80,80);
      }
  )*/
  //x1 = createInput(x2);

  console.log("secondo dato " + socket.data);
  graphics = createGraphics(200, 200);


  number = createGraphics(200, 200);
  number.textAlign(CENTER);
  number.textSize(60);
  number.text('1', 100, 50);

}




function draw() {



  // Nothing
  // background(250, 240, 230);
  background(255, 245, 238);
  //textFont(myFont);
  textSize(32);

  //time
  let hr = hour();
  let mn = minute();
  let sc = second();


  noStroke();
  text(hr + ':' + mn + ':' + sc, -750, -200);
 
  if(sel.value()!=="None"){
    
    
    for (let i = 1; i <= pres; i++) {
      let rx, ry, rz, tx, ty=0;
      
       if (i !== int(sel.value()) ) {
      
        noStroke();
        push();
       
       if(i===1){rx=arr1[0]; ry=arr1[1]; rz=arr1[2]; tx=arr1[3]; ty=arr1[4];}
        if(i===2){rx=arr2[0]; ry=arr2[1]; rz=arr2[2]; tx=arr2[3]; ty=arr2[4];}
        if(i===3){rx=arr3[0]; ry=arr3[1]; rz=arr3[2]; tx=arr3[3]; ty=arr3[4];}
        if(i===4){rx=arr4[0]; ry=arr4[1]; rz=arr4[2]; tx=arr4[3]; ty=arr4[4];}
        if(i===5){rx=arr5[0]; ry=arr5[1]; rz=arr5[2]; tx=arr5[3]; ty=arr5[4];}
        if(i===6){rx=arr6[0]; ry=arr6[1]; rz=arr6[2]; tx=arr6[3]; ty=arr6[4];}
        rotateX(rx);
        rotateY(ry);
        rotateZ(rz);
       
        translate(tx, ty);
        //box(input.value());
        number.background(0,0,255);
       number.fill(/*'green'*/'white');
       number.text(i, 100, 110);
       texture(number);
       box(160, 80, 20);
         
        textSize(60);
        
      
        green1 = false;
        red1 = false;
        pop();
      }
       
      
    }
    
      if(int(sel.value())===1){rx1=arr1[0]; ry1=arr1[1]; rz1=arr1[2]; tx1=arr1[3]; ty1=arr1[4];console.log("sel.value=1 "+rx1+" "+ry1+" "+rz1+" "+tx1+" "+ty1);}
      if(int(sel.value())===2){rx1=arr2[0]; ry1=arr2[1]; rz1=arr2[2]; tx1=arr2[3]; ty1=arr2[4];console.log("sel.value=2"+rx1+" "+ry1+" "+rz1+" "+tx1+" "+ty1);}
      if(int(sel.value())===3){rx1=arr3[0]; ry1=arr3[1]; rz1=arr3[2]; tx1=arr3[3]; ty1=arr3[4];console.log("sel.value=3"+rx1+" "+ry1+" "+rz1+" "+tx1+" "+ty1);}
      if(int(sel.value())===4){rx1=arr4[0]; ry1=arr4[1]; rz1=arr4[2]; tx1=arr4[3]; ty1=arr4[4];console.log("sel.value=4"+rx1+" "+ry1+" "+rz1+" "+tx1+" "+ty1);}
      if(int(sel.value())===5){rx1=arr5[0]; ry1=arr5[1]; rz1=arr5[2]; tx1=arr5[3]; ty1=arr5[4];console.log("sel.value=5"+rx1+" "+ry1+" "+rz1+" "+tx1+" "+ty1);}
      if(int(sel.value())===6){rx1=arr6[0]; ry1=arr6[1]; rz1=arr6[2]; tx1=arr6[3]; ty1=arr6[4];console.log("sel.value=6"+rx1+" "+ry1+" "+rz1+" "+tx1+" "+ty1);}

      
      noStroke();
      push();
      rotateX(rx1+int(rSlider1.value()));
      rotateY(ry1+int(rSlider2.value()));
      rotateZ(rz1+int(rSlider3.value()));
      //const t = rSlider1.value();
      //text('', 0, 35);
      translate(tx1+int(rSlider4.value()), ty1+int(rSlider5.value()));
      //box(input.value());
      number.background(0,0,255);
       number.fill(/*'green'*/'white');
       number.text(sel.value(), 100, 110);
       texture(number);
       box(160, 80, 20);
      
      red1 = true;
      green1 = false;
      //text(sel.value(), -10, 18);
       
      pop();

     /*if(int(sel.value())===1){arr1[0]=rx1+int(rSlider1.value()); arr1[1]=ry1+int(rSlider2.value()); arr1[2]=rz1+int(rSlider3.value()); arr1[3]=tx1+int(rSlider4.value()); arr1[4]=ty1+int(rSlider5.value());}
      if(int(sel.value())===2){arr2[0]=rx1+int(rSlider1.value()); arr2[1]=ry1+int(rSlider2.value()); arr2[2]=rz1+int(rSlider3.value()); arr2[3]=tx1+int(rSlider4.value()); arr2[4]=ty1+int(rSlider5.value());}
      if(int(sel.value())===3){arr3[0]=rx1+int(rSlider1.value()); arr3[1]=ry1+int(rSlider2.value()); arr3[2]=rz1+int(rSlider3.value()); arr3[3]=tx1+int(rSlider4.value()); arr3[4]=ty1+int(rSlider5.value());}
      if(int(sel.value())===4){arr4[0]=rx1+int(rSlider1.value()); arr4[1]=ry1+int(rSlider2.value()); arr4[2]=rz1+int(rSlider3.value()); arr4[3]=tx1+int(rSlider4.value()); arr4[4]=ty1+int(rSlider5.value());}
      if(int(sel.value())===5){arr5[0]=rx1+int(rSlider1.value()); arr5[1]=ry1+int(rSlider2.value()); arr5[2]=rz1+int(rSlider3.value()); arr5[3]=tx1+int(rSlider4.value()); arr5[4]=ty1+int(rSlider5.value());}
      if(int(sel.value())===6){arr6[0]=rx1+int(rSlider1.value()); arr6[1]=ry1+int(rSlider2.value()); arr6[2]=rz1+int(rSlider3.value()); arr6[3]=tx1+int(rSlider4.value()); arr6[4]=ty1+int(rSlider5.value());}

   */  
  }



  for (let i = 1; i <= pres && sel.value()==="None"; i++) {
    
    let rx, ry, rz, tx, ty=0;
     if (i !== pres ) {
      
      noStroke();
      push();
     
      if(i===1){rx=arr1[0]; ry=arr1[1]; rz=arr1[2]; tx=arr1[3]; ty=arr1[4];}
      if(i===2){rx=arr2[0]; ry=arr2[1]; rz=arr2[2]; tx=arr2[3]; ty=arr2[4];}
      if(i===3){rx=arr3[0]; ry=arr3[1]; rz=arr3[2]; tx=arr3[3]; ty=arr3[4];}
      if(i===4){rx=arr4[0]; ry=arr4[1]; rz=arr4[2]; tx=arr4[3]; ty=arr4[4];}
      if(i===5){rx=arr5[0]; ry=arr5[1]; rz=arr5[2]; tx=arr5[3]; ty=arr5[4];}
      if(i===6){rx=arr6[0]; ry=arr6[1]; rz=arr6[2]; tx=arr6[3]; ty=arr6[4];}
      rotateX(rx);
      rotateY(ry);
      rotateZ(rz);
      //const t = rSlider1.value();
      
      translate(tx, ty);
      //box(input.value());
      number.background(0,0,255);
       number.fill(/*'green'*/'white');
       number.text(i, 100, 110);
       texture(number);
       box(160, 80, 20);
        green1 = false;
        red1 = false;
      pop();
    }
   
    else if (i === pres  && pres < 7) {
      rx=0;ry=0;rz=0;tx=0;ty=0;
      
      if(!bolean){
      if(i===1){rx=arr1[0]; ry=arr1[1]; rz=arr1[2]; tx=arr1[3]; ty=arr1[4];}
      if(i===2){rx=arr2[0]; ry=arr2[1]; rz=arr2[2]; tx=arr2[3]; ty=arr2[4];}
      if(i===3){rx=arr3[0]; ry=arr3[1]; rz=arr3[2]; tx=arr3[3]; ty=arr3[4];}
      if(i===4){rx=arr4[0]; ry=arr4[1]; rz=arr4[2]; tx=arr4[3]; ty=arr4[4];}
      if(i===5){rx=arr5[0]; ry=arr5[1]; rz=arr5[2]; tx=arr5[3]; ty=arr5[4];}
      if(i===6){rx=arr6[0]; ry=arr6[1]; rz=arr6[2]; tx=arr6[3]; ty=arr6[4];}}
      noStroke();
      push();
      rotateX(rx+rSlider1.value() / 45);
      rotateY(ry+rSlider2.value() / 45);
      rotateZ(rz+rSlider3.value() / 45);
      //const t = rSlider1.value();
      //text('', 0, 35);
      translate(tx+rSlider4.value(), ty+rSlider5.value());
      //box(input.value());
      
       number.background(0,0,255);
       number.fill(/*'green'*/'white');
       number.text(i, 100, 110);
       texture(number);
     
       box(160, 80, 20);
      //textSize(60);
   
     
      green1 = true;
      red1  = false;
      pop();
    }
    
  }

  /*
  noStroke();
  push();
  translate(-400 + (i * 200), q); 
  plane(160, 80);
  pop();
  */
  let radius = width * 1.5;

  //drag to move the world.
  orbitControl();

  normalMaterial();


  /*
  //stampa dopo i primi 100 frame
    if (frameCount < gifLength) {
      capturer.capture(canvas);
    } else if (frameCount === gifLength) {
      capturer.stop();
      capturer.save();
    }*/


}



/*
function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,80,80);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function datoR(y) {
  if (x1.value() === '') { x1.value() == 0.01 } else { x1.value() = x1.value() }
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}*/
function mousePressed() {

}
//print(inp.value());

/*function preload() {
  myFont = loadFont('/inconsolata.otf');
}*/

function greet() {
  // const name = input.value();
  
  if(bolean){
    switch (pres) {
      case 1:
        arr1[0] = rSlider1.value()/45;
        arr1[1] = rSlider2.value()/45;
        arr1[2] = rSlider3.value()/45;
        arr1[3] = rSlider4.value();
        arr1[4] = rSlider5.value();
       
        break;
      case 2:
        arr2[0] = rSlider1.value()/45;
        arr2[1] = rSlider2.value()/45;
        arr2[2] = rSlider3.value()/45;
        arr2[3] = rSlider4.value();
        arr2[4] = rSlider5.value();
        
        break;
      case 3:
        
        arr3[0] = rSlider1.value()/45;
        arr3[1] = rSlider2.value()/45;
        arr3[2] = rSlider3.value()/45;
        arr3[3] = rSlider4.value();
        arr3[4] = rSlider5.value();
       
        break;
      case 4:
        arr4[0] = rSlider1.value()/45;
        arr4[1] = rSlider2.value()/45;
        arr4[2] = rSlider3.value()/45;
        arr4[3] = rSlider4.value();
        arr4[4] = rSlider5.value();
       
        break;
      case 5:
        arr5[0] = rSlider1.value()/45;
        arr5[1] = rSlider2.value()/45;
        arr5[2] = rSlider3.value()/45;
        arr5[3] = rSlider4.value();
        arr5[4] = rSlider5.value();
      
        break;
      case 6:
        arr6[0] = rSlider1.value()/45;
        arr6[1] = rSlider2.value()/45;
        arr6[2] = rSlider3.value()/45;
        arr6[3] = rSlider4.value();
        arr6[4] = rSlider5.value();
       
        break;
      default:
  
    }} else if(app!==0){
      switch (app) {
        case 1:
          arr1[0] += rSlider1.value()/45;
          arr1[1] += rSlider2.value()/45;
          arr1[2] += rSlider3.value()/45;
          arr1[3] += rSlider4.value();
          arr1[4] += rSlider5.value();
         
          break;
        case 2:
          arr2[0] += rSlider1.value()/45;
          arr2[1] += rSlider2.value()/45;
          arr2[2] += rSlider3.value()/45;
          arr2[3] += rSlider4.value();
          arr2[4] += rSlider5.value();
          
          break;
        case 3:
          
          arr3[0] += rSlider1.value()/45;
          arr3[1] += rSlider2.value()/45;
          arr3[2] += rSlider3.value()/45;
          arr3[3] += rSlider4.value();
          arr3[4] += rSlider5.value();
         
          break;
        case 4:
          arr4[0] += rSlider1.value()/45;
          arr4[1] += rSlider2.value()/45;
          arr4[2] += rSlider3.value()/45;
          arr4[3] += rSlider4.value();
          arr4[4] += rSlider5.value();
         
          break;
        case 5:
          arr5[0] += rSlider1.value()/45;
          arr5[1] += rSlider2.value()/45;
          arr5[2] += rSlider3.value()/45;
          arr5[3] += rSlider4.value();
          arr5[4] += rSlider5.value();
        
          break;
        case 6:
          arr6[0] += rSlider1.value()/45;
          arr6[1] += rSlider2.value()/45;
          arr6[2] += rSlider3.value()/45;
          arr6[3] += rSlider4.value();
          arr6[4] += rSlider5.value();
         
          break;
        default:
    
      }
  
    }sel.remove();
  sel = createSelect();
  sel.position(1260, 180);
  sel.option("None");
  sel.changed(changeBg);
  sel.style('color', '#ff8c00');
  sel.style('padding', '8px 16px');
  sel.style('border', '2px solid #ff8c00');
  sel.style('border-color', '#ff8c00');
  sel.style('cursor', 'pointer');
  sel.style('user-select', 'none');
  for(var i=0;i<pres;i++){sel.option(i+1);}
  pres++;
  rSlider1.remove();
  rSlider2.remove();
  rSlider3.remove();
  rSlider4.remove();
  rSlider5.remove();
  
  rSlider1 = createSlider(-143, 142, 00);
  rSlider1.position(1260, 310);
 
  rSlider2 = createSlider(-143, 142, 00);
  rSlider2.position(1260, 380);

  rSlider3 = createSlider(-143, 142, 00);
  rSlider3.position(1260, 450);

  rSlider4 = createSlider(-550, 550, 00);
  rSlider4.position(1260, 520);

  rSlider5 = createSlider(-200, 200, 00);
  rSlider5.position(1260, 590);

  if (pres == 7) {
    pres = 7;
    button.remove();
    button = createButton("No More");
    button.position(1400, 80);
    }
    bolean = true;}
function readMessage(event) {
  var msg = event.data; // read data from the onmessage event
  sensorValue = Number(msg) / 4;
  println(sensorValue); // print it
}

function res() {
  sel.remove();
  sel = createSelect();
  sel.position(1260, 180);
  sel.option("None");
  sel.changed(changeBg);
  sel.style('color', '#ff8c00');
  sel.style('padding', '8px 16px');
  sel.style('border', '2px solid #ff8c00');
  sel.style('border-color', '#ff8c00');
  sel.style('cursor', 'pointer');
  sel.style('user-select', 'none');
  rSlider1.remove();
  rSlider2.remove();
  rSlider3.remove();
  rSlider4.remove();
  rSlider5.remove();
  dSel = createElement('h3', 'Select a device');
  dSel.position(1260, 200);
  sel = createSelect();
  sel.position(1260, 180);
  sel.option("None");
  sel.changed(changeBg);
  sel.style('color', '#ff8c00');
  sel.style('padding', '8px 16px');
  sel.style('border', '2px solid #ff8c00');
  sel.style('border-color', '#ff8c00');
  sel.style('cursor', 'pointer');
  sel.style('user-select', 'none');


  greeting = createElement('h3', '');
  greeting.position(1260, 60);

  //bottone
  button = createButton('Add');
  button.position(1260, 80);
  button.style('background-color', 'white');
  button.style('border', '2px solid #4CAF50');
  button.style('color', '#4CAF50');
  button.style('padding', '7px 16px');
 // button.style(' border-radius', '10px 10px 10px 10px');
  button.style('text-align', 'center');
  button.style('text-decoration', 'none');
  button.style('display', 'inline-block');
  button.style('font-size', ' 16px');
  button.style('margin', '2px 1px');
  button.style('cursor', 'pointer');
  button.mouseOver(Over);
  button.mouseOut(Out);
  button.mousePressed(greet);
  /*reset = createButton('Reset');
  reset.position(1360, 80);
  reset.mousePressed(res);
  reset.style('background-color', 'white');
  reset.style('border', '2px solid #008CBA');
  reset.style('color', '#008CBA');
  reset.style('padding', '7px 16px');
  //reset.style('border-radius', '10px 10px 10px 10px');
  reset.style('text-align', 'center');
  reset.style('text-decoration', 'none');
  reset.style('display', 'inline-block');
  reset.style('font-size', ' 16px');
  reset.style('margin', '4px 2px');
  reset.style('cursor', 'pointer');*/
  rSlider1 = createSlider(-143, 142, 00);
  rSlider1.position(1260, 310);

  rSlider2 = createSlider(-143, 142, 00);
  rSlider2.position(1260, 380);
 
  rSlider3 = createSlider(-143, 142, 00);
  rSlider3.position(1260, 450);

  rSlider4 = createSlider(-550, 550, 00);
  rSlider4.position(1260, 520);
 
  rSlider5 = createSlider(-200, 200, 00);
  rSlider5.position(1260, 590);
  if(pres>=7) {
    button.remove();
    button = createButton("Add");
    button.position(1260, 80);
    button.style('background-color', 'white');
    button.style('border', '2px solid #4CAF50');
    button.style('color', '#4CAF50');
    button.style('padding', '7px 16px');
   // button.style('border-radius', '10px 10px 10px 10px');
    button.style('text-align', 'center');
    button.style('text-decoration', 'none');
    button.style('display', 'inline-block');
    button.style('font-size', ' 16px');
    button.style('margin', '2px 1px');
    button.style('cursor', 'pointer');
    button.mouseOver(Over);
    button.mouseOut(Out);
    button.mousePressed(greet);
  }
  pres = 0;
}
function Stampa(x) {
  y = x;

}

function changeBg() {
 // var item = sel.value();
 
 if(bolean){
  switch (pres) {
    case 1:
      arr1[0] = rSlider1.value()/45;
      arr1[1] = rSlider2.value()/45;
      arr1[2] = rSlider3.value()/45;
      arr1[3] = rSlider4.value();
      arr1[4] = rSlider5.value();
     
      break;
    case 2:
      arr2[0] = rSlider1.value()/45;
      arr2[1] = rSlider2.value()/45;
      arr2[2] = rSlider3.value()/45;
      arr2[3] = rSlider4.value();
      arr2[4] = rSlider5.value();
      
      break;
    case 3:
      
      arr3[0] = rSlider1.value()/45;
      arr3[1] = rSlider2.value()/45;
      arr3[2] = rSlider3.value()/45;
      arr3[3] = rSlider4.value();
      arr3[4] = rSlider5.value();
     
      break;
    case 4:
      arr4[0] = rSlider1.value()/45;
      arr4[1] = rSlider2.value()/45;
      arr4[2] = rSlider3.value()/45;
      arr4[3] = rSlider4.value();
      arr4[4] = rSlider5.value();
     
      break;
    case 5:
      arr5[0] = rSlider1.value()/45;
      arr5[1] = rSlider2.value()/45;
      arr5[2] = rSlider3.value()/45;
      arr5[3] = rSlider4.value();
      arr5[4] = rSlider5.value();
    
      break;
    case 6:
      arr6[0] = rSlider1.value()/45;
      arr6[1] = rSlider2.value()/45;
      arr6[2] = rSlider3.value()/45;
      arr6[3] = rSlider4.value();
      arr6[4] = rSlider5.value();
     
      break;
    default:

  }} else if(app!==0){
    switch (app) {
      case 1:
        arr1[0] += rSlider1.value()/45;
        arr1[1] += rSlider2.value()/45;
        arr1[2] += rSlider3.value()/45;
        arr1[3] += rSlider4.value();
        arr1[4] += rSlider5.value();
       
        break;
      case 2:
        arr2[0] += rSlider1.value()/45;
        arr2[1] += rSlider2.value()/45;
        arr2[2] += rSlider3.value()/45;
        arr2[3] += rSlider4.value();
        arr2[4] += rSlider5.value();
        
        break;
      case 3:
        
        arr3[0] += rSlider1.value()/45;
        arr3[1] += rSlider2.value()/45;
        arr3[2] += rSlider3.value()/45;
        arr3[3] += rSlider4.value();
        arr3[4] += rSlider5.value();
       
        break;
      case 4:
        arr4[0] += rSlider1.value()/45;
        arr4[1] += rSlider2.value()/45;
        arr4[2] += rSlider3.value()/45;
        arr4[3] += rSlider4.value();
        arr4[4] += rSlider5.value();
       
        break;
      case 5:
        arr5[0] += rSlider1.value()/45;
        arr5[1] += rSlider2.value()/45;
        arr5[2] += rSlider3.value()/45;
        arr5[3] += rSlider4.value();
        arr5[4] += rSlider5.value();
      
        break;
      case 6:
        arr6[0] += rSlider1.value()/45;
        arr6[1] += rSlider2.value()/45;
        arr6[2] += rSlider3.value()/45;
        arr6[3] += rSlider4.value();
        arr6[4] += rSlider5.value();
       
        break;
      default:
  
    }

  }
  rSlider1.remove();
  rSlider2.remove();
  rSlider3.remove();
  rSlider4.remove();
  rSlider5.remove();
  
  rSlider1 = createSlider(-143, 142, 00);
  rSlider1.position(1260, 310);

  rSlider2 = createSlider(-143, 142, 00);
  rSlider2.position(1260, 380);
 
  rSlider3 = createSlider(-143, 142, 00);
  rSlider3.position(1260, 450);

  rSlider4 = createSlider(-550, 550, 00);
  rSlider4.position(1260, 520);
 
  rSlider5 = createSlider(-200, 200, 00);
  rSlider5.position(1260, 590);
  bolean=false;
  if(sel.value()!=="None") app = int(sel.value());
  else app = 0;
}

/*function mouseDragged() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}*/
function sto(){

  if(green1){
    switch (pres) {
      case 1:
        arr1[0] = rSlider1.value()/45;
        arr1[1] = rSlider2.value()/45;
        arr1[2] = rSlider3.value()/45;
        arr1[3] = rSlider4.value();
        arr1[4] = rSlider5.value();
       
        break;
      case 2:
        arr2[0] = rSlider1.value()/45;
        arr2[1] = rSlider2.value()/45;
        arr2[2] = rSlider3.value()/45;
        arr2[3] = rSlider4.value();
        arr2[4] = rSlider5.value();
        
        break;
      case 3:
        
        arr3[0] = rSlider1.value()/45;
        arr3[1] = rSlider2.value()/45;
        arr3[2] = rSlider3.value()/45;
        arr3[3] = rSlider4.value();
        arr3[4] = rSlider5.value();
       
        break;
      case 4:
        arr4[0] = rSlider1.value()/45;
        arr4[1] = rSlider2.value()/45;
        arr4[2] = rSlider3.value()/45;
        arr4[3] = rSlider4.value();
        arr4[4] = rSlider5.value();
       
        break;
      case 5:
        arr5[0] = rSlider1.value()/45;
        arr5[1] = rSlider2.value()/45;
        arr5[2] = rSlider3.value()/45;
        arr5[3] = rSlider4.value();
        arr5[4] = rSlider5.value();
      
        break;
      case 6:
        arr6[0] = rSlider1.value()/45;
        arr6[1] = rSlider2.value()/45;
        arr6[2] = rSlider3.value()/45;
        arr6[3] = rSlider4.value();
        arr6[4] = rSlider5.value();
       
        break;
      default:
  
    }
  }
  if(red1){
    switch (app) {
      case 1:
        arr1[0] += rSlider1.value()/45;
        arr1[1] += rSlider2.value()/45;
        arr1[2] += rSlider3.value()/45;
        arr1[3] += rSlider4.value();
        arr1[4] += rSlider5.value();
       
        break;
      case 2:
        arr2[0] += rSlider1.value()/45;
        arr2[1] += rSlider2.value()/45;
        arr2[2] += rSlider3.value()/45;
        arr2[3] += rSlider4.value();
        arr2[4] += rSlider5.value();
        
        break;
      case 3:
        
        arr3[0] += rSlider1.value()/45;
        arr3[1] += rSlider2.value()/45;
        arr3[2] += rSlider3.value()/45;
        arr3[3] += rSlider4.value();
        arr3[4] += rSlider5.value();
       
        break;
      case 4:
        arr4[0] += rSlider1.value()/45;
        arr4[1] += rSlider2.value()/45;
        arr4[2] += rSlider3.value()/45;
        arr4[3] += rSlider4.value();
        arr4[4] += rSlider5.value();
       
        break;
      case 5:
        arr5[0] += rSlider1.value()/45;
        arr5[1] += rSlider2.value()/45;
        arr5[2] += rSlider3.value()/45;
        arr5[3] += rSlider4.value();
        arr5[4] += rSlider5.value();
      
        break;
      case 6:
        arr6[0] += rSlider1.value()/45;
        arr6[1] += rSlider2.value()/45;
        arr6[2] += rSlider3.value()/45;
        arr6[3] += rSlider4.value();
        arr6[4] += rSlider5.value();
       
        break;
      default:
  
    }
  }
  /*console.log("arr1: ");
  for(let k=0;k<5;k++){
    console.log(arr1[k]);
  }
  console.log("arr2: ");
  for(let k=0;k<5;k++){
    console.log(arr2[k]);
  }
  console.log("arr3: ");
  for(let k=0;k<5;k++){
    console.log(arr3[k]);
  }
  console.log("arr4: ");
  for(let k=0;k<5;k++){
    console.log(arr4[k]);
  }
  console.log("arr5: ");
  for(let k=0;k<5;k++){
    console.log(arr5[k]);
  }
  console.log("arr6: ");
  for(let k=0;k<5;k++){
    console.log(arr6[k]);
  }*/
  
  rSlider1.remove();
  rSlider2.remove();
  rSlider3.remove();
  rSlider4.remove();
  rSlider5.remove();
  rSlider11.remove();
  rSlider21.remove();
  rSlider31.remove();
  rSlider41.remove();
  rSlider51.remove();
  del.remove();
  stop.remove();
  button.remove();
  sel.remove();
  dSel.remove();
  reset.remove();
  greeting.remove();
}
function delet(){
  rSlider1.remove();
    rSlider2.remove();
    rSlider3.remove();
    rSlider4.remove();
    rSlider5.remove();
    rSlider1 = createSlider(-143, 142, 00);
  rSlider1.position(1260, 310);

  rSlider2 = createSlider(-143, 142, 00);
  rSlider2.position(1260, 380);
 
  rSlider3 = createSlider(-143, 142, 00);
  rSlider3.position(1260, 450);

  rSlider4 = createSlider(-550, 550, 00);
  rSlider4.position(1260, 520);
 
  rSlider5 = createSlider(-200, 200, 00);
  rSlider5.position(1260, 590);
  if(green1){
    if(pres===1){arr1[0]=-1000; arr1[1]=-1000; arr1[2]=-1000; arr1[3]=-1000; arr1[4]=-1000;}
    if(pres===2){arr2[0]=-1000; arr2[1]=-1000; arr2[2]=-1000; arr2[3]=-1000; arr2[4]=-1000;}
    if(pres===3){arr3[0]=-1000; arr3[1]=-1000; arr3[2]=-1000; arr3[3]=-1000; arr3[4]=-1000;}
    if(pres===4){arr4[0]=-1000; arr4[1]=-1000; arr4[2]=-1000; arr4[3]=-1000; arr4[4]=-1000;}
    if(pres===5){arr5[0]=-1000; arr5[1]=-1000; arr5[2]=-1000; arr5[3]=-1000; arr5[4]=-1000;}
    if(pres===6){arr6[0]=-1000; arr6[1]=-1000; arr6[2]=-1000; arr6[3]=-1000; arr6[4]=-1000;}
  }
  if(red1){
    switch(app){
      case 1:
        for(let i=0;i<5;i++){
          arr1[i]=arr2[i];
        }
        for(let i=0;i<5;i++){
          arr1[i]=arr2[i];
        }
        for(let i=0;i<5;i++){
          arr1[i]=arr2[i];
        }
        for(let i=0;i<5;i++){
          arr1[i]=arr2[i];
        }
        for(let i=0;i<5;i++){
          arr1[i]=arr2[i];
        }
//////////////////////////////////////
        for(let i=0;i<5;i++){
          arr2[i]=arr3[i];
        }
        for(let i=0;i<5;i++){
          arr2[i]=arr3[i];
        }
        for(let i=0;i<5;i++){
          arr2[i]=arr3[i];
        }
        for(let i=0;i<5;i++){
          arr2[i]=arr3[i];
        }
        for(let i=0;i<5;i++){
          arr2[i]=arr3[i];
        }
/////////////////////////////////////
        for(let i=0;i<5;i++){
          arr3[i]=arr4[i];
        }
        for(let i=0;i<5;i++){
          arr3[i]=arr4[i];
        }
        for(let i=0;i<5;i++){
          arr3[i]=arr4[i];
        }
        for(let i=0;i<5;i++){
          arr3[i]=arr4[i];
        }
        for(let i=0;i<5;i++){
          arr3[i]=arr4[i];
        }
/////////////////////////////////////
        for(let i=0;i<5;i++){
          arr4[i]=arr5[i];
        }
        for(let i=0;i<5;i++){
          arr4[i]=arr5[i];
        }
        for(let i=0;i<5;i++){
          arr4[i]=arr5[i];
        }
        for(let i=0;i<5;i++){
          arr4[i]=arr5[i];
        }
        for(let i=0;i<5;i++){
          arr4[i]=arr5[i];
        }
/////////////////////////////////////
        for(let i=0;i<5;i++){
          arr5[i]=arr6[i];
        }
        for(let i=0;i<5;i++){
          arr5[i]=arr6[i];
        }
        for(let i=0;i<5;i++){
          arr5[i]=arr6[i];
        }
        for(let i=0;i<5;i++){
          arr5[i]=arr6[i];
        }
        for(let i=0;i<5;i++){
          arr5[i]=arr6[i];
        }
/////////////////////////////////////
        for(let i=0;i<5;i++){
          arr6[i]=-1000;
        }
        for(let i=0;i<5;i++){
          arr6[i]=-1000;
        }
        for(let i=0;i<5;i++){
          arr6[i]=-1000;
        }
        for(let i=0;i<5;i++){
          arr6[i]=-1000;
        }
        for(let i=0;i<5;i++){
          arr6[i]=-1000;
        }

        break;
      case 2:
          for(let i=0;i<5;i++){
            arr2[i]=arr3[i];
          }
          for(let i=0;i<5;i++){
            arr2[i]=arr3[i];
          }
          for(let i=0;i<5;i++){
            arr2[i]=arr3[i];
          }
          for(let i=0;i<5;i++){
            arr2[i]=arr3[i];
          }
          for(let i=0;i<5;i++){
            arr2[i]=arr3[i];
          }
  /////////////////////////////////////
          for(let i=0;i<5;i++){
            arr3[i]=arr4[i];
          }
          for(let i=0;i<5;i++){
            arr3[i]=arr4[i];
          }
          for(let i=0;i<5;i++){
            arr3[i]=arr4[i];
          }
          for(let i=0;i<5;i++){
            arr3[i]=arr4[i];
          }
          for(let i=0;i<5;i++){
            arr3[i]=arr4[i];
          }
  /////////////////////////////////////
          for(let i=0;i<5;i++){
            arr4[i]=arr5[i];
          }
          for(let i=0;i<5;i++){
            arr4[i]=arr5[i];
          }
          for(let i=0;i<5;i++){
            arr4[i]=arr5[i];
          }
          for(let i=0;i<5;i++){
            arr4[i]=arr5[i];
          }
          for(let i=0;i<5;i++){
            arr4[i]=arr5[i];
          }
  /////////////////////////////////////
          for(let i=0;i<5;i++){
            arr5[i]=arr6[i];
          }
          for(let i=0;i<5;i++){
            arr5[i]=arr6[i];
          }
          for(let i=0;i<5;i++){
            arr5[i]=arr6[i];
          }
          for(let i=0;i<5;i++){
            arr5[i]=arr6[i];
          }
          for(let i=0;i<5;i++){
            arr5[i]=arr6[i];
          }
  /////////////////////////////////////
          for(let i=0;i<5;i++){
            arr6[i]=-1000;
          }
          for(let i=0;i<5;i++){
            arr6[i]=-1000;
          }
          for(let i=0;i<5;i++){
            arr6[i]=-1000;
          }
          for(let i=0;i<5;i++){
            arr6[i]=-1000;
          }
          for(let i=0;i<5;i++){
            arr6[i]=-1000;
          }
  
          break;
          
        case 3:
            for(let i=0;i<5;i++){
              arr3[i]=arr4[i];
            }
            for(let i=0;i<5;i++){
              arr3[i]=arr4[i];
            }
            for(let i=0;i<5;i++){
              arr3[i]=arr4[i];
            }
            for(let i=0;i<5;i++){
              arr3[i]=arr4[i];
            }
            for(let i=0;i<5;i++){
              arr3[i]=arr4[i];
            }
    /////////////////////////////////////
            for(let i=0;i<5;i++){
              arr4[i]=arr5[i];
            }
            for(let i=0;i<5;i++){
              arr4[i]=arr5[i];
            }
            for(let i=0;i<5;i++){
              arr4[i]=arr5[i];
            }
            for(let i=0;i<5;i++){
              arr4[i]=arr5[i];
            }
            for(let i=0;i<5;i++){
              arr4[i]=arr5[i];
            }
    /////////////////////////////////////
            for(let i=0;i<5;i++){
              arr5[i]=arr6[i];
            }
            for(let i=0;i<5;i++){
              arr5[i]=arr6[i];
            }
            for(let i=0;i<5;i++){
              arr5[i]=arr6[i];
            }
            for(let i=0;i<5;i++){
              arr5[i]=arr6[i];
            }
            for(let i=0;i<5;i++){
              arr5[i]=arr6[i];
            }
    /////////////////////////////////////
            for(let i=0;i<5;i++){
              arr6[i]=-1000;
            }
            for(let i=0;i<5;i++){
              arr6[i]=-1000;
            }
            for(let i=0;i<5;i++){
              arr6[i]=-1000;
            }
            for(let i=0;i<5;i++){
              arr6[i]=-1000;
            }
            for(let i=0;i<5;i++){
              arr6[i]=-1000;
            }
            break;
          case 4:
              for(let i=0;i<5;i++){
                arr4[i]=arr5[i];
              }
              for(let i=0;i<5;i++){
                arr4[i]=arr5[i];
              }
              for(let i=0;i<5;i++){
                arr4[i]=arr5[i];
              }
              for(let i=0;i<5;i++){
                arr4[i]=arr5[i];
              }
              for(let i=0;i<5;i++){
                arr4[i]=arr5[i];
              }
      /////////////////////////////////////
              for(let i=0;i<5;i++){
                arr5[i]=arr6[i];
              }
              for(let i=0;i<5;i++){
                arr5[i]=arr6[i];
              }
              for(let i=0;i<5;i++){
                arr5[i]=arr6[i];
              }
              for(let i=0;i<5;i++){
                arr5[i]=arr6[i];
              }
              for(let i=0;i<5;i++){
                arr5[i]=arr6[i];
              }
      /////////////////////////////////////
              for(let i=0;i<5;i++){
                arr6[i]=-1000;
              }
              for(let i=0;i<5;i++){
                arr6[i]=-1000;
              }
              for(let i=0;i<5;i++){
                arr6[i]=-1000;
              }
              for(let i=0;i<5;i++){
                arr6[i]=-1000;
              }
              for(let i=0;i<5;i++){
                arr6[i]=-1000;
              }
              break;
            case 5:
                for(let i=0;i<5;i++){
                  arr5[i]=arr6[i];
                }
                for(let i=0;i<5;i++){
                  arr5[i]=arr6[i];
                }
                for(let i=0;i<5;i++){
                  arr5[i]=arr6[i];
                }
                for(let i=0;i<5;i++){
                  arr5[i]=arr6[i];
                }
                for(let i=0;i<5;i++){
                  arr5[i]=arr6[i];
                }
        /////////////////////////////////////
                for(let i=0;i<5;i++){
                  arr6[i]=-1000;
                }
                for(let i=0;i<5;i++){
                  arr6[i]=-1000;
                }
                for(let i=0;i<5;i++){
                  arr6[i]=-1000;
                }
                for(let i=0;i<5;i++){
                  arr6[i]=-1000;
                }
                for(let i=0;i<5;i++){
                  arr6[i]=-1000;
                }
                break;
    }
  }
  pres--;
  bolean = false;
  
}

function Over() {

  button.style('background-color', '#4CAF50');
  button.style('color', 'white');

}

function Out() {
  button.style('background-color', 'white');
  button.style('border', '2px solid #4CAF50');
  button.style('color', '#4CAF50');
  button.style('padding', '7px 16px');
 // button.style('border-radius', '10px 10px 10px 10px');
  button.style('text-align', 'center');
  button.style('text-decoration', 'none');
  button.style('display', 'inline-block');
  button.style('font-size', ' 16px');
  button.style('margin', '4px 2px');
  button.style('cursor', 'pointer');

}
//reset
function Over1() {

  reset.style('background-color', '#008CBA');
  reset.style('color', 'white');

}
//reset
function Out1() {
  reset.style('background-color', 'white');
  reset.style('border', '2px solid #008CBA');
  reset.style('color', '#008CBA');
  reset.style('padding', '7px 16px');
//  reset.style('border-radius', '10px 10px 10px 10px');
  reset.style('text-align', 'center');
  reset.style('text-decoration', 'none');
  reset.style('display', 'inline-block');
  reset.style('font-size', ' 16px');
  reset.style('margin', '4px 2px');
  reset.style('cursor', 'pointer');

}

function Over2() {

  stop.style('background-color', '#f44336');
  stop.style('color', 'white');

}
//reset
function Out2() {
  stop.style('background-color', 'white');
  stop.style('border', '2px solid #f44336');
  stop.style('color', '#f44336');
  stop.style('padding', '7px 16px');
  //  reset.style('border-radius', '10px 10px 10px 10px');
  stop.style('text-align', 'center');
  stop.style('text-decoration', 'none');
  stop.style('display', 'inline-block');
  stop.style('font-size', ' 16px');
  stop.style('margin', '4px 2px');
  stop.style('cursor', 'pointer');

}

function Over3() {

  del.style('background-color', '#555555');
  del.style('color', 'white');

}
//reset
function Out3() {
  del.style('background-color', 'white');
  del.style('border', '2px solid #555555');
  del.style('color', '#555555');
  del.style('padding', '7px 16px');
  //  reset.style('border-radius', '10px 10px 10px 10px');
  del.style('text-align', 'center');
  del.style('text-decoration', 'none');
  del.style('display', 'inline-block');
  del.style('font-size', ' 16px');
  del.style('margin', '4px 2px');
  del.style('cursor', 'pointer');

}

