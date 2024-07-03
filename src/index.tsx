import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [form, setForm] = useState(defaultArticleState);
	const [mainState, setMainState] = useState(defaultArticleState);

	const changeState = (key: keyof ArticleStateType, selected: OptionType) => {
		setForm({ ...form, [key]: selected });
		console.log('ChangeState срабатывает');
	};

	const mainSubmitForm = (event: FormEvent) => {
		event.preventDefault();
		setMainState(form);
		console.log('SetMainState срабатывает');
	};

	const defaultStateForm = () => {
		setForm(defaultArticleState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': mainState.fontFamilyOption.value,
					'--font-size': mainState.fontSizeOption.value,
					'--font-color': mainState.fontColor.value,
					'--container-width': mainState.contentWidth.value,
					'--bg-color': mainState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				changeState={changeState}
				formState={form}
				mainSubmitForm={mainSubmitForm}
				defaultStateForm={defaultStateForm}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
