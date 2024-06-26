import React, { useState, useCallback, useEffect } from 'react';
import { OnClick } from 'src/components/arrow-button/ArrowButton';
import arrowButtonStyles from '../../arrow-button/ArrowButton.module.scss';

export const useDisclosureForm = (
	initialState = false,
	form: React.RefObject<HTMLFormElement | null>
) => {
	const [isOpen, setIsOpen] = useState<boolean>(initialState);

	const toggle: OnClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key == 'Escape') setIsOpen(false);
		};

		const checkTarget = (target: EventTarget): boolean => {
			const buttonElement = target as HTMLElement;
			return (
				!buttonElement.classList.contains(arrowButtonStyles.arrow) &&
				!buttonElement.classList.contains(arrowButtonStyles.container)
			);
		};

		const handleOutsideClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!form.current?.contains(target) &&
				checkTarget(target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return { isOpen, toggle } as const;
};
