import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);

	const handleApplySettings = (settings: ArticleStateType) => {
		setAppliedSettings(settings);
		setIsMenuOpen(false);
	};

	const handleResetSettings = () => {
		setAppliedSettings(defaultArticleState);
		setIsMenuOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isMenuOpen={isMenuOpen}
				onToggle={setIsMenuOpen}
				onApply={handleApplySettings}
				onReset={handleResetSettings}
				appliedSettings={appliedSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
