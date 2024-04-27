import {useState} from 'react'

import {ChatInput, MessageList} from '../components'
import {fetchChatbotResponse} from '../api/chat'

export const ChatBox = () => {
	const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false)
	const [messages, setMessages] = useState<{text: string}[]>([])

	const handleSendUserMsg = async (text: string) => {
		setIsLoadingResponse(true)
		// add user message to messages
		setMessages([...messages, {text}])
		try {
			const response = await fetchChatbotResponse(text)
			setMessages((messages) => [...messages, {text: response}])
		} catch (error) {
			console.error(error)
		}
		setIsLoadingResponse((isLoadingResponse) => !isLoadingResponse)
	}

	return (
		// TODO: update styles
		<div /* style={{width: '500px'}} */>
			<div style={{height: '100px' /* , border: '1px solid' */}}>
				<MessageList messages={messages} />
			</div>
			<ChatInput sendMsg={handleSendUserMsg} disabled={isLoadingResponse} />
		</div>
	)
}
