import React, { FormEventHandler, KeyboardEventHandler, useCallback } from 'react';
import { memo } from 'react';
import { HeadingStyled } from './header.styled';
import { NewTodoStyled } from '../new-todo/new-todo.styled';

export interface HeaderProps {
	readonly value: string;
	readonly onValueChange: (value: string) => void;
	readonly onCommit: () => void;
}

export const Header = memo((props: HeaderProps) => {
	const { onCommit, onValueChange, value } = props;
	const handleKeyUp: KeyboardEventHandler = useCallback(
		e => {
			if (e.keyCode === 13) {
				onCommit();
			}
		},
		[onCommit],
	);
	const handleChange: FormEventHandler<HTMLInputElement> = useCallback(
		e => {
			onValueChange(e.currentTarget.value);
		},
		[onValueChange],
	);
	return (
		<header>
			<HeadingStyled>todos</HeadingStyled>
			<NewTodoStyled
				autoFocus={true}
				type={'text'}
				placeholder={'What needs to be done?'}
				name={'newTodo'}
				value={value}
				onChange={handleChange}
				onKeyUp={handleKeyUp}
			/>
		</header>
	);
});
