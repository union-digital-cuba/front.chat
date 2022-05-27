import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { saveItemLocalStorage, getItemLocalStorage, removeItemLocalStorage } from "./services/service";

const style = {
	h1: {
		marginTop: "3em",
	},
	h2: {
		margin: "4em 0em 2em",
	},
	h3: {
		marginTop: "2em",
		padding: "2em 0em",
	},
	last: {
		marginBottom: "300px",
	},
};

const WAIT_INTERVAL = 1000;

class App extends Component {
	state = {
		userName: "",
		isLoggedIn: false,
		endpoint: "192.168.0.107:5000",
		messages: [],
		message: "",
		userTyping: {
			isTyping: false,
			user: "",
			message: "",
		},
	};

	componentDidMount() {
		let data = getItemLocalStorage("reactSocketApp");
		if (data) {
			this.setState({ userName: data.userName, isLoggedIn: data.isLoggedIn });
		}

		// Subscribe to WebSocket events
		this.listenForMessages();
		this.listenForTyping();
		this.listenForStopTyping();

		this.timer = null;
	}

	handleInputValueChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });

		clearTimeout(this.timer);
		this.timer = setTimeout(this.sendStopTyping, WAIT_INTERVAL);
	};

	handleKeyPressed = (event) => {
		if (event.key === "Enter") {
			this.sendMessage();
			this.sendStopTyping();
		} else {
			this.sendStartTyping();
		}
	};

	login = (event) => {
		event.preventDefault();
		this.setState({ isLoggedIn: true });
		saveItemLocalStorage(this.state.userName);
	};

	logOut = () => {
		this.setState({ isLoggedIn: false, userName: "" });
		removeItemLocalStorage("reactSocketApp");
		this.sendDisconnect();
	};

	sendMessage = () => {
		const socket = socketIOClient(this.state.endpoint);
		socket.emit("chat message", this.state.message);
		this.setState({ message: "" });
	};

	listenForMessages = () => {
		const socket = socketIOClient(this.state.endpoint);
		socket.on("received", (message) => {
			const messages = this.state.messages;
			this.setState({ messages: [...messages, message] });
		});
	};

	listenForTyping = () => {
		const socket = socketIOClient(this.state.endpoint);
		socket.on("notifyTyping", (data) => {
			const userTyping = {
				isTyping: true,
				user: data.user,
				message: data.message,
			};

			// Avoid notifing same logged in user
			if (this.state.userName !== userTyping.user) {
				this.setState({ userTyping });
			}
		});
	};

	listenForStopTyping = () => {
		const socket = socketIOClient(this.state.endpoint);
		socket.on("notifyStopTyping", () => {
			console.log("user stop typing");

			const userTyping = {
				isTyping: false,
				user: "",
				message: "",
			};

			this.setState({ userTyping });
		});
	};

	sendStartTyping = () => {
		const socket = socketIOClient(this.state.endpoint);
		const data = { user: this.state.userName, message: this.state.message };
		socket.emit("typing", data);
	};

	sendStopTyping = () => {
		const socket = socketIOClient(this.state.endpoint);
		socket.emit("stopTyping");
	};

	sendDisconnect = () => {
		const socket = socketIOClient(this.state.endpoint);
		socket.emit("disconnect");
	};

	render() {
		return (
			<Router>
				<Header as="h1" content="Cliente Chat (React)" textAlign="center" style={style.h1} />
				<Switch>
					<Route
						render={() =>
							this.state.isLoggedIn ? (
								<Dashboard
									{...this.props}
									userName={this.state.userName}
									style={style}
									message={this.state.message}
									messages={this.state.messages}
									userTyping={this.state.userTyping}
									logOut={this.logOut}
									handleInputValueChange={this.handleInputValueChange}
									handleKeyPressed={this.handleKeyPressed}
									sendMessage={this.sendMessage}
								/>
							) : (
								<Login {...this.props} userName={this.state.userName} login={this.login} handleInputValueChange={this.handleInputValueChange} />
							)
						}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
