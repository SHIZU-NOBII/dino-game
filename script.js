import { setupCactus, updateCactus , getCactusRect} from "./cactus.js"
import { setupDino, updateDino , getDinoRect, dinoLoose} from "./dino.js"
import { setupGround, updateGround } from "./ground.js"

const WorldElem = document.querySelector('[data-world]')
const startScreenElem = document.querySelector('[data-start-screen]')
const scoreElem = document.querySelector('[data-score]')

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const INCREASE_SPEED = 0.000005
let lastTimeFrame
let speedScale
let score

function setPixelToWorldScale(){
    let scaleVariable 
    if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT){
        scaleVariable = window.innerWidth / WORLD_WIDTH
    }else {
        scaleVariable = window.innerHeight / WORLD_HEIGHT
    }
    
    WorldElem.style.width = `${scaleVariable * WORLD_WIDTH}px`
    WorldElem.style.height = `${scaleVariable * WORLD_HEIGHT}px`
}

window.addEventListener('resize', setPixelToWorldScale)
setPixelToWorldScale()

document.addEventListener('keydown', handleStart, {once: true})


function handleStart(){
    lastTimeFrame = null
    speedScale = 1
    score = 0

    setupGround()
    setupDino()
    setupCactus()

    window.requestAnimationFrame(updateFrame)
    startScreenElem.classList.add('hide')
}


function checkLoose(){
    const dinoRect = getDinoRect()

    return getCactusRect().some(cactus => isCollisition(cactus, dinoRect))
}

function isCollisition(rect1, rect2){
    return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom && 
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top 
    )
}

function handleLoose(){
    dinoLoose()

    setTimeout(() => {
        document.addEventListener('keydown', handleStart, {once : true})
        startScreenElem.classList.remove('hide')
    }, 100);
}


function updateFrame(time){
    if(lastTimeFrame == null){
        lastTimeFrame = time 
        window.requestAnimationFrame(updateFrame)
        return
    }

    const delta = time - lastTimeFrame
    updateGround(delta, speedScale)
    updateDino(delta , speedScale)
    updateCactus(delta, speedScale)

    updateSpeed(delta)
    updateScore(delta)

    if(checkLoose()) return handleLoose()

    lastTimeFrame = time
    window.requestAnimationFrame(updateFrame)
}

function updateSpeed(delta){
    speedScale += delta * INCREASE_SPEED
}

function updateScore(delta){
    score += delta * .01

    scoreElem.textContent = Math.floor(score)
}




