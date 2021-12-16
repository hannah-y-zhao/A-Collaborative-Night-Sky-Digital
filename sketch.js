//REFERENCES
//https://creative-coding.decontextualize.com/text-and-type/ reference for text settings (color, size)
//https://editor.p5js.org/ag3439/sketches/Skgh1ZQtQ reference for cursor
//https://editor.p5js.org/Anneliselee/sketches/zyZ6_tOS5 reference for background stars

//https://www.space.com/15486-night-sky-constellations-names.html
//https://www.lpi.usra.edu/education/skytellers/constellations/


let pages = 0
let lastPg = 0

let adviceAPI='https://api.adviceslip.com/advice'
let adviceInfo

let num = 0
let numAPI = 'http://numbersapi.com/' + num + '/'
let numInfo

let constellation = []
let connection=[]

let rotation=.1

let pinkTone
let orangeTone
let tealTone
let blueTone
let purpleTone

let txtMove=0

let alph=150
let alphAdd=5

let starsArr=[]


function setup() {
  createCanvas(windowWidth, windowHeight);

  loadStrings(numAPI, numData)
  loadJSON(adviceAPI, adviceData)

  noCursor()
  
  for (let i=0;i<25;i++){
    if(frameCount%20==0){
    starsArr[i]=new Galaxy(random(width),random(height),random(1,5),random(150,180))
    }
  }
}

function backgroundStar(){
  

  for (let i=0;i<25;i++){
    
    starsArr[i].show()
    starsArr[i].shine()
 
  }
}

function startOver() {
  pages = 1

}

function getNumAPI(num) {
  return 'http://numbersapi.com/' + num + '/'

}

function numData(data) {
  numInfo = data
}

function getAdviceAPI(){
  return adviceAPI
}

function adviceData(data){
  adviceInfo = data

}


//--PAGES functions--\\
function introPg() {
  background(0)
  textFont('Courier New')
  textAlign(CENTER)
  noStroke()
  fill(240,sin(frameCount*0.1) *10+250,cos(frameCount*0.1) *10+250,sin(frameCount*0.1) *15+245)
  
  if (mouseX>100&&mouseX<width-100&&mouseY>200&&mouseY<height-150){
    txtMove=5

  }else {
    txtMove=0
  }

  textSize(10+txtMove*3)

  text('\n\nConstellations have been named all throughout history and through many different cultures. Forty-eight constellations are known as "ancient," mostly coming from ancient Middle Eastern, Greek, and Roman cultures. These clusters of stars often represented gods, animals, or other objects from their stories. Currently, there are eighty-eight constellations officially recognized by the International Astronomical Union.\n\n\n\nClick the mouse to move to the next page and use Q W E R T to make constellations!', 100,300-txtMove*30,width-200,height-200+txtMove*10)
  

}

function interactPg() {

  background(0)
  push()
  fill(255)
  noStroke()
  textSize(25)

  let subInfo = split(numInfo[0], ' is')

  if (constellation.length&&adviceInfo&&num>0){
    text(constellation[constellation.length - 1].length + ' stars:' + subInfo[1] + "\nColor's advice: "+adviceInfo.slip.advice, 20, height - 90, width - 20, height - 10)
    textAlign(LEFT)
    text('Click the mouse to see the final result!',30,30)

} else {
    text('0 stars',20, height - 60, width - 20,height - 10)
    textAlign(LEFT)
    text('Use Q W E R T to make constellations!',30,30)
  }

  pop()

  if (lastPg != 1) {
    let lastConstellation = constellation[constellation.length - 1]
    let lastConnection=connection[connection.length-1]
    if (!lastConstellation || lastConstellation.length) {
      num=0
      loadStrings(getNumAPI(num), numData)
      loadJSON(getAdviceAPI(),adviceData)
      constellation.push([])
      
    }
    if(!lastConnection||lastConnection.length){
      connection.push([])

    }
  }
  
  for (let i=1; i<connection[connection.length-1].length;i++){
    const previous=connection[connection.length-1][i-1]
    const current=connection[connection.length-1][i]
    stroke(255,sin(frameCount*0.1) *20+205)
    strokeWeight(2)
    line(previous.x,previous.y,current.x,current.y)
    }

  for (let i=0; i<constellation[constellation.length-1].length;i++){
    constellation[constellation.length-1][i].glow(sin(frameCount*0.1) *25+235)
    constellation[constellation.length-1][i].show()
    
  }
}

