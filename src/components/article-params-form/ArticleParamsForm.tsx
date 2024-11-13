import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useClose } from 'src/ui/radio-group/hooks/useClose';
type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toogleForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectState, setSelectState] =
		useState<ArticleStateType>(currentArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectState({ ...selectState, [key]: value });
	};

	const resetForm = () => {
		setSelectState(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: rootRef,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={toogleForm} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectState);
					}}>
					<div>
						<Text size={31} uppercase weight={800}>
							Задайте параметры
						</Text>
					</div>

					<Select
						selected={selectState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(param) =>
							handleChange('fontFamilyOption', param)
						}></Select>

					<RadioGroup
						name={'fontsize'}
						options={fontSizeOptions}
						selected={selectState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
						title='размер шрифта'></RadioGroup>
					<Select
						selected={selectState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(param) => handleChange('fontColor', param)}></Select>

					<Separator></Separator>

					<Select
						selected={selectState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(param) =>
							handleChange('backgroundColor', param)
						}></Select>

					<Select
						selected={selectState.contentWidth}
						options={contentWidthArr}
						title='цвет фона'
						onChange={(param) => handleChange('contentWidth', param)}></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
