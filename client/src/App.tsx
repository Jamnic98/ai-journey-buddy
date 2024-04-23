import {ChangeEvent, FormEvent, useState} from 'react'

import {sendMessageToChatbot} from './api/chat'

function App() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [userInput, setUserInput] = useState<string>('')
	const [chatbotResponse, setChatbotResponse] = useState<string>('')

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const msg = formData.get('chatInput') as string

		setIsLoading(true)
		try {
			const response = await sendMessageToChatbot(msg)
			setChatbotResponse(response)
		} catch (error) {
			console.error(error)
			setChatbotResponse('')
		}
		setIsLoading(false)
	}

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value)
	}

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					name="chatInput"
					onChange={(e) => handleOnChange(e)}
				/>
				<button type="submit" disabled={userInput.length === 0 || isLoading}>
					Send
				</button>
			</form>
			<br />
			<div>{chatbotResponse}</div>
		</div>
	)
}

export default App
