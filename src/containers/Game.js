import { Component } from "react";
import styles from "./Game.module.css";

class Game extends Component {
	constructor(props) {
		super(props);

		// When you call another function from a function, you need to bind this.
		this.checkHandler = this.checkHandler.bind(this);

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		document.body.appendChild(this.canvas);
	}
	state = {
		inputTrack: [],
		input: "",
		alert: "",
		answers: [
			"TIGER",
			"FLAMINGO",
			"LION",
			"BEAR",
			"LION",
			"MONKEY",
			"ELEPHANT",
			"FISH",
			"DOG",
			"CAT",
			"ARMADILLO",
			"FROG",
			"SQUIRREL",
			"RABBIT",
			"WHALE",
			"SHARK",
		],
		chosenAnswer: "",
		matched: "",
		gameFinished: false,
		numOfChance: 10,
	};
	componentDidMount() {
		document.getElementById("input").focus();

		let answers = this.state.answers;
		let ran = Math.floor(Math.random() * answers.length);
		let answer = answers[ran];
		let arr = [...answer];
		let length = arr.length;
		let matched = "";
		for (let i = 0; i < length; i++) {
			matched += "_";
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
		if (match.length > 0) {
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
		} else {
			this.setState((prevState) => {
				return {
					numOfChance: --prevState.numOfChance,
				};
			});
		}
	};
	startOver = () => {
		window.location.reload();
	};

	render() {
		let inputHandle = "";
		let gameover = "";
		let gameoverBtn = "";
		if (this.state.numOfChance == 0) {
			gameover = "Game Over!!";
			gameoverBtn = <button onClick={this.startOver}>Start Over</button>;
			inputHandle = "disabled";
		}

		let arr = [...this.state.matched];
		let showMatched = arr.map((letter) => <span>&nbsp;{letter}&nbsp;</span>);

		const canvas = document.querySelector("canvas");
		canvas.style.paddingTop = "20px";

		let stageWidth = canvas.width;
		let middleWidth = "";
		middleWidth > 400 ? (middleWidth = 400) : (middleWidth = stageWidth / 2);
		const ctx = canvas.getContext("2d");

		ctx.beginPath();
		ctx.moveTo(middleWidth - 70, 2);
		ctx.lineTo(middleWidth - 70, 140);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(middleWidth - 70, 140);
		ctx.lineTo(middleWidth + 100, 140);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(middleWidth - 70, 2);
		ctx.lineTo(middleWidth, 2);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(middleWidth, 2);
		ctx.lineTo(middleWidth, 15);
		ctx.stroke();

		if (this.state.numOfChance < 10) {
			// Face
			ctx.fillStyle = "#ff384e";
			ctx.beginPath();
			ctx.arc(middleWidth, 30, 15, 0, 2 * Math.PI);
			ctx.stroke();

			if (this.state.numOfChance < 9) {
				// body line
				ctx.beginPath();
				ctx.moveTo(middleWidth, 45); // below the head
				ctx.lineTo(middleWidth, 105);
				ctx.stroke();

				if (this.state.numOfChance < 8) {
					// left arm
					ctx.beginPath();
					ctx.moveTo(middleWidth, 45); // below the head
					ctx.lineTo(middleWidth - 20, 75);
					ctx.stroke();

					if (this.state.numOfChance < 7) {
						// right arm
						ctx.beginPath();
						ctx.moveTo(middleWidth, 45); // below the head
						ctx.lineTo(middleWidth + 20, 75);
						ctx.stroke();

						if (this.state.numOfChance < 7) {
							// left leg
							ctx.beginPath();
							ctx.moveTo(middleWidth, 105);
							ctx.lineTo(middleWidth - 30, 125);
							ctx.stroke();

							if (this.state.numOfChance < 6) {
								// right leg
								ctx.beginPath();
								ctx.moveTo(middleWidth, 105);
								ctx.lineTo(middleWidth + 30, 125);
								ctx.stroke();

								if (this.state.numOfChance < 5) {
									// left eye
									ctx.fillStyle = "#ff384e";
									ctx.beginPath();
									ctx.arc(middleWidth - 7, 28, 1, 0, 2 * Math.PI);
									ctx.stroke();

									if (this.state.numOfChance < 4) {
										// right eye
										ctx.fillStyle = "#ff384e";
										ctx.beginPath();
										ctx.arc(middleWidth + 7, 28, 1, 0, 2 * Math.PI);
										ctx.stroke();

										if (this.state.numOfChance < 3) {
											// nose
											ctx.fillStyle = "#ff384e";
											ctx.beginPath();
											ctx.arc(middleWidth, 32, 1, 0, 2 * Math.PI);
											ctx.stroke();

											if (this.state.numOfChance < 3) {
												// // nose
												// ctx.fillStyle = "#ff384e";
												// ctx.beginPath();
												// ctx.arc(middleWidth, 32, 1, 0, 2 * Math.PI);
												// ctx.stroke();
												if (this.state.numOfChance < 2) {
													// mouth
													ctx.fillStyle = "#ff384e";
													ctx.beginPath();
													ctx.arc(middleWidth, 39, 3, 0, 2 * Math.PI);
													ctx.stroke();
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		let track = this.state.inputTrack.join(", ");

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
					<input
						type="text"
						id="input"
						className={styles.Disabled}
						onChange={this.changeHandler}
						disabled={inputHandle}
					/>
				</div>
				<div style={{ fontSize: "11px", paddingBottom: "10px" }}>
					You have tried: {track}
				</div>
				<div id="MatchWord" className={styles.MatchWord}>
					{showMatched}
				</div>
				<div className={styles.Draw}>
					<div>You have {this.state.numOfChance} chances.</div>
					<div>{gameover}</div>
					<div>{gameoverBtn}</div>
				</div>
			</div>
		);
	}
}
export default Game;
