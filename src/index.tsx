import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);

	const [formSettings, setFormSettings] = useState(defaultArticleState);

	const sidebarRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	const handleApplySettings = () => {
		setAppliedSettings(formSettings);
		setIsOpen(false);
	};

	const handleResetSettings = () => {
		setFormSettings(defaultArticleState);
		setAppliedSettings(defaultArticleState);
		setIsOpen(false);
	};

	const handleTogglePanel = () => {
		const newIsOpen = !isOpen;
		setIsOpen(newIsOpen);

		if (newIsOpen) {
			setFormSettings(appliedSettings);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				arrowButtonRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				!arrowButtonRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setFormSettings(appliedSettings);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, appliedSettings]);

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
				isOpen={isOpen}
				onButtonClick={handleTogglePanel}
				formSettings={formSettings}
				onFormSettingsChange={setFormSettings}
				onApply={handleApplySettings}
				onReset={handleResetSettings}
				sidebarRef={sidebarRef}
				arrowButtonRef={arrowButtonRef}
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
