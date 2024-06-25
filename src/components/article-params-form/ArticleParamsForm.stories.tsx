import type { Meta, StoryObj } from '@storybook/react';
import { useState, FormEvent } from 'react';

import { ArticleParamsForm } from './ArticleParamsForm';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

const meta: Meta<typeof ArticleParamsForm> = {
	component: ArticleParamsForm,
};

export default meta;
type Story = StoryObj<typeof ArticleParamsForm>;

export const ArticleParamsFormStory: Story = {
	render: () => {
		const [formState, setFormState] =
			useState<ArticleStateType>(defaultArticleState);

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

		const applyState = (event: FormEvent) => {
			event.preventDefault();
			console.log('State applied:', formState);
		};

		const resetState = () => {
			setFormState(defaultArticleState);
		};

		return (
			<ArticleParamsForm
				appState={formState}
				formState={formState}
				applyState={applyState}
				resetState={resetState}
				changeFontFamily={changeFontFamily}
				changeFontColor={changeFontColor}
				changeBackgroundColor={changeBackgroundColor}
				changeContentWidth={changeContentWidth}
				changeFontSize={changeFontSize}
			/>
		);
	},
};
