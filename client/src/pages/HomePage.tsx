import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {deleteChatById, fetchAllChats, fetchNewChat} from '../api/chat'
import {ChatType} from '../types/global'

export const HomePage = () => {
	const navigate = useNavigate()
	const [isLoadingNewChat, setIsLoadingNewChat] = useState<boolean>(false)
	const [chats, setChats] = useState<ChatType[]>([])

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
			const newChat: ChatType = await fetchNewChat()
			navigate(`/chat/${newChat.id}`)
		} catch (error) {
			console.error(error)
			alert('Failed to start a new chat.')
		}
		setIsLoadingNewChat(false)
	}

	const handleOnClick = async (chatId: number) => {
		try {
			await deleteChatById(chatId)
			setChats(chats.filter((chat) => chat.id !== chatId))
		} catch (error) {
			console.error(error)
			alert('Failed to delete chat.')
		}
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
							<button onClick={() => handleOnClick(chatId)}>x</button>
							<Link to={`/chat/${chatId}`}>Chat - {chatId}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
