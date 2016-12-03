const fs = require('fs')
const R = require('ramda')
const states = []

fs.readFile('input.txt', 'utf8', (err, data) => {
  const instructions = parseDataIntoInstructions(data)
  const startState = {
    position: {x: 0, y: 0},
    direction: 'N'
  }
  const finalState = processInstructions(instructions, startState)
  console.log(`Final position is ${finalState.position.x}, ${finalState.position.y}`)
  console.log(`That means we end up ${Math.abs(finalState.position.x) + Math.abs(finalState.position.y)} blocks away`)
})

// Takes a string containing a list such as R1, L3, R5, ...
// and returns an array of objects each containing (for example) {turn: R, moves: 1}
function parseDataIntoInstructions(data) {
  const steps = data.split(', ')
  return steps.map(step => {
    return {
      turn: step[0],
      moves: parseInt(step.slice(1), 10)
    }
  })
}

function processInstructions(instructions, state) {
  console.log(`processInstructions called with ${instructions.length} instructions`)
  console.log(state)

  states.push(state)
  if (!instructions.length) {
    return state
  }

  const newState = updateState(R.head(instructions), state)
  if (alreadyBeenHere(newState, states)) {
    console.log(`Found ${state.position.x}, ${state.position.y} again`)
    return state
  }

  return processInstructions(R.tail(instructions), newState)
}

function alreadyBeenHere(curState, states) {
  var haveBeenHere = false
  states.forEach(state => {
    if (state.position.x === curState.position.x &&
        state.position.y === curState.position.y) {
          haveBeenHere = true
        }
  })

  return haveBeenHere
}

function updateState(instruction, state) {
  if (state.direction === 'N' && instruction.turn === 'L') {
    return walkWest(instruction.moves, state)
  }

  if (state.direction === 'N' && instruction.turn === 'R') {
    return walkEast(instruction.moves, state)
  }

  if (state.direction === 'E' && instruction.turn === 'L') {
    return walkNorth(instruction.moves, state)
  }

  if (state.direction === 'E' && instruction.turn === 'R') {
    return walkSouth(instruction.moves, state)
  }

  if (state.direction === 'S' && instruction.turn === 'L') {
    return walkEast(instruction.moves, state)
  }

  if (state.direction === 'S' && instruction.turn === 'R') {
    return walkWest(instruction.moves, state)
  }

  if (state.direction === 'W' && instruction.turn === 'L') {
    return walkSouth(instruction.moves, state)
  }

  if (state.direction === 'W' && instruction.turn === 'R') {
    return walkNorth(instruction.moves, state)
  }
}

function walkWest(d, state) {
  state.direction = 'W'
  state.position.x -= d
  return state
}

function walkEast(d, state) {
  state.direction = 'E'
  state.position.x += d
  return state
}

function walkNorth(d, state) {
  state.direction = 'N'
  state.position.y += d
  return state
}

function walkSouth(d, state) {
  state.direction = 'S'
  state.position.y -= d
  return state
}
