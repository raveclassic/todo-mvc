import React, { memo } from 'react';
import { MainStyled, ToggleAllLabelStyled, ToggleAllStyled } from './main.styled';
import { context } from '../../../utils/context/context.utils';
import { TasksContainer } from '../tasks/tasks.container';

const id = `${Math.random()}`;

export interface MainProps {
	readonly areAllCompleted: boolean;
}

export const Main = context.combine(TasksContainer, TasksContainer =>
	memo((props: MainProps) => {
		const { areAllCompleted } = props;
		return (
			<MainStyled>
				<ToggleAllStyled id={id} checked={areAllCompleted} />
				<ToggleAllLabelStyled htmlFor={id}>Mark all as completed</ToggleAllLabelStyled>
				<TasksContainer />
			</MainStyled>
		);
	}),
);
