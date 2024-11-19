import { getCustomProperty, incCustomProperty, setCustomProperty } from "./setCustomProperty.js"

const groundElem = document.querySelectorAll('[data-ground]')
const SPEED = .07

export function setupGround(){
    setCustomProperty(groundElem[0], '--left', 0)
    setCustomProperty(groundElem[1], '--left', 300)
}


export function updateGround(delta, speedScale){
    groundElem.forEach(ground => {
        incCustomProperty(ground, '--left', delta * speedScale * SPEED * -1)

        if(getCustomProperty(ground, '--left') <= -300){
            incCustomProperty(ground, '--left', 600)
        }
    })
}