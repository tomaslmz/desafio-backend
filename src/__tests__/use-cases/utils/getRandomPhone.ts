const getRandomPhone = () => {
  return Array.from({length: 12}, () => Math.floor(Math.random() * 10)).join('');
};

export default getRandomPhone;