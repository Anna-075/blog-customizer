import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onButtonClick: () => void;
	formSettings: ArticleStateType;
	onFormSettingsChange: (settings: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onButtonClick,
	formSettings,
	onFormSettingsChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(); // Вызываем переданную функцию применения
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onReset(); // Вызываем переданную функцию сброса
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onButtonClick} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
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
							onFormSettingsChange({
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
							onFormSettingsChange({
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
							onFormSettingsChange({
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
							onFormSettingsChange({
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
							onFormSettingsChange({
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