function endPg() {
  background(0)
  textAlign(LEFT)
  noStroke()
  fill(255)
  text('Press space to make another!',30,30)
  push()

  translate(width / 2, height / 2)
  
  for (i=0;i<constellation.length;i++){
    push()
    translate(pow(i,i/2),pow(i,i/2))
    pop()

    for (j=1;j<constellation[i].length;j++){
      push()
      rotate(rotation+7*i)
      scale((1/(i*.9+3))*((.5*i+1)/1))

      constellation[i][j].returnPos()
      stroke(255)
      strokeWeight(2)
      const previous=constellation[i][j-1].returnPos()
      const current=constellation[i][j].returnPos()
      line(previous.x,previous.y,current.x,current.y)

      constellation[i][j].show()
      constellation[i][0].show()
      constellation[i][j].glow(255)
      constellation[i][0].glow(255)
          
      pop()

    } 
    rotation+=.0005
  }

  pop()
}

//--organize for PAGES--\\
function draw() {

  switch (pages) {
    case 0: introPg()
    backgroundStar()
      lastPg = 0
      break;

    case 1: interactPg()
      lastPg = 1

      if (alph==150){
        alphAdd=5

      }else if (alph==255){
        alphAdd=-5

      }
      alph+=alphAdd
      break;

    case 2: endPg()
      backgroundStar()
      lastPg = 2
      alph=255
    
      break;

    }


  stroke(255)
  noFill()
  strokeWeight(1.5)
  circle(mouseX,mouseY,16)
}

function mousePressed(){
  if (pages<2){
    pages++
  }else if (pages==2){
    pages=0
  }
  
}

//--FADING TONES (w/ setTimeout)--\\
function fadePink(){
  pinkTone.amp(0,2)
}
function fadeOrange(){
  orangeTone.amp(0,2)

}
function fadeTeal(){
  tealTone.amp(0,2)

}
function fadeBlue(){
  blueTone.amp(0,2)

}
function fadePurple(){
  purpleTone.amp(0,2)

}

//--MAKING CONSTELLATIONS--\\
function keyPressed() {
    if (pages == 1) {
      let xy={
        x:mouseX,
        y:mouseY
      }
      if (key=='q') {
        //increment number of stars
        num++

        //make stars
        let pinkCol=color('#FDD5DB')
        constellation[constellation.length - 1].push(new Star(pinkCol))

        //make lines to connect stars
        connection[connection.length-1].push(xy)

        //reload data according to num
        loadStrings(getNumAPI(num), numData)
        loadJSON(getAdviceAPI(),adviceData)

        //sound
        pinkTone=new p5.Oscillator('sine')
        pinkTone.start()
        pinkTone.amp(.1,.5)
        pinkTone.freq(1318.51)
        setTimeout(fadePink(),1000)


      }
      else if (key=='w') {

        num++

        let orangeCol=color('#FFDFC0')
        constellation[constellation.length - 1].push(new Star(orangeCol))

        connection[connection.length-1].push(xy)

        loadStrings(getNumAPI(num), numData)
        loadJSON(getAdviceAPI(),adviceData)

        orangeTone=new p5.Oscillator('sine')
        orangeTone.start()
        orangeTone.amp(.1,.5)
        orangeTone.freq(1661.22)
        setTimeout(fadeOrange(),1000)

      }
      else if (key=='e') {

        num++

        let tealCol=color('#BFEADD')
        constellation[constellation.length - 1].push(new Star(tealCol))

        connection[connection.length-1].push(xy)

        loadStrings(getNumAPI(num), numData)
        loadJSON(getAdviceAPI(),adviceData)

        tealTone=new p5.Oscillator('sine')
        tealTone.start()
        tealTone.amp(.1,.5)
        tealTone.freq(1760.00)
        setTimeout(fadeTeal(),1000)

      }
      else if (key=='r') {

        num++

        let blueCol=color('#B4E3F3')
        constellation[constellation.length - 1].push(new Star(blueCol))

        connection[connection.length-1].push(xy)

        loadStrings(getNumAPI(num), numData)
        loadJSON(getAdviceAPI(),adviceData)

        blueTone=new p5.Oscillator('sine')
        blueTone.start()
        blueTone.amp(.1,.5)
        blueTone.freq(1975.53)
        setTimeout(fadeBlue(),1000)

      }
      else if (key=='t') {

        num++

        let purpleCol=color('#D0D4F9')
        constellation[constellation.length - 1].push(new Star(purpleCol))

        connection[connection.length-1].push(xy)

        loadStrings(getNumAPI(num), numData)
        loadJSON(getAdviceAPI(),adviceData)

        purpleTone=new p5.Oscillator('sine')
        purpleTone.start()
        purpleTone.amp(.1,.5)
        purpleTone.freq(2349.32)
        setTimeout(fadePurple(),1000)

      }
    }
  else if (key==' '){
    pages=1
  }
}





