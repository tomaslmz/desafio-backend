const getRandomBarcode = () => {
  return Array.from({length: 20}, () => Math.floor(Math.random() * 10)).join('');
};

export default getRandomBarcode;