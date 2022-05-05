const randomFood = () => {
  const start = 1;
  const end = 98;

  const typeOfFood = Math.floor(Math.random() * 3 + 1);
  let foodNumber = 1;
  if (typeOfFood === 2) foodNumber = 5;
  if (typeOfFood === 3) foodNumber = 10;

  const foodArray = [];
  let left,
    top,
    i = 0;
  do {
    left = Math.floor((Math.random() * (end - start + 1) + start) / 2) * 2;
    top = Math.floor((Math.random() * (end - start + 1) + start) / 2) * 2;
    // if(foodArray.some(food => ((food[0] === left) && (food[1] === top)))) {
    //   i--
    // } else {
    foodArray[i] = [left, top];
    // }
    i++;
  } while (foodArray.length < foodNumber);
  return foodArray;
};

export default randomFood;
