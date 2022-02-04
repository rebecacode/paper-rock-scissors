const getRouteName = (route) => {
  const routeArr = route.split('-');
  if (routeArr[0] === 'bonus') {
    return 'board-bonus';
  }
  return 'board-classic';
};

export default getRouteName;
