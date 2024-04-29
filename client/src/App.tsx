import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ChatPage, HomePage, NotFoundPage} from './pages'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/chat/:chatId" element={<ChatPage />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}

export default App
