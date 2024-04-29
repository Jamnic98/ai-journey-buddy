import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {fetchAllChats, fetchNewChat} from '../api/chat'
import {Chat} from '../types/global'

export const HomePage = () => {
	const navigate = useNavigate()
	const [isLoadingNewChat, setIsLoadingNewChat] = useState<boolean>(false)
	const [chats, setChats] = useState<Chat[]>([])

	useEffect(() => {
		loadChats()
	}, [])

	const loadChats = async () => {
		try {
			const chats = await fetchAllChats()
			setChats(chats)
		} catch (error) {
			console.error(error)
			alert('Failed to fetch chats.')
		}
	}

	const handleStartNewChat = async () => {
		setIsLoadingNewChat(true)
		try {
			const newChat: Chat = await fetchNewChat()
			navigate(`/chat/${newChat.id}`)
		} catch (error) {
			console.error(error)
			alert('Failed to start a new chat.')
		}
		setIsLoadingNewChat(false)
	}

	return (
		<div>
			<h1>Home Page</h1>
			<button
				type="button"
				onClick={handleStartNewChat}
				disabled={isLoadingNewChat}
			>
				Start New Chat
			</button>
			<h2>Chat List</h2>
			<ul>
				{chats.map((chat) => {
					const chatId = chat.id
					return (
						<li key={chatId}>
							Chat: <Link to={`/chat/${chatId}`}>{chatId}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
