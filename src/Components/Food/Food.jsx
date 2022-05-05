import React from "react";

const Food = (props) => {
    return (
        <div>
            {props.food.map((body, i) => {
                const coordinates = {
                    left: body[0] + "%",
                    top: body[1] + "%", 
                }
                return <div className='snakeFood' key={[i]} style={coordinates}></div>
            })}
        </div>
    )
}

export default Food;