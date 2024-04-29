import {useEffect, useRef, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

import {ChatInput, MessageList} from '../components'
import {fetchChatById, fetchChatbotResponse} from '../api/chat'
import {ChatType, MessageType} from '../types/global'

export const ChatPage = () => {
	const bottomRef = useRef<null | HTMLDivElement>(null)
	const navigate = useNavigate()
	const {chatId} = useParams()
	const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false)
	const [messages, setMessages] = useState<string[]>([])

	useEffect(() => {
		const loadChat = async (chatId: number) => {
			try {
				const chat: ChatType = await fetchChatById(chatId)
				const messages = chat.messages.map(
					(message: MessageType) => message.text
				)
				setMessages(messages)
			} catch (error) {
				console.error(error)
				navigate('/404')
			}
		}
		chatId && loadChat(Number(chatId))
	}, [chatId, navigate])

	useEffect(() => {
		if (bottomRef && bottomRef.current) {
			bottomRef.current.scrollIntoView({behavior: 'smooth'})
		}
	}, [messages])

	const handleSendMsg = async (msg: string) => {
		setIsLoadingResponse(true)
		// update messages with user input text
		setMessages((messages) => [...messages, msg])
		try {
			const response = await fetchChatbotResponse(Number(chatId), msg)
			setMessages((messages) => [...messages, response])
		} catch (error) {
			console.error(error)
			alert('Failed to send message.')
		}
		setIsLoadingResponse(false)
	}

	return (
		<div>
			<h1>Chat Page</h1>
			<h2>Chat {chatId}</h2>
			<div style={{height: '300px', border: '1px solid', overflow: 'auto'}}>
				<MessageList messages={messages} />
				{isLoadingResponse && <div>...loading</div>}
				<div ref={bottomRef}></div>
			</div>
			<ChatInput sendMsg={handleSendMsg} disableSubmit={isLoadingResponse} />
			<Link to="/">return to home page</Link>
		</div>
	)
}
