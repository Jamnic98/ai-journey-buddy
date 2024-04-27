type Config = {
	serverUrl: string
}

const serverUrl =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		? 'http://localhost:5000'
		: (process.env.PROD_SERVER_URL as string)

export const config: Config = {
	serverUrl,
}
