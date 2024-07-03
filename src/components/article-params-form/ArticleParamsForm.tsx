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
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	changeState: (key: keyof ArticleStateType, selected: OptionType) => void;
	mainSubmitForm: (event: FormEvent) => void;
	defaultStateForm: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	// пример хука для закрытия внеобласти и по нажатию на esc
	type TUseClose = {
		isOpen: boolean;
		onClose: () => void;
		rootRef: React.RefObject<HTMLElement>;
	};

	function useClose({ isOpen, onClose, rootRef }: TUseClose) {
		useEffect(() => {
			if (!isOpen) return; // останавливаем действие эффекта, если закрыто

			function handleClickOutside(event: MouseEvent) {
				const { target } = event;
				const isOutsideClick =
					target instanceof Node && // проверяем, что это `DOM`-элемент
					rootRef.current &&
					!rootRef.current.contains(target); // проверяем, что кликнули на элемент, который находится не внутри нашего блока
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

			//  обязательно удаляем обработчики в `clean-up`- функции
			return () => {
				document.removeEventListener('keydown', handleEscape);
				document.removeEventListener('mousedown', handleClickOutside);
			};
			// обязательно следим за isOpen, чтобы срабатывало только при открытии, а не при любой перерисовке компонента
		}, [isOpen, onClose, rootRef]);
	}

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
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={props.mainSubmitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={props.formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							props.changeState('fontFamilyOption', selected)
						}
					/>
					<RadioGroup
						name='fontSize'
						selected={props.formState.fontSizeOption}
						title='Размер шрифта'
						options={fontSizeOptions}
						onChange={(selected) =>
							props.changeState('fontSizeOption', selected)
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={props.formState.fontColor}
						onChange={(selected) => props.changeState('fontColor', selected)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={props.formState.backgroundColor}
						onChange={(selected) =>
							props.changeState('backgroundColor', selected)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={props.formState.contentWidth}
						onChange={(selected) => props.changeState('contentWidth', selected)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={props.defaultStateForm}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
