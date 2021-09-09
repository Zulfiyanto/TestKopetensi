// const patternTriangle = (rows) => {
//   for (let i = 0; i < rows; i++) {
//     var hasil = "";
//     for (let j = 0; j < rows - i; j++) hasil += " ";
//     for (let k = 0; k <= i; k++) hasil += "* ";
//     return hasil;
//   }
// };

// console.log(patternTriangle(5));

function createPyramid(rows) {
  for (let i = 0; i < rows; i++) {
    var output = "";
    for (let j = 0; j < rows - i; j++) output += " ";
    for (let k = 0; k <= i; k++) output += "* ";
    console.log(output);
  }
}

createPyramid(5);
