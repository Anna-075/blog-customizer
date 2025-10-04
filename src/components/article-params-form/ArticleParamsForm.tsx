import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isMenuOpen: boolean;
	onToggle: (isMenuOpen: boolean) => void;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
	appliedSettings: ArticleStateType;
};

export const ArticleParamsForm = ({
	isMenuOpen,
	onToggle,
	onApply,
	onReset,
	appliedSettings,
}: ArticleParamsFormProps) => {
	const [formSettings, setFormSettings] = useState(defaultArticleState);

	const sidebarRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formSettings);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormSettings(defaultArticleState);
		onReset();
	};

	const handleToggleMenu = () => {
		const newIsMenuOpen = !isMenuOpen;
		onToggle(newIsMenuOpen);

		if (newIsMenuOpen) {
			setFormSettings(appliedSettings);
		}
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				arrowButtonRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				!arrowButtonRef.current.contains(event.target as Node)
			) {
				onToggle(false);
				setFormSettings(appliedSettings);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen, appliedSettings, onToggle]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={handleToggleMenu}
				ref={arrowButtonRef}
			/>
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					{/* Секция ШРИФТ */}
					<Select
						selected={formSettings.fontFamilyOption}
						onChange={(option) =>
							setFormSettings({
								...formSettings,
								fontFamilyOption: option,
							})
						}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>

					{/* Секция РАЗМЕР ШРИФТА */}
					<RadioGroup
						name='fontSize'
						selected={formSettings.fontSizeOption}
						onChange={(option) =>
							setFormSettings({
								...formSettings,
								fontSizeOption: option,
							})
						}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'
					/>

					{/* Секция ЦВЕТ ШРИФТА */}
					<Select
						selected={formSettings.fontColor}
						onChange={(option) =>
							setFormSettings({
								...formSettings,
								fontColor: option,
							})
						}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>

					{/* Секция ЦВЕТ ФОНА */}
					<Select
						selected={formSettings.backgroundColor}
						onChange={(option) =>
							setFormSettings({
								...formSettings,
								backgroundColor: option,
							})
						}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>

					{/* Секция ШИРИНА КОНТЕНТА */}
					<Select
						selected={formSettings.contentWidth}
						onChange={(option) =>
							setFormSettings({
								...formSettings,
								contentWidth: option,
							})
						}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>

					{/* Разделитель */}
					<Separator />

					{/* Кнопки */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
