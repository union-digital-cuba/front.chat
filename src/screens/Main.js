import React, { useEffect, useState } from "react";
// import { Header } from "semantic-ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

import "../styles/App.css";

import { saveItemLocalStorage, getItemLocalStorage, removeItemLocalStorage } from "../services/service";

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

const MainScreen = () => {
	const [timer, setTimer] = useState(null);

	const [globalState, setGlobalState] = useState({
		userName: "",
		isLoggedIn: false,
		endpoint: "localhost:5000",
		messages: [],
		message: "",
		userTyping: {
			isTyping: false,
			user: "",
			message: "",
		},
	});

	useEffect(() => {
		let data = getItemLocalStorage("reactSocketApp");
		if (data) {
			setGlobalState({ userName: data.userName, isLoggedIn: data.isLoggedIn });
		}

		// Subscribe to WebSocket events
		listenForMessages();
		listenForTyping();
		listenForStopTyping();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const listenForMessages = () => {
		const socket = socketIOClient(globalState.endpoint);
		socket.on("received", (message) => {
			const messages = globalState.messages;
			setGlobalState({ messages: [...messages, message] });
		});
	};

	const listenForTyping = () => {
		const socket = socketIOClient(globalState.endpoint);
		socket.on("notifyTyping", (data) => {
			const userTyping = {
				isTyping: true,
				user: data.user,
				message: data.message,
			};

			// Avoid notifing same logged in user
			if (globalState.userName !== userTyping.user) {
				setGlobalState({ userTyping });
			}
		});
	};

	const listenForStopTyping = () => {
		const socket = socketIOClient(globalState.endpoint);
		socket.on("notifyStopTyping", () => {
			console.log("user stop typing");

			const userTyping = {
				isTyping: false,
				user: "",
				message: "",
			};

			setGlobalState({ userTyping });
		});
	};

	const handleInputValueChange = (event) => {
		setGlobalState({ [event.target.name]: event.target.value });

		clearTimeout(timer);
		setTimer(setTimeout(this.sendStopTyping, WAIT_INTERVAL));
	};

	const handleKeyPressed = (event) => {
		if (event.key === "Enter") {
			sendMessage();
			sendStopTyping();
		} else {
			sendStartTyping();
		}
	};

	const login = (event) => {
		event.preventDefault();
		setGlobalState({ isLoggedIn: true });
		saveItemLocalStorage(globalState.userName);
	};

	const logOut = () => {
		setGlobalState({ isLoggedIn: false, userName: "" });
		removeItemLocalStorage("reactSocketApp");
		sendDisconnect();
	};

	const sendMessage = () => {
		const socket = socketIOClient(globalState.endpoint);
		socket.emit("chat message", null, null, globalState.message);
		setGlobalState({ message: "" });
	};

	const sendStartTyping = () => {
		const socket = socketIOClient(globalState.endpoint);
		const data = { user: globalState.userName, message: globalState.message };
		socket.emit("typing", data);
	};

	const sendStopTyping = () => {
		const socket = socketIOClient(globalState.endpoint);
		socket.emit("stopTyping");
	};

	const sendDisconnect = () => {
		const socket = socketIOClient(globalState.endpoint);
		socket.emit("disconnect");
	};

	return (
		<BrowserRouter>
			<Routes>
				{/* <Header as="h1" content="Cliente Chat (React)" textAlign="center" style={style.h1} /> */}
				<Route
					path="/"
					element={
						globalState.isLoggedIn ? (
							<Dashboard
								userName={globalState.userName}
								style={style}
								message={globalState.message}
								messages={globalState.messages}
								userTyping={globalState.userTyping}
								logOut={logOut}
								handleInputValueChange={handleInputValueChange}
								handleKeyPressed={handleKeyPressed}
								sendMessage={sendMessage}
							/>
						) : (
							<Login userName={globalState.userName} login={login} handleInputValueChange={handleInputValueChange} />
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default MainScreen;
