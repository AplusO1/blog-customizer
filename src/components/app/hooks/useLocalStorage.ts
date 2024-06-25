import React, { useState, useEffect } from 'react';

export const useLocalStorage = <T>(
	key: string,
	initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch {
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			const item = JSON.stringify(value);
			window.localStorage.setItem(key, item);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}, [value]);

	return [value, setValue];
};
