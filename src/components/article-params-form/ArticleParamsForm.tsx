import { FormEvent, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { useDisclosureForm } from './hooks/useDisclosureForm';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	appState: ArticleStateType;
	formState: ArticleStateType;
	applyState: (event: FormEvent) => void;
	resetState: () => void;
	changeFontFamily: (selected: OptionType) => void;
	changeFontColor: (selected: OptionType) => void;
	changeBackgroundColor: (selected: OptionType) => void;
	changeContentWidth: (selected: OptionType) => void;
	changeFontSize: (selected: OptionType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null); // Исправлено здесь
	const { isOpen, toggle } = useDisclosureForm(false, formRef);
	return (
		<>
			<ArrowButton onClick={toggle} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} ref={formRef} onSubmit={props.applyState}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={props.formState.fontFamilyOption}
						title='Шрифт'
						onChange={props.changeFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={props.formState.fontSizeOption}
						onChange={props.changeFontSize}
					/>
					<Select
						options={fontColors}
						selected={props.formState.fontColor}
						title='Цвет шрифта'
						onChange={props.changeFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={props.formState.backgroundColor}
						title='Цвет фона'
						onChange={props.changeBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={props.formState.contentWidth}
						title='Ширина контента'
						onChange={props.changeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={props.resetState} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
