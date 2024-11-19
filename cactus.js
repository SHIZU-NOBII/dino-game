import { getCustomProperty, incCustomProperty, setCustomProperty } from "./setCustomProperty.js"

const worldElem = document.querySelector('[data-world]')
const SPEED = .07
const MIN_INTERVAL_TIME = 1000
const MAX_INTERVAL_TIME = 2500

let nextCactusTime

export function setupCactus(){
    nextCactusTime = MIN_INTERVAL_TIME

    document.querySelectorAll('[data-cactus]').forEach(e =>{
        e.remove()
    })
}


export function updateCactus(delta, speedScale){

    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        incCustomProperty(cactus, '--left', delta * speedScale * SPEED * -1)

        if(getCustomProperty(cactus, '--left') <= -100){
            cactus.remove()
        }
    })

    if(nextCactusTime <= 0){
        createCactus()
        nextCactusTime = randomNumberBetween(MIN_INTERVAL_TIME, MAX_INTERVAL_TIME) / speedScale 
    }


    nextCactusTime -= delta 
}

export function getCactusRect(){
    let cactus = document.querySelectorAll('[data-cactus]')
    
    return [...cactus].map(e => {
        return e.getBoundingClientRect()
    })

}

function createCactus(){
    const cactus = document.createElement('img')
    cactus.dataset.cactus = true
    cactus.src = `imgs/cactus.png`
    cactus.classList.add('cactus')
    setCustomProperty(cactus, '--left' , 98)
    worldElem.append(cactus)

    getCactusRect()
}

function randomNumberBetween(max, min){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

