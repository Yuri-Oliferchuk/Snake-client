import React from "react";
import "./Game.css";
import Food from "../Food/Food";
import Snake from "../Snake/Snake";
import randomFood from "../../Utils/randomFood";

let myIntervalId;

const initialState = {
  userName: "",
  gameStatus: "STOP",
  snakeFood: randomFood(),
  score: 0,
  level: 0,
  speed: 150,
  direction: "RIGHT",
  highScore: [],
  snakeBody: [
    [0, 0],
    [2, 0],
  ],
};

class Game extends React.Component {
  state = initialState;

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    clearInterval(myIntervalId);
    document.removeEventListener("keydown", this.onKeyDown);
  }

  componentDidUpdate() {
    this.checkIfEatFood();
    this.chechOutOfField();
    this.checkIfEatYourself();
    this.speedUp();
  }

  startGame = () => {
    myIntervalId = setInterval(this.move, this.state.speed);
  };

  stopGame = () => {
    clearInterval(myIntervalId);
  };

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        if (this.state.direction !== "RIGHT") this.setState({ direction: "LEFT" });
        break;
      case 38:
        if (this.state.direction !== "DOWN") this.setState({ direction: "UP" });
        break;
      case 39:
        if (this.state.direction !== "LEFT") this.setState({ direction: "RIGHT" });
        break;
      case 40:
        if (this.state.direction !== "UP") this.setState({ direction: "DOWN" });
        break;
      default:
    }
  };

  move = () => {
    let position = [...this.state.snakeBody];
    let head = position[position.length - 1];
    switch (this.state.direction) {
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      default:
    }
    position.push(head);
    position.shift();
    this.setState({ snakeBody: position });
  };

  checkIfEatYourself = () => {
    const snakeBody = [...this.state.snakeBody];
    let head = snakeBody[snakeBody.length - 1];
    snakeBody.pop();
    snakeBody.forEach((body) => {
      if (head[0] === body[0] && head[1] === body[1]) {
        this.onGameOver();
      }
    });
  };

  chechOutOfField = () => {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
      this.onGameOver();
    }
  };

  checkIfEatFood = () => {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    let food = [...this.state.snakeFood];

    food.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        dot[0] = 0;
        dot[1] = 0;
        this.setState({ snakeFood: food });
        let score = this.state.score + 1;
        let level = this.state.level + 1;
        this.setState({ score: score });
        this.setState({ level: level });
        const position = [...this.state.snakeBody];
        position.unshift([]);
        this.setState({ snakeBody: position });
      }
    });

    if (food.some((dot) => dot[0] === 0 && dot[1] === 0)) {
      this.setState({ snakeFood: food.filter((dot) => dot[0] !== 0 || dot[1] !== 0) });
    }

    if (this.state.snakeFood.length === 0) {
      this.setState({ snakeFood: randomFood() });
    }
  };

  speedUp() {
    const checkNewLevel = this.state.level < 50 ? false : true;
    if (checkNewLevel) {
      this.setState({ level: 0 });
      if (this.state.speed > 10) {
        const newSpeed = this.state.speed - 10;
        this.setState({ speed: newSpeed });
        clearInterval(myIntervalId);
        myIntervalId = setInterval(this.move, newSpeed);
      }
    }
  }

  onGameOver = () => {
    alert(`Game Ower. Snake length ${this.state.snakeBody.length}`);
    this.stopGame();
    this.setState(initialState);
  };

  onNewGame = () => {
    if (this.state.userName === "") {
      alert("Enter your name, please.");
      return;
    }
    switch (this.state.gameStatus) {
      case "START":
        // this.onGameOver();
        // this.startGame();
        break;
      case "PAUSE":
        this.startGame();
        this.setState({ gameStatus: "START" });
        break;
      case "STOP":
        this.startGame();
        this.setState({ gameStatus: "START" });
        break;
      default:
    }
  };

  onGameFinish = () => {
    switch (this.state.gameStatus) {
      case "START":
        this.onGameOver();
        this.setState({ gameStatus: "STOP" });
        break;
      default:
    }
  };

  onGamePause = () => {
    switch (this.state.gameStatus) {
      case "START":
        this.stopGame();
        this.setState({ gameStatus: "PAUSE" });
        break;
      case "PAUSE":
        this.startGame();
        this.setState({ gameStatus: "START" });
        break;
      default:
    }
  };

  onChangingName = (event) => {
    let value = event.target.value;
    this.setState({ userName: value });
  };

  render() {
    return (
      <div className='board'>
        <div className='mainGameBoard'>
          <Snake snakeBody={this.state.snakeBody} />
          <Food food={this.state.snakeFood} />
        </div>
        <div className='userInfo'>
          <h2>Player name:</h2>
          <input onChange={this.onChangingName} value={this.state.userName} />
        </div>
        <div className='mainInfo'>
          <button onClick={this.onNewGame}>Start New Game</button>
          <button onClick={this.onGameFinish}>Finish Game</button>
          <button onClick={this.onGamePause}>Pause</button>
          <div>{`Total Score: ${this.state.score}`}</div>
          <div>{`Need for new level: ${50 - this.state.level}`}</div>
        </div>
        <div className='highScore'>
          <h2>High Score:</h2>
          <div className='bestPlayers'></div>
        </div>
        <div className="footer">Use arrows keys for control your Snake</div>
      </div>
    );
  }
}

export default Game;
