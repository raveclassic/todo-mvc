import React, { memo } from 'react';
import { TasksStyled } from './tasks.styled';
import { context } from '../../../utils/context/context.utils';
import { TaskContainer } from '../task/task.container';
import { TasksModel } from '../../../domain/model/tasks/tasks.model';

export interface TasksProps {
	readonly tasks: TasksModel;
}

export const Tasks = context.combine(TaskContainer, TaskContainer =>
	memo((props: TasksProps) => {
		return (
			<TasksStyled>
				{props.tasks.map(task => (
					<TaskContainer task={task} key={task.id} />
				))}
			</TasksStyled>
		);
	}),
);
