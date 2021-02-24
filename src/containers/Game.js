import { Component } from "react";
import styles from "./Game.module.css";
// import Canvas from "../canvas/Canvas";

class Game extends Component {
	state = {
		inputTrack: [],
		input: "",
		alert: "",
		answer: ["stay", "cup", "bottle", "apple", "banana", "baby"],
	};
	componentDidMount() {
		document.getElementById("input").focus();

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");

		document.body.appendChild(this.canvas);
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
					inputTrack: [...prevState.inputTrack, value],
					input: value,
				}));
			}
		}
		document.getElementById("input").focus();
		setTimeout(() => {
			document.getElementById("input").value = "";
			this.setState({ alert: "" });
			console.log(this.state.inputTrack);
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
				<div className={styles.Draw}></div>
			</div>
		);
	}
}
export default Game;
