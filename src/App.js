import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Input, Spinner, FormFeedback } from 'reactstrap';
import axios from 'axios';

function App() {

	const [formValue, setformValue] = React.useState({
		title: '',
		content: ''
	});

	const [isLoading, setIsLoading] = React.useState(false);
	const [isSuccessfull, setIsSuccessfull] = React.useState(false);

	const handleSubmit  = async ()=> {
		try {
			setIsLoading(true)
			const joke = {
				title: formValue.title,
				content: formValue.content
			}
			const res = await axios.post('https://gabrovowoch-backend.onrender.com/jokes', joke, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
				}
			});
			console.log(res);
			setIsLoading(false)
			setIsSuccessfull(true)
		} catch(err) {
			console.log(err);
			setIsLoading(false)
		}
	}

	const handleChange = (event) => {
		setformValue({
			...formValue,
			[event.target.name]: event.target.value
		});
		setIsSuccessfull(false)
	}

	return (
		<Container className="my-5">
			<p>Title</p>
			<Input name="title" value={formValue.title} onChange={handleChange} />
			<p>Content</p>
			<Input name="content" type="textarea" value={formValue.content} onChange={handleChange} />
			{isLoading ? <Spinner className='my-3'>Loading...</Spinner> : <Button className="my-3" onClick={handleSubmit}>Post</Button>}
			{isSuccessfull ? <FormFeedback valid>Sweet! sucessfully added!!</FormFeedback>: " "}
		</Container>
	)
}

export default App;
