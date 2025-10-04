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
	// Переименовано isOpen → isMenuOpen, setIsOpen → setIsMenuOpen
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Оставляем только примененные настройки в App
	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);

	// Обработчик применения настроек из формы
	const handleApplySettings = (settings: ArticleStateType) => {
		setAppliedSettings(settings);
		setIsMenuOpen(false);
	};

	// Обработчик сброса настроек из формы
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
