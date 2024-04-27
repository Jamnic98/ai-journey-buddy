import axios from 'axios'

import {config} from '../settings'

export const fetchChatbotResponse = async (msg: string): Promise<string> => {
	const requestData: {msg: string} = {msg}
	const response = await axios.post(config.serverUrl + '/chat', requestData)
	return await response.data
}
