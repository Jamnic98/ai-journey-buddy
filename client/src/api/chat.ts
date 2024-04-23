import axios from 'axios'

export const sendMessageToChatbot = async (msg: string): Promise<string> => {
	const requestData: {msg: string} = {msg}
	const response = await axios.post('http://localhost:5000/chat', requestData)
	return await response.data
}
