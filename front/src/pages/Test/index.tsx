import { useState } from 'react';
import { useTest } from '~/hooks/useTest';


export function Test() {
	const [name, setName] = useState('Batata');
	const { toggleDarkMode } = useTest();
	return (
		<button type="button" onClick={() => setName(toggleDarkMode())}>
			{name}
		</button>
	);
}
