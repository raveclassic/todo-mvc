import { Property } from 'frp-ts/lib/property';
import { LocationModel } from '../../../domain/model/location/location.model';
import { context } from '../../../utils/context/context.utils';
import { TasksService } from '../../../domain/service/tasks/tasks.service';
import { atom } from '../../../utils/frp-ts/frp-ts.utils';
import { TasksModel } from '../../../domain/model/tasks/tasks.model';
import { valueWithEffect, ValueWithEffect } from '../../../utils/value-with-effect/value-with-effect.utils';
import { createAdapter } from '@most/adapter';
import { pipe } from 'fp-ts/function';
import { mergeMapConcurrently } from '@most/core/dist';
import { result } from '../../../utils/result/result.utils';
import { NavigationService } from '../../../domain/service/navigation/navigation.service';

export interface AppStore {
	readonly location: Property<LocationModel>;

	readonly tasks: Property<TasksModel>;

	readonly addTask: (value: string) => void;
	readonly deleteTask: (id: string) => void;
	readonly checkTask: (id: string, isChecked: boolean) => void;
}

interface CheckTaskEvent {
	readonly id: string;
	readonly isChecked: boolean;
}

export interface NewAppStore {
	(initial: TasksModel): ValueWithEffect<AppStore>;
}

export const newAppStore = context.combine(
	context.key<TasksService>()('tasksService'),
	context.key<NavigationService>()('navigationService'),
	atom.new,
	(tasksService, navigationRepository, newAtom): NewAppStore => initial => {
		const tasks = newAtom<TasksModel>(initial);

		const [addTask, createTaskEvent] = createAdapter<string>();
		const createTaskEffect = pipe(
			createTaskEvent,
			mergeMapConcurrently(tasksService.createTask, 10),
			result.map(task => tasks.modify(tasks => [task, ...tasks])),
		);

		const [deleteTaskRequest, deleteTaskEvent] = createAdapter<string>();
		const deleteTaskEffect = pipe(deleteTaskEvent, mergeMapConcurrently(tasksService.deleteTask, 10));
		const deleteTask = (id: string) => {
			tasks.modify(tasks => tasks.filter(t => t.id !== id));
			deleteTaskRequest(id);
		};

		const [checkTaskRequest, checkTaskEvent] = createAdapter<CheckTaskEvent>();
		const checkTaskEffect = pipe(
			checkTaskEvent,
			mergeMapConcurrently(e => tasksService.checkTask(e.id, e.isChecked), 10),
		);
		const checkTask = (id: string, isChecked: boolean) => {
			tasks.modify(tasks => tasks.map(task => (task.id === id ? { ...task, isChecked } : task)));
			checkTaskRequest({ id, isChecked });
		};

		const location = navigationRepository.location;

		const syncEffect = pipe(tasksService.getAllTasks(), result.map(tasks.set));

		return valueWithEffect.new(
			{
				tasks,
				location,
				addTask,
				deleteTask,
				checkTask,
			},
			createTaskEffect,
			deleteTaskEffect,
			checkTaskEffect,
			syncEffect,
		);
	},
);
