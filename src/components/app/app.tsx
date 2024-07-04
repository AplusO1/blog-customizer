import { CSSProperties, useState } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [mainState, setMainState] = useState(defaultArticleState);

	const applyState = (state: ArticleStateType) => {
		setMainState(state);
	};

	const resetState = () => {
		setMainState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': mainState.fontFamilyOption.value,
					'--font-size': mainState.fontSizeOption.value,
					'--font-color': mainState.fontColor.value,
					'--container-width': mainState.contentWidth.value,
					'--bg-color': mainState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applyState={applyState} resetState={resetState} />
			<Article />
		</main>
	);
};
