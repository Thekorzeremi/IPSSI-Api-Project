import { Route, Routes } from "react-router";
import { Navbar } from "@/components/navbar";
import { ArticleDetailPage } from "@/pages/article-detail";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { HomePage } from "@/pages/home";

export function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" index element={<HomePage />} />
				<Route path="/articles/:id" element={<ArticleDetailPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</>
	);
}
