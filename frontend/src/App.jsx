import { Route, Routes } from "react-router";
import { Navbar } from "@/components/navbar";
import { ArticleDetailPage } from "@/pages/article-detail";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { HomePage } from "@/pages/home";
import { ThreadsPage } from "@/pages/threads";
import { ThreadDetailPage } from "@/pages/thread-detail";

export function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" index element={<HomePage />} />
				<Route path="/articles/:id" element={<ArticleDetailPage />} />
				<Route path="/threads" element={<ThreadsPage />} />
				<Route path="/threads/:id" element={<ThreadDetailPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</>
	);
}
