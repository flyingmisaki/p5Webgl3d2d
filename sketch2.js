class Pattern {
    nextFrame = null
    reset = null
    isStarted = null
}

class SpiralPattern {
    constructor(angleDelta, spacing, startingHue, startingRadius, startingAngle) {
        this.startingHue = startingHue
        this.startingRadius = startingRadius
        this.startingAngle = startingAngle

        this.currentHue = null
        this.currentRadius = null
        this.currentAngle = null

        this.angleDelta = angleDelta // Amount to increase angle by each loop
        this.spacing = spacing // Amount to increase radius by each loop
    }

    nextPoint() {
        if (this.isStarted()) {
            // Calculate current radius, hue and angle values
            this.currentAngle += this.angleDelta
            this.currentRadius += this.spacing
            this.currentHue ++
        }
        else {
            // Set current radius, hue and angle values as their starting values
            this.currentHue = this.startingHue
            this.currentRadius = this.startingRadius
            this.currentAngle = this.startingAngle
        }

        // Reset hue to 0 if over 360 (upper limit on hue in HSL)
        if (this.currentHue >= 360) this.currentHue = 0

        // Calculate x and y and return the x y and hue
        const x = this.currentRadius * cos(this.currentAngle)
        const y = this.currentRadius * sin(this.currentAngle)
        return {
            x,
            y,
            hue : this.currentHue
        }
    }

    isStarted() {    
        return this.currentHue != null
        // ^^^^^ this is equal to this VVVVVVV
        // if (this.currentHue != null) {
        //     return true
        // }
        // else {
        //     return false
        // }
    }
}

class CubeRenderer {
    constructor(pattern, startingAngle, angleDelta) {
        this.pattern = pattern
        this.buffer = createGraphics(400,400)

        this.startingAngle = startingAngle
        this.angleDelta = angleDelta

        this.currentAngle = null
    }

    tick(){
        push()
        
        background(0)

        if(this.currentAngle == null){
            this.currentAngle = this.startingAngle
        }
        else{
            this.currentAngle += this.angleDelta
        }
        console.log(this.pattern.nextPoint())
        const {x, y, hue} = this.pattern.nextPoint()

        this.buffer.strokeWeight(0)
        
        this.buffer.fill('hsl('+ hue +', 100%, 50%)')
        this.buffer.ellipse(x + 200, y + 200, 10, 10)

        texture(this.buffer)

        rotateX(this.currentAngle)
        rotateY(this.currentAngle)
        rotateZ(this.currentAngle)
        
        noStroke()
        box(200)
        
        pop()
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

function setup() {
    createCanvas(400, 400, WEBGL)
    colorMode(HSB)
    
    renderer = new CubeRenderer(testPattern, 0, 0.003)
}

function draw() {
    background(0)
    renderer.tick()
}

const testPattern = new SpiralPattern(5, 0.5, getRandomInteger(0, 255), 0, 0)
let renderer = null