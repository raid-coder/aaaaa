function setup() {
  createCanvas(innerWidth, innerHeight);
  fill(0);
  bounce = -.6;
  frictionv = 0.97;
  radius = 10;
  i = 0;
  n = 7;
  p = [];
  for(i=0;i<n;i++){
    p[i] = createCircle();
  }
}

function draw(){
  background(134,94,55);
  for(i=0;i<n;i++){
    circle(p[i].x, p[i].y, p[i].r);
    circle(mouseX, mouseY, 10);
    moveCircle();
    friction();
    gravity();
    setSpeed();
    bounceOffWalls();
  }
  if(mouseIsPressed){
    springEffect(p[0],{x:mouseX,y:mouseY}, 100);
  }
  for(i=0;i<n-1;i++){
    for(let j=i+1;j<n;j++){
      springEffect(p[i],p[j], 100);
    }
  }
}

function createCircle(){
  return {
    x: width /2 + random(100),
    y: height /2 + random(100),
    r: radius,
    vx: 0,
    vy: 0
  };
}

function moveCircle(){
  p[i].x += p[i].vx;
  p[i].y += p[i].vy;
}

function springEffect(p1, p2, length){
  line(p1.x, p1.y, p2.x, p2.y);

  dx = p2.x - p1.x;
  dy = p2.y - p1.y;

  distence = sqrt(dx*dx + dy*dy);
  ndistence = distence / (distence - length)

  k = 0.07;

  p1.vx += dx / ndistence * k;
  p1.vy += dy / ndistence * k;
  
  p2.vx -= dx / ndistence * k;
  p2.vy -= dy / ndistence * k;
}

function friction(){
  p[i].vx *= frictionv;
  p[i].vy *= frictionv;
}

function gravity(){
  p[i].vy += 1;
}

function bounceOffWalls(){
  if(p[i].x > width-radius/2){
    p[i].x = width-radius/2
    p[i].vx *= bounce;
  }
  if(p[i].y > height-radius/2){
    p[i].y = height-radius/2
    p[i].vy *= bounce;
  }
  if(p[i].x < radius/2){
    p[i].x = radius/2
    p[i].vx *= bounce;
  }
  if(p[i].y < radius/2){
    p[i].y = radius/2
    p[i].vy *= bounce;
  }
}

function setSpeed(){
  if(p[i].vx > 50)
    p[i].vx = 50;
  if(p[i].vy > 50)
    p[i].vy = 50;
}