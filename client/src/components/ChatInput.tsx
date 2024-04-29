import {ChangeEvent, FormEvent, useState} from 'react'

type ChatInputProps = {
	sendMsg: (text: string) => void
	disableSubmit?: boolean
}

export const ChatInput = (props: ChatInputProps) => {
	const [userInput, setUserInput] = useState<string>('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		props.sendMsg(userInput)
		setUserInput('')
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value)
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				name="input"
				value={userInput}
				onChange={(e) => handleInputChange(e)}
			/>
			<button
				type="submit"
				disabled={props.disableSubmit || userInput.length === 0}
			>
				Send
			</button>
		</form>
	)
}
