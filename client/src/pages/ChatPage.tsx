import {useEffect, useRef, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

import {ChatInput, ChatMessageList} from '../components'
import {fetchChatById, fetchChatbotResponse} from '../api/chat'
import {Chat} from '../types/global'

export const ChatPage = () => {
	const navigate = useNavigate()
	const {chatId} = useParams()
	// state
	const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false)
	const [messages, setMessages] = useState<string[]>([])

	useEffect(() => {
		const loadChat = async (chatId: string) => {
			try {
				const chat: Chat = await fetchChatById(chatId)
				const messages = chat.messages.map(
					(message: any) => message.message_text
				)
				setMessages(messages)
			} catch (error) {
				console.error(error)
				navigate('/404')
			}
		}
		chatId && loadChat(chatId)
	}, [chatId, navigate])

	const bottomRef = useRef<null | HTMLDivElement>(null)

	useEffect(() => {
		if (bottomRef && bottomRef.current) {
			bottomRef.current.scrollIntoView({behavior: 'smooth'})
		}
	}, [messages])

	const handleSendMsg = async (msg: string) => {
		setIsLoadingResponse(true)
		// add user message
		setMessages((messages) => [...messages, msg])
		try {
			console.log(msg)
			const response = await fetchChatbotResponse(chatId as string, msg)
			setMessages((messages) => [...messages, response])
		} catch (error) {
			console.error(error)
		}
		setIsLoadingResponse((isLoadingResponse) => !isLoadingResponse)
	}

	return (
		<div>
			<h1>Chat Page</h1>
			<h2>Chat {chatId}</h2>
			<div style={{height: '300px', border: '1px solid', overflow: 'auto'}}>
				<ChatMessageList messages={messages} />
				<div ref={bottomRef}></div>
			</div>
			<ChatInput sendMsg={handleSendMsg} disableSubmit={isLoadingResponse} />
			<br />
			<Link to="/">return to home page</Link>
		</div>
	)
}
