import { TasksRepository } from '../../../domain/repository/tasks/tasks.repository';
import { context } from '../../../utils/context/context.utils';
import { LocalStorageDataSource } from '../../data-source/local-storage/local-storage.data-source';
import { boolean, readonlyArray, strict, string, Type } from 'io-ts';
import { TasksModel } from '../../../domain/model/tasks/tasks.model';
import { result } from '../../../utils/result/result.utils';
import { newStream, propagateEventTask } from '@most/core/dist';
import { asap } from '@most/scheduler';
import { Disposable } from '@most/types';
import { remoteData } from '@devexperts/remote-data-ts';

const STORAGE_KEY = 'todo-mvc//tasks-storage';

export interface NewTasksRepository {
	(): TasksRepository;
}

export const newTasksRepository = context.combine(
	context.key<LocalStorageDataSource>()('localStorageDataSource'),
	(ls): NewTasksRepository => () => ({
		getAllTasks: () =>
			newStream((sink, scheduler) => {
				const value = ls.get(STORAGE_KEY, codec);
				const propagate = () => asap(propagateEventTask(remoteData.of(value.get() ?? []), sink), scheduler);
				let d: Disposable = propagate();
				const subscription = value.subscribe({
					next: () => {
						d?.dispose();
						d = propagate();
					},
				});
				return {
					dispose() {
						d?.dispose();
						subscription.unsubscribe();
					},
				};
			}),
		addTask: task => {
			const current = ls.get(STORAGE_KEY, codec).get() ?? [];
			const newValue = [task, ...current];
			ls.set(STORAGE_KEY, newValue, codec);
			return result.of(task);
		},
		deleteTask: id => {
			const current = ls.get(STORAGE_KEY, codec).get();
			if (current) {
				const newValue = current.filter(task => task.id !== id);
				ls.set(STORAGE_KEY, newValue, codec);
			}
			return result.of(undefined);
		},
		checkTask: (id, value) => {
			const current = ls.get(STORAGE_KEY, codec).get();
			if (current) {
				const newValue = current.map(task => (task.id === id ? { ...task, isCompleted: value } : task));
				ls.set(STORAGE_KEY, newValue, codec);
			}
			return result.of(undefined);
		},
	}),
);

const codec: Type<TasksModel, unknown> = readonlyArray(
	strict({
		id: string,
		title: string,
		isCompleted: boolean,
	}),
);
