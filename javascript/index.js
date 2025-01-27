const chronometer = new Chronometer();

// get the buttons:
const btnLeftElement = document.getElementById('btnLeft');
const btnRightElement = document.getElementById('btnRight');

// get the DOM elements that will serve us to display the time:
const minDecElement = document.getElementById('minDec');
const minUniElement = document.getElementById('minUni');
const secDecElement = document.getElementById('secDec');
const secUniElement = document.getElementById('secUni');
const milDecElement = document.getElementById('milDec');
const milUniElement = document.getElementById('milUni');
const splitsElement = document.getElementById('splits');


// para mayor comodidad he trabajado con 10 o 100 como delay, tanto aqui como en la clase. pero en ese caso no pasa los tests
function printTime() {

  stopwatch = setInterval(() => {
    printMinutes()
    printSeconds()

  }, 1000)

}

function printMinutes() {
  minDecElement.innerText = chronometer.computeTwoDigitNumber(chronometer.getMinutes())[0]
  minUniElement.innerText = chronometer.computeTwoDigitNumber(chronometer.getMinutes())[1]

}

function printSeconds() {
  secDecElement.innerText = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[0]
  secUniElement.innerText = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[1]
}

// ==> BONUS  /La opción es modificar la clase Cronometro. Repitiendo la lógica del getSeconds() y getMinutes,
// crear un método getMiliseconds
// y modificar algunos métodos, como el split()
//function printMiliseconds() {

//milDecElement.innerText = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[0]
//milUniElement.innerText = chronometer.computeTwoDigitNumber(chronometer.geteconds())[1]
// }

//he optado por una opción mucho más guarra pero igualmente funcional. lost tests deberían seguir pasando

//function printMiliseconds() {
//milDecElement.innerText = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[0]
//milUniElement.innerText = chronometer.computeTwoDigitNumber(chronometer.geteconds())[1]


let milUniCounter = 0
let milDecCounter = 0
let milwatch
//he tenido que sacar las variables fuera de la función. casi que habría tardado menos hacieéndolo bien.

function printMilliseconds() {


  milwatch = setInterval(() => {

    milUniCounter++


    if (milUniCounter > 9) {
      milUniCounter = 0
      milDecCounter++
    }

    if (milDecCounter > 9) {
      milDecCounter = 0
    }


    milDecElement.innerText = milDecCounter
    milUniElement.innerText = milUniCounter

  }, 100)


}






function printSplit() {
  if (btnRightElement.innerText === 'SPLIT') {
    let splitLI = document.createElement('li')
    splitLI.classList.add('splitLI')
    splitsElement.appendChild(splitLI)
    //me da mucho asquete ver esto así, pero ya que he guarreado en 'printMiliseconds()" toca guarrear aqui tb
    console.log(`${chronometer.split()}${milDecCounter}${milUniCounter}`)
    splitLI.innerText = `${chronometer.split()}:${milDecCounter}${milUniCounter}`
  }
}

function clearSplits() {
  if (btnRightElement.innerText === 'RESET') {
    chronometer.curentTime = 0


    minDecElement.innerText = 0
    minUniElement.innerText = 0
    secDecElement.innerText = 0
    secUniElement.innerText = 0
    // añadido para milisegundos
    milDecElement.innerText = 0
    milUniElement.innerText = 0

    splitsElement.innerHTML = ''
  }
}

function setStopBtn() {

  console.log('reloj comienza')
  chronometer.start()
  printTime()
  printMilliseconds()



  btnLeftElement.innerText = 'STOP'
  btnLeftElement.classList.toggle('stop')
  btnLeftElement.classList.toggle('start')
  btnRightElement.classList.add('split')
  btnRightElement.classList.remove('reset')
  btnRightElement.innerText = 'SPLIT'


}



function setSplitBtn() {

  btnRightElement.classList.add('reset')
  btnRightElement.classList.remove('split')
  btnRightElement.innerText = 'RESET'

}

function setStartBtn() {

  console.log('reloj se para')
  chronometer.stop()
  btnLeftElement.innerText = 'START'
  btnLeftElement.classList.toggle("start")
  btnLeftElement.classList.toggle("stop")
  setSplitBtn()
  clearInterval(stopwatch)
  clearInterval(milwatch)




}

function setResetBtn() {
  clearSplits()

}

// Start/Stop Button
btnLeftElement.addEventListener('click', () => {

  if (btnLeftElement.className === 'btn start') {
    setStopBtn()
    // console.log('reloj comienza')
    // chronometer.start()
    // btnLeftElement.innerText = 'STOP'
    // btnLeftElement.classList.toggle('stop')
    // btnLeftElement.classList.toggle('start')
    // btnRightElement.classList.add('split')
    // btnRightElement.classList.remove('reset')
    // btnRightElement.innerText = 'SPLIT'
  }
  else {
    setStartBtn()
    // console.log('reloj se para')
    // btnLeftElement.innerText = 'START'
    // btnLeftElement.classList.toggle("start")
    // btnLeftElement.classList.toggle("stop")
    // btnRightElement.classList.add('reset')
    // btnRightElement.classList.remove('split')
    // btnRightElement.innerText = 'RESET'
    // console.log(chronometer.currentTime)
  }

});

// Reset/Split Button
btnRightElement.addEventListener('click', () => {


  printSplit()
  setResetBtn()




});
