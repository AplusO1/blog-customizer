import { Text } from '../text';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	applyState: (state: ArticleStateType) => void;
	resetState: () => void;
};

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

function useClose({ isOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, rootRef]);
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [form, setForm] = useState(defaultArticleState);
	const formRef = useRef<HTMLFormElement>(null);
	const changeState = (key: keyof ArticleStateType, selected: OptionType) => {
		setForm({ ...form, [key]: selected });
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		props.applyState(form);
	};

	const handleReset = () => {
		setForm(defaultArticleState);
		props.resetState();
	};

	function toggleOpen() {
		setIsOpen(!isOpen);
	}

	useClose({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton onClick={toggleOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={form.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) => changeState('fontFamilyOption', selected)}
					/>
					<RadioGroup
						name='fontSize'
						selected={form.fontSizeOption}
						title='Размер шрифта'
						options={fontSizeOptions}
						onChange={(selected) => changeState('fontSizeOption', selected)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={form.fontColor}
						onChange={(selected) => changeState('fontColor', selected)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={form.backgroundColor}
						onChange={(selected) => changeState('backgroundColor', selected)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={form.contentWidth}
						onChange={(selected) => changeState('contentWidth', selected)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
