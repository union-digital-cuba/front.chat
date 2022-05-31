import React from "react";
import { Header, Grid, Segment, Image, List, Input } from "semantic-ui-react";
import Profile from "./Profile";
import MessagesList from "./MessagesList";
import molly from "../assets/images/molly.png";
import steve from "../assets/images/steve.jpg";
import daniel from "../assets/images/daniel.jpg";

const Dashboard = (props) => {
	return (
		<div>
			<Profile userName={props.userName} logOut={props.logOut} handleInputValueChange={props.handleInputValueChange} />
			<Header as="h3" content="Dashboard" style={props.style.h3} textAlign="center" />
			<Grid container columns={2} stackable>
				<Grid.Column>
					<Segment>
						Users
						<List selection verticalAlign="middle">
							<List.Item>
								<Image avatar src={molly} />
								<List.Content>
									<List.Header>Helen</List.Header>
								</List.Content>
							</List.Item>
							<List.Item>
								<Image avatar src={steve} />
								<List.Content>
									<List.Header>Christian</List.Header>
								</List.Content>
							</List.Item>
							<List.Item>
								<Image avatar src={daniel} />
								<List.Content>
									<List.Header>Daniel</List.Header>
								</List.Content>
							</List.Item>
						</List>
					</Segment>
				</Grid.Column>
				<Grid.Column>
					<Segment>
						<Input
							action={{
								content: "Send",
								onClick: () => props.sendMessage(),
							}}
							placeholder="Type something..."
							style={{ width: "100%" }}
							name="message"
							value={props.message}
							onChange={(event) => {
								props.handleInputValueChange(event);
							}}
							onKeyPress={(event) => {
								props.handleKeyPressed(event);
							}}
						/>
					</Segment>
					<MessagesList userTyping={props.userTyping} messages={props.messages} />
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default Dashboard;
