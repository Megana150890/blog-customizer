import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsopen] = useState(false);
	const toogleForm = () => {
		setIsopen(!isOpen);
	};
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectState, setSelectState] =
		useState<ArticleStateType>(currentArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectState({ ...selectState, [key]: value });
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={toogleForm} />
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
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

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</div>
	);
};
