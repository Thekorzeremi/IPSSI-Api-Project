import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home";

export function App() {
	return (
		<Routes>
			<Route path="/" index element={<HomePage />} />
		</Routes>
	);
}
