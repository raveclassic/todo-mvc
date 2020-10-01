import { context } from '../../../utils/context/context.utils';
import { newTasksViewModel } from './tasks.view-model';
import { Tasks } from './tasks.component';
import { createElement, memo, useMemo } from 'react';
import { useProperty } from '../../hook/use-property.hook';

export const TasksContainer = context.combine(newTasksViewModel, Tasks, (newTasksViewModel, Tasks) =>
	memo(() => {
		const vm = useMemo(() => newTasksViewModel(), []);
		const tasks = useProperty(vm.tasks);
		return createElement(Tasks, {
			tasks,
		});
	}),
);
