import { Message } from 'semantic-ui-react';
import React from 'react';
import './Fade.css';




const fade = (props) => {
	const {
		isError,
		message
	} = props;

	let content = (
		<Message className={`snackbar ${message !== ""?"show":""}`} success>
			<Message.Header>{message}</Message.Header>
		</Message>
	);

	if (isError) {
		content = (
			<Message className={`snackbar ${message !== ""?"show":""}`} negative>
				<Message.Header>{message}</Message.Header>
			</Message>
		);
	}


	return (
		<div>
			{content}
		</div>
	);
};

export default fade;
