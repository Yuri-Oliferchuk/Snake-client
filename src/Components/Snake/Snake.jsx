import React from "react";

const Snake = (props) => {

    return (
        <div>
            {props.snakeBody.map((body, i) => {
                const coordinates = {
                    left: body[0] + "%",
                    top: body[1] + "%", 
                }
                return <div className='snakeBody' key={[i]} style={coordinates}></div>
            })}
        </div>
    )
}

export default Snake;