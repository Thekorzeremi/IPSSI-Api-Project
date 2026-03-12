import { useState } from "react";

export function HomePage() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1 class="text-3xl font-bold underline">Hello world!</h1>
			<button type="button" onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</button>
		</>
	);
}
