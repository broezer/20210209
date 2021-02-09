const Y_AXIS = 1;
const X_AXIS = 2;
let c1, c2, c3;
let b1, b2, b3;
let t1, t2 , t3;

let cols, rows;
let scl = 25;
let w = 1600;
let h = 1600;

let flying = 0;

let terrain = [];



function setup() {
   createCanvas(400, 400, WEBGL);
   
   
   c1 = color(255, 251, 167);
   c2 = color(242, 218, 81);
   c3 = color(255, 18, 216);
   
   b1 = color(25,0, 62);
   b2 = color(52,0, 126);
   b3 = color(255, 28, 43);

   t1 = color(130, 247, 252);
   t2 = color(0, 240, 255);
   t3 = color(0, 85, 79);
   
   cols = w / scl;
   rows = h / scl;

   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
   
}


function draw() {
  

  flying -= 0.1;
  var yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 20);
      xoff += 0.4;
    }
    yoff += 0.3;
  }
  

  
  fill(t1)

  noStroke();
  
  push();
  translate(0, height * -0.1 , 0);
  setTriangle(width * -0.3, 0, width * 0.3, t1,t2,t3);
  pop();
  push();

  setTriangle(0, 0, width * 0.3, t1,t2,t3);
  pop();

  push();
  translate(0, height * -0.3 , 0);
  setTriangle(width*-0.15, 0, width * 0.3, t1,t2,t3);
  pop();

  push();
  translate(0, 0, -1000);
  
  setGradient(-width*2, height * -2 , width * 4, height * 2, b1, b2, c3, Y_AXIS);
  setGradient(-width*2,0, width * 4, height *4, c3, b2, b1,Y_AXIS);
  pop();
  
  push();
  
  translate(0,height * 0.4, -50);
  rotateX(PI / 2);
  translate(-w / 2,  0 , width * - 0.2);
  for (let y = 0; y < rows - 1; y++) {
    for (let x = 0; x < cols; x++) {
      fill(b1);
      stroke(c3);
      rect(x*scl, y*scl, scl, scl);
    }
  }
  
  rotateX(0.01);
  translate(0,  height * - 1.7,  1);
  
  noFill();
  stroke(c3);
  
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    
    for (let x = 0; x < cols; x++) {
      fill(b1);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  
  pop(); 
  
  
  
  save("20210209.png");
  noLoop();
  
  
}

function setGradient(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(x, i, x + w, i);
      
      if ( i <= (y + h) - ((h/2))){
        stroke(c);
        line(x, i, x + w, i);
      }else{
        stroke(p);
        line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x,(x + w) - (w/2), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (x + w) - (w/2), x + w, 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(i, y, i, y + h);
      if ( i <= (x + w) - (w/2)){
        stroke(c);
        line(i, y, i, y + h);
      }else{
        stroke(p);
        line(i, y, i, y + h);
      }
      
    }
  }
}

function setTriangle(x, y, h, c1, c2, c3 ){
  d = h;
  push();
  //translate( d * 0.2, d*0.2);
  for (let i = y; i <= y + d; i++) {
    let inter = map(i, y, (y + d) - (d/2), 0, 1);
    let c = lerpColor(c1, c2, inter);
    
    let inter02 = map(i, (y + d) - (d/2) ,  y + d , 0, 1);
    let p = lerpColor(c2, c3, inter02);
    
    line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);    
    if ( i <= (y + d) - (d/2)){
      stroke(c);
      line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);
    }else{
      stroke(p);
      line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);
    }
  }
}