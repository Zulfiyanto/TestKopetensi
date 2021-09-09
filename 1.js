let golA = 5000;
let golB = 7000;
let golC = 8000;
let golD = 10000;

const Gaji = (gol, jam) => {
  let lembur = (jam - 48) * 4000;
  let upah = golC * jam;
  let gaji = upah + lembur;
  return `
Golongan    : ${gol}
Jam kerja   : ${jam}
Upah        : Rp. ${upah}
Uang lembur : Rp. ${lembur}
Gaji        : Rp. ${gaji}
  `;
};

console.log(Gaji("C", 53));
