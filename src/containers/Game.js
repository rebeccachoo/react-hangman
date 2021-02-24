import { Component } from "react";
import styles from "./Game.module.css";
// import Canvas from "../canvas/Canvas";

class Game extends Component {
	constructor(props) {
		super(props);

		// When you call another function from a function, you need to bind this.
		this.checkHandler = this.checkHandler.bind(this);
	}
	state = {
		inputTrack: [],
		input: "",
		alert: "",
		answers: ["STAY", "CUP", "BOTTLE", "APPLE", "BANANA", "BABY"],
		chosenAnswer: "",
		matched: "",
	};
	componentDidMount() {
		document.getElementById("input").focus();

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");

		document.body.appendChild(this.canvas);

		let answers = this.state.answers;
		let ran = Math.floor(Math.random() * answers.length);
		let answer = answers[ran];
		let arr = [...answer];
		let length = arr.length;
		let matched = "";
		for (let i = 0; i < length; i++) {
			matched += "X";
		}
		this.setState({ chosenAnswer: answer, matched: matched });
	}
	changeHandler = (event) => {
		let value = event.target.value;
		if (value.length > 1) {
			this.setState({ alert: "Please enter an alphabet." });
		} else if (value.length === 1 && value.match(/[a-z]/i)) {
			if (this.state.inputTrack.includes(value)) {
				this.setState({
					alert: "You already put the alphabet before. Please try another.",
				});
			} else {
				this.setState((prevState) => ({
					inputTrack: [...prevState.inputTrack, value.toUpperCase()],
					input: value.toUpperCase(),
				}));
				setTimeout(() => {
					this.checkHandler();
				}, 10);
			}
		}
		document.getElementById("input").focus();
		setTimeout(() => {
			document.getElementById("input").value = "";
			this.setState({ alert: "" });
			console.log(this.state.chosenAnswer);
		}, 1000);
	};

	checkHandler = () => {
		let arr = [...this.state.chosenAnswer]; // ['c', 'u', 'p']
		let match = [];
		arr.map((item, index) => {
			if (this.state.input === item) {
				console.log("you have got a match");
				console.log("matched: " + this.state.matched);
				match.push(index);
			}
		});
		// match index == [0, 1]
		console.log("match index == " + match);
		let matched = [...this.state.matched]; // ['c', 'u', 'p']
		match.map((value) => {
			matched[value] = this.state.input;
		});
		let newMatched = matched.join("");
		this.setState({ matched: newMatched });
		setTimeout(() => {
			console.log("matched======>" + this.state.matched);
		}, 1000);
	};

	render() {
		return (
			<div className={styles.Game}>
				<div className={styles.Title}>Hangman Alphabet Guess Game</div>
				<div className={styles.Exp}>
					You have 10 chances to guess. Good luck!
				</div>
				<div className={styles.CopyRight}>
					Copyright (c) 2021{" "}
					<a href="mailto:rnwldms@gmail.com" target="_blank" rel="noreferrer">
						Rebecca Choo
					</a>{" "}
				</div>
				<div className={styles.Alert}>{this.state.alert}</div>
				<div className={styles.GameTop}>
					<div>Enter an alphabet:</div>
					<input type="text" id="input" onChange={this.changeHandler} />
				</div>
				<div id="MatchWord" className={styles.MatchWord}></div>
				<div className={styles.Draw}></div>
			</div>
		);
	}
}
export default Game;
