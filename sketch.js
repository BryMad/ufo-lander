let elevation = -300
let ufoZ = -500
let groundElevation = 200
let treeLeavesRadius = 50
let treeLeavesHeight = -2.5 * treeLeavesRadius
let treeTrunkWidth = 0.25 * treeLeavesRadius
let treeTrunkHeight = 0.2 * treeLeavesHeight
let treeTrunkOffset = -((treeLeavesHeight / 2) + (treeTrunkHeight / 2))
let treeGroundOffet = groundElevation + (treeLeavesHeight / 2) + (treeTrunkHeight)
let grassImage
let treeImage
let trunkImage
let moonImage
let starImage
let starAngle = 0
let moonRotationAngle = 0
let moonOrbitAngle = 0
let ufoAngle = 0
let ufoRotationSpeed = 0.015
let speed = 1
let gravity = 0.09
let descentStage = 0
let rocketColors = ['orange', 'yellow', 'red']
let randomColor
let finalRotationCount = 0
let cameraZ = 1780
let cameraY = 150
let dollySpeed = 5
let boomSpeed = 0.4


function preload() {
  grassImage = loadImage('snow.jpg')
  treeImage = loadImage('xmas.jpg')
  trunkImage = loadImage('wood.jpg')
  starImage = loadImage('stars.jpg')
  moonImage = loadImage('moon.jpg')
}

function setup() {
  createCanvas(700, 700, WEBGL)
  noStroke()
}

function draw() {
  camera(0, cameraY, cameraZ, 0, 0, 0, 0, 1, 0)
  if (cameraZ >= 600) {
    cameraZ -= dollySpeed
  }
  if (cameraY >= 0 && cameraZ <= 1000) {
    cameraY -= boomSpeed
  }
  randomColor = random(rocketColors)
  orbitControl()
  background('midnightblue');
  directionalLight(255, 255, 255, -1, 1, -1)
  pointLight(255, 255, 255, 0, elevation - 30, 0)
  drawStars()
  drawGround()
  drawUfo()
  drawForest()
  drawMoon()
  moveUfo()
  drawTreeRow()
}

function drawGround() {
  push()
  if (descentStage === 0) {
    spotLight(80, 80, 100, 0, elevation, ufoZ, 0, 1, 0, Math.PI / 6, 3)
  }

  if (descentStage === 1) {
    spotLight(color(randomColor), 0, elevation, ufoZ, 0, 1, 0, Math.PI / 6, 3)

  }
  texture(grassImage)
  translate(0, 200, 675)
  rotateX(Math.PI / 2)
  plane(1100, 2000)
  pop()
}

function drawStars() {
  push()
  rotateZ(starAngle)
  translate(0, -200, -1500)
  texture(starImage)
  plane(width * 8, height * 6)
  pop()
  starAngle += 0.00025
}

function drawMoon() {
  push()
  rotateZ(moonOrbitAngle)
  translate(width * -0.8, height * -0.5, -800)
  rotateY(moonRotationAngle)
  texture(moonImage)
  sphere()
  pop()
  moonRotationAngle += 0.01
  moonOrbitAngle += 0.0008
}

function drawTree() {
  push()
  texture(treeImage)
  cone(treeLeavesRadius, treeLeavesHeight)
  translate(0, treeTrunkOffset, 0)
  texture(trunkImage)
  cylinder(treeTrunkWidth, treeTrunkHeight)
  pop()
}

function drawForest() {
  push()
  translate(width * 0.25, treeGroundOffet, -110)
  drawTree()
  pop()
  push()
  translate(width * -0.25, treeGroundOffet, -110)
  drawTree()
  pop()
  push()
  translate(width * 0.25, treeGroundOffet, 220)
  drawTree()
  pop()
  push()
  translate(width * -0.25, treeGroundOffet, 220)
  drawTree()
  pop()

}

function drawTreeRow() {
  for (let treeZ = 1675; treeZ > 225; treeZ -= 300) {
    push()
    translate(80, treeGroundOffet, treeZ)
    drawTree()
    translate(-160, 0, 0)
    drawTree()
    pop()
  }

}

function moveUfo() {
  if (ufoZ < 0) {
    ufoZ += 3
  }
  if (ufoZ >= 0) {
    elevation += speed
    speed += gravity
  }
  if (elevation >= -10 && descentStage === 0) {
    speed = 1
    speed -= 4
    descentStage = 1
  } else if (descentStage === 1 && speed >= 0) {
    speed = 1
    gravity = 0
  }
  if (elevation >= 154) {
    elevation = 154
    finalRotationCount += ufoRotationSpeed
    if (finalRotationCount >= PI) {
      noLoop()
    }
  }
}

function drawUfo() {
  push()
  translate(0, elevation, ufoZ)
  drawUfoBody()
  drawUfoTop()
  drawUfoTailLight()
  drawUfoRunningLights()
  drawUfoLandingFin()
  drawUfoBoosters()
  pop()
  ufoAngle += ufoRotationSpeed
}

function drawUfoBody() {
  push()
  //translate(0, elevation, ufoZ)
  rotateY(ufoAngle)
  specularMaterial(250, 250, 250, 1000)
  shininess(20)
  ellipsoid(80, 20, 80)
  pop()
}

function drawUfoTop() {
  push()
  translate(0, -20, 0)
  rotateY(ufoAngle)
  specularMaterial(250, 250, 250, 1000)
  shininess(20)
  ellipsoid(40, 10, 40)
  pop()
}

function drawUfoTailLight() {
  push()
  translate(0, 20, 0)
  rotateY(ufoAngle)
  emissiveMaterial('white')
  sphere(5)
  pop()
}

function drawUfoRunningLights() {
  for (let theta = 0; theta < 360; theta += Math.PI / 8) {
    push()
    rotateY(ufoAngle)
    emissiveMaterial('white')
    translate(76 * cos(theta), 0, 76 * sin(theta))
    sphere(5)
    pop()
  }
}

function drawUfoLandingFin() {
  push()
  for (let theta = 0; theta < 360; theta += Math.PI / 1.5) {
    push()
    rotateY(ufoAngle)
    translate(50 * cos(theta), 18, 50 * sin(theta))
    specularMaterial(250, 250, 250, 1000)
    shininess(20)
    cylinder(10, 36)
    pop()
  }
  pop()
}

function drawUfoBoosters() {
  if (descentStage === 1) {
    push()
    for (let theta = 0; theta < 360; theta += Math.PI / 1.5) {
      push()
      rotateY(ufoAngle)
      translate(50 * cos(theta), 36 + 5, 50 * sin(theta))
      emissiveMaterial(randomColor)
      cylinder(8, 10)
      pop()
    }
    pop()
  }
}