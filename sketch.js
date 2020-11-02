//Polar coordinates
let r = 10
let a = 0     //angle 
let s = 20    //spacing
let c = getRandomInteger(0, 360)     //color (hue)

let angle = 0

let pattern

function setup() {
  createCanvas(400, 400, WEBGL)
  pattern = createGraphics(400 , 400)
  
  colorMode(HSB)
}

function draw() {
  background(0)
  
  push()
  
  let x = s * cos(a)
  let y = s * sin(a)
  pattern.strokeWeight(0)
  pattern.fill('hsl('+ c +', 100%, 50%)')
  pattern.ellipse(x + 200, y + 200, 10, 10)

  a += 0.8        //angle
  s += 1        //spacing
  c ++            //hue

  if (c >= 360) {
    c = 0
  }
  
  pop()

  push()
  
  texture(pattern)
  rotateX(angle)
  rotateY(angle)
  rotateZ(angle)
  noStroke()
  box(200)

  angle += 0.003

  pop()
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/*
function polarToCartesian(r) {
  let x = r * cos(a)
  let y = r * sin(a)

  return x
  return y
}
*/
