const unidade_medida = [
  'mm',
  'cm',
  'dm',
  'm',
  'dam',
  'hm',
  'km'
];

const getRandomUnit = () => unidade_medida[Math.floor(Math.random() * (6 - 0 + 1) + 0)];

export default getRandomUnit;