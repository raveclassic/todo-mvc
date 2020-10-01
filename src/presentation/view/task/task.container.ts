import { TaskModel } from '../../../domain/model/task/task.model';
import { createElement, memo, useMemo } from 'react';
import { Task } from './task.component';
import { context } from '../../../utils/context/context.utils';
import { newTaskViewModel } from './task.view-model';
import { useProperty } from '../../hook/use-property.hook';

export interface TaskContainer {
	readonly task: TaskModel;
}

export const TaskContainer = context.combine(newTaskViewModel, newTaskViewModel =>
	memo((props: TaskContainer) => {
		const {
			task: { id, isCompleted, title },
		} = props;
		const vm = useMemo(() => newTaskViewModel(id), [id]);
		const isInEditMode = useProperty(vm.isInEditMode);
		return createElement(Task, {
			isCompleted,
			title,
			isInEditMode,
			onCheck: vm.check,
			onDestroy: vm.destroy,
		});
	}),
);
