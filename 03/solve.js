const fs = require('fs')

const triangles = []

fs.readFile('input.txt', 'utf8', (err, data) => {
  const lines = data.split(`\n`)
  lines.forEach(line => {
    const numbers = line
      .split(/(\s+)/)
      .filter(line => line.trim().length)
      .map(stringNum => parseInt(stringNum, 10))
    triangles.push(numbers)
  })

  console.log(`The number of possible original triangles is ${countTriangles(triangles)}.`)
  console.log(`The number of possible rearranged triangles is ${countTriangles(rearrange(triangles))}.`)
})

function countTriangles(triangles) {
  sortedTriangles = triangles.map(triangle => triangle.sort((a, b) => a - b))

  return sortedTriangles.reduce((acc, lengths) => {
    return acc + (lengths[0] + lengths[1] > lengths[2] ? 1 : 0)
  }, 0)
}

function rearrange(triangles) {
  const newTriangles = []
  for (var i = 0; i < triangles.length - 2; i += 3) {
    newTriangles.push([triangles[i][0], triangles[i + 1][0], triangles[i + 2][0]])
    newTriangles.push([triangles[i][1], triangles[i + 1][1], triangles[i + 2][1]])
    newTriangles.push([triangles[i][2], triangles[i + 1][2], triangles[i + 2][2]])
  }
  return newTriangles
}
