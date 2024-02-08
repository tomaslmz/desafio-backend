const getRandomNumber = (min: number, max: number) => parseFloat((Math.random() * (max - min + 1) + min).toFixed(2));

export default getRandomNumber;