import axios from 'axios'

import {config} from '../settings'

export const fetchChatbotResponse = async (chatId: number, msg: string) => {
	const requestData: {msg: string} = {msg}
	const response = await axios.post(
		config.serverUrl + `/chat/${chatId}`,
		requestData
	)
	return await response.data
}

export const fetchAllChats = async () => {
	const response = await axios.get(config.serverUrl + '/chat')
	return await response.data
}

export const fetchChatById = async (chatId: number) => {
	const response = await axios.get(config.serverUrl + `/chat/${chatId}`)
	return await response.data
}

export const fetchNewChat = async () => {
	const response = await axios.post(config.serverUrl + '/chat')
	return await response.data
}

export const deleteChatById = async (chatId: number) => {
	const response = await axios.delete(config.serverUrl + `/chat/${chatId}`)
	return await response.data
}
