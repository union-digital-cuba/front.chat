import React from "react";
import { Button, Modal, Header, Image, Input } from "semantic-ui-react";
import avatar from "../assets/images/matthew.png";

const Profile = (props) => (
	<Modal trigger={<Image avatar src={avatar} style={{ float: "right" }} />}>
		<Modal.Header>{props.userName}</Modal.Header>
		<Modal.Content image>
			<Image wrapped size="medium" src={avatar} />
			<Modal.Description>
				<Header>Detalles del perfil:</Header>
				<p>Cambie los detalles del perfil actual, o desloguee la sessión.</p>

				<h5>Nombre Usuario:</h5>
				<Input icon="user" iconPosition="left" placeholder={props.userName} style={{ width: "100%", marginBottom: "5px" }} />
				<Button.Group floated="right">
					<Button
						onClick={() => {
							props.logOut();
						}}
					>
						Desloguear
					</Button>
					<Button.Or />
					<Button
						positive
						onClick={() => {
							props.handleInputValueChange();
						}}
					>
						Cambiar
					</Button>
				</Button.Group>
			</Modal.Description>
		</Modal.Content>
	</Modal>
);

export default Profile;
