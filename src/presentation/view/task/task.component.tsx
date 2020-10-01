import React, { FormEventHandler, memo, MouseEventHandler, useCallback } from 'react';
import { DestroyStyled, EditStyled, TaskStyled, ToggleLabelStyled, ToggleStyled, ViewStyled } from './task.styled';

export interface TaskProps {
	readonly title: string;
	readonly isCompleted: boolean;
	readonly isInEditMode: boolean;
	readonly onCheck: (value: boolean) => void;
	readonly onDestroy: () => void;
	readonly onEditModeEnter: () => void;
}

export const Task = memo((props: TaskProps) => {
	const { onCheck, title, isCompleted, isInEditMode, onDestroy, onEditModeEnter } = props;
	const handleCheck: FormEventHandler<HTMLInputElement> = useCallback(e => onCheck(e.currentTarget.checked), [
		onCheck,
	]);
	const handleInput: FormEventHandler<HTMLInputElement> = useCallback(() => {}, []);
	const handleDoubleClick: MouseEventHandler = useCallback(() => {}, []);
	return (
		<TaskStyled isCompleted={isCompleted} isInEditMode={isInEditMode}>
			<ViewStyled>
				<ToggleStyled checked={isCompleted} onChange={handleCheck} />
				<ToggleLabelStyled onDoubleClick={onEditModeEnter}>{title}</ToggleLabelStyled>
				<DestroyStyled onClick={onDestroy} />
			</ViewStyled>
			<EditStyled value={title} onChange={handleInput} autoFocus={isInEditMode} />
		</TaskStyled>
	);
});
