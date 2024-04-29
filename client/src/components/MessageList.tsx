type MessageListProps = {
	messages: string[]
}

export const MessageList = ({messages}: MessageListProps) => {
	return (
		<ul>
			{messages.map((message, index) => {
				return <li key={index}>{message}</li>
			})}
		</ul>
	)
}
