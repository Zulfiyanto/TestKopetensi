let arr = [32, 97, 71, 85, 10, 20, 67, 2, 41, 52];

const search = (range1, range2) => {
  let result = [];
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] >= range1 && arr[i] <= range2) {
      result.push(arr[i]);
    }
  }
  let hasil = `Data range ${range1} sampai ${range2} = ${result.join(",")}`;
  return hasil;
};

console.log(search(20, 45));
