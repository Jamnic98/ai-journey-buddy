type Config = {
	serverUrl: string
}

const serverUrl =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		? 'http://localhost:5000'
		: (process.env.REACT_APP_SERVER_URL_PROD as string)

export const config: Config = {
	serverUrl,
}
