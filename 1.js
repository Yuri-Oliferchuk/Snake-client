const food = [
    [0,0],
    [0,0],
    [1,1],
    [2,0],
    [0,0],
    [0,0],
]

const newFood = food.filter(dot => (dot[0] !== 0) || (dot[1] !== 0));


console.log(newFood);