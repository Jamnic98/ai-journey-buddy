type ChatMessageListProps = {
	messages: string[]
}

export const ChatMessageList = ({messages}: ChatMessageListProps) => {
	return (
		<ul>
			{messages.map((message, index) => {
				return <li key={index}>{message}</li>
			})}
		</ul>
	)
}
