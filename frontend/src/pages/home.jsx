import { Button } from "@/components/ui/button";
import { useState } from "react";

export function HomePage() {
	const [count, setCount] = useState(0);

	return (
		<Button onClick={() => setCount((count) => count + 1)}>
			count is {count}
		</Button>
	);
}
