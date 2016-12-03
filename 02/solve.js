const fs = require('fs')
const R = require('ramda')

fs.readFile('input.txt', 'utf8', (err, data) => {
  const instructions = data.split('\n').filter(line => line.length)
  console.log(`Instructions have ${instructions.length} lines.`)

  const keycode1 = processInstructions(instructions, usePad1)
  console.log(`bathroom code 1 is ${keycode1.join('')}`)

  const keycode2 = processInstructions(instructions, usePad2)
  console.log(`bathroom code 2 is ${keycode2.join('')}`)
})

function processInstructions(instructions, padFunction) {
  return instructions.map(line => processLine(line, padFunction))
}

// processes a single line of instructions e.g. RUDULR...
function processLine(line, padFunction) {
  var position = 5
  line.split('').forEach(step => {
    position = padFunction(step, position)
  })
  return position
}

function usePad1(step, position) {
  const pad = {
    1: {'L': 1, 'U': 1, 'R': 2, 'D':4},
    2: {'L': 1, 'U': 2, 'R': 3, 'D':5},
    3: {'L': 2, 'U': 3, 'R': 3, 'D':6},
    4: {'L': 4, 'U': 1, 'R': 5, 'D':7},
    5: {'L': 4, 'U': 2, 'R': 6, 'D':8},
    6: {'L': 5, 'U': 3, 'R': 6, 'D':9},
    7: {'L': 7, 'U': 4, 'R': 8, 'D':7},
    8: {'L': 7, 'U': 5, 'R': 9, 'D':8},
    9: {'L': 8, 'U': 6, 'R': 9, 'D':9}
  }
  return pad[position][step]
}

function usePad2(step, position) {
  const A = 'A'
  const B = 'B'
  const C = 'C'
  const D = 'D'
  const pad = {
    1: {'L': 1, 'U': 1, 'R': 1, 'D': 3},
    2: {'L': 2, 'U': 2, 'R': 3, 'D': 6},
    3: {'L': 2, 'U': 1, 'R': 4, 'D': 7},
    4: {'L': 3, 'U': 4, 'R': 4, 'D': 8},
    5: {'L': 5, 'U': 5, 'R': 6, 'D': 5},
    6: {'L': 5, 'U': 2, 'R': 7, 'D': A},
    7: {'L': 6, 'U': 3, 'R': 8, 'D': B},
    8: {'L': 7, 'U': 4, 'R': 9, 'D': C},
    9: {'L': 8, 'U': 9, 'R': 9, 'D': 9},
    A: {'L': A, 'U': 6, 'R': B, 'D': A},
    B: {'L': A, 'U': 7, 'R': C, 'D': D},
    C: {'L': B, 'U': 8, 'R': C, 'D': C},
    D: {'L': D, 'U': B, 'R': D, 'D': D},
  }
  return pad[position][step]
}
