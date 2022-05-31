import React from "react";
import { Segment, List } from "semantic-ui-react";

const MessagesList = (props) => {
	return (
		<Segment>
			Messages
			<span style={{ float: "right" }}>{props.userTyping.isTyping ? `${props.userTyping.user} is typing ...` : ""}</span>
			<List selection verticalAlign="middle">
				{props.messages.map((mesg, index) => (
					<List.Item key={index}>
						<List.Content>
							<List.Header>{mesg.message}</List.Header>
						</List.Content>
					</List.Item>
				))}
			</List>
		</Segment>
	);
};

export default MessagesList;
