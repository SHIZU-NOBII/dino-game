import { getCustomProperty, incCustomProperty, setCustomProperty } from "./setCustomProperty.js"

const dinoElem = document.querySelector('[data-dino]')
const FRAME_TIME = 150
const FRAME_COUNT = 2
const GRAVITY = 0.0015
const JUMP_SPEED = .40

let isJumping
let curtuntFrameTime
let dinoFrames
let yvelocity

export function setupDino(){
    isJumping = false
    curtuntFrameTime = 0
    dinoFrames = 0
    yvelocity = 0

    setCustomProperty(dinoElem, '--bottom', 0)
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
}

export function dinoLoose(){
    dinoElem.src = `imgs/dino-lose.png`
}

export function getDinoRect(){
    return dinoElem.getBoundingClientRect()
}

export function updateDino(delta, speedScale){
    handleRun(delta, speedScale)
    handleRunJump(delta)
}
  
function handleRun(delta, speedScale){
    if(isJumping) {
        dinoElem.src = `imgs/dino-stationary.png`
        return
    }

    if(curtuntFrameTime > FRAME_TIME){
        dinoFrames = (dinoFrames + 1) % FRAME_COUNT
        dinoElem.src = `imgs/dino-run-${dinoFrames}.png`

        curtuntFrameTime -= FRAME_TIME
    }

    curtuntFrameTime +=  delta * speedScale
 
}

function handleRunJump(delta){
    if(!isJumping) return

    incCustomProperty(dinoElem, '--bottom', yvelocity * delta)

    if(getCustomProperty(dinoElem, '--bottom') <= 0){
        setCustomProperty(dinoElem, '--bottom', 0)
        isJumping = false
    }

    yvelocity -= GRAVITY * delta
}


function onJump(e){
    if(e.code !== 'Space' || isJumping) return

    yvelocity = JUMP_SPEED
    isJumping = true
}