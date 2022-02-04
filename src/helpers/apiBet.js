const getRandomBet = (typeGame) => {
  let limit;
  if (typeGame === 'classic') {
    limit = 3;
  } else {
    limit = 5;
  }
  const randomIndex = Math.floor(Math.random() * limit);
  switch (randomIndex) {
    case 0:
      return 'paper';
    case 1:
      return 'scissors';
    case 2:
      return 'rock';
    case 3:
      return 'lizard';
    case 4:
      return 'spock';
    default:
      return 'paper';
  }
};

export default getRandomBet;
