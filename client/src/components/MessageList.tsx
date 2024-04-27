import {useEffect, useRef} from 'react'
import {Message} from './Message'

type MessageListProps = {
	messages: {text: string}[]
}

export const MessageList = ({messages}: MessageListProps) => {
	const bottomRef = useRef<null | HTMLDivElement>(null)

	useEffect(() => {
		if (bottomRef && bottomRef.current) {
			bottomRef.current.scrollIntoView({behavior: 'smooth'})
		}
	}, [messages])

	return (
		<ul style={{overflow: 'auto', height: 'inherit'}}>
			{messages.map((message, index) => {
				const text = message.text
				return text.length > 0 ? (
					<li key={index}>
						<Message text={message.text} />
					</li>
				) : null
			})}
			{/* div for automatic message scrolling */}
			<div ref={bottomRef}></div>
		</ul>
	)
}
