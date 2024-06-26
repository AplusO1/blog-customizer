import { CSSProperties, useState, FormEvent } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from '../../constants/articleProps';
import { useLocalStorage } from './hooks/useLocalStorage';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [appState, setAppState] = useLocalStorage<ArticleStateType>(
		'state',
		defaultArticleState
	);
	const [formState, setFormState] = useState(appState);

	const resetState = () => {
		setAppState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const applyState = (event: FormEvent) => {
		event.preventDefault();
		setAppState(formState);
	};

	const changeFontFamily = (selected: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: selected });
	};

	const changeFontColor = (selected: OptionType) => {
		setFormState({ ...formState, fontColor: selected });
	};

	const changeBackgroundColor = (selected: OptionType) => {
		setFormState({ ...formState, backgroundColor: selected });
	};

	const changeContentWidth = (selected: OptionType) => {
		setFormState({ ...formState, contentWidth: selected });
	};
	const changeFontSize = (selected: OptionType) => {
		setFormState({ ...formState, fontSizeOption: selected });
	};

	const props = {
		appState,
		formState,
		applyState,
		resetState,
		changeFontFamily,
		changeFontColor,
		changeBackgroundColor,
		changeContentWidth,
		changeFontSize,
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm {...props} />
			<Article />
		</main>
	);
};
