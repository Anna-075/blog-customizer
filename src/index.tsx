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
	// Состояние для открытия/закрытия сайдбара
	const [isOpen, setIsOpen] = useState(false);

	// Состояние ПРИМЕНЕННЫХ настроек (то, что видно в статье)
	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);

	// Состояние ТЕКУЩИХ настроек в форме (которые еще не применены)
	const [formSettings, setFormSettings] = useState(defaultArticleState);

	// Ref для основного контейнера
	const mainRef = useRef<HTMLElement>(null);

	// Функция для применения настроек (нажатие "Применить")
	const handleApplySettings = () => {
		// Применяем formSettings к appliedSettings
		setAppliedSettings(formSettings);
		setIsOpen(false); // Закрываем панель после применения
	};

	// Функция для сброса настроек (нажатие "Сбросить")
	const handleResetSettings = () => {
		// Сбрасываем formSettings к начальным настройкам (defaultArticleState)
		setFormSettings(defaultArticleState);
		// ПРИМЕНЯЕМ начальные настройки к статье
		setAppliedSettings(defaultArticleState);
		setIsOpen(false); // Закрываем панель после сброса
	};

	// Функция для открытия/закрытия панели
	const handleTogglePanel = () => {
		const newIsOpen = !isOpen;
		setIsOpen(newIsOpen);

		// При открытии синхронизируем formSettings с appliedSettings
		if (newIsOpen) {
			setFormSettings(appliedSettings);
		}
	};

	// Обработчик клика вне панели
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				mainRef.current &&
				!mainRef.current.contains(event.target as Node) &&
				// Проверяем, что клик не по стрелочной кнопке
				!(event.target as Element).closest(
					'[role="button"][aria-label*="формы параметров статьи"]'
				)
			) {
				setIsOpen(false);
				// При закрытии сбрасываем форму к примененным настройкам
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
			ref={mainRef}
			className={clsx(styles.main)}
			style={
				{
					// Используем ТОЛЬКО appliedSettings для CSS-переменных
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
				formSettings={formSettings} // Передаем текущие настройки формы
				onFormSettingsChange={setFormSettings} // Функция для изменения настроек формы
				onApply={handleApplySettings} // Функция для применения настроек
				onReset={handleResetSettings} // Функция для сброса формы
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
