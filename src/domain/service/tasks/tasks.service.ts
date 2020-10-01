import { TaskModel } from '../../model/task/task.model';
import { Result } from '../../../utils/result/result.utils';
import { TasksModel } from '../../model/tasks/tasks.model';
import { context } from '../../../utils/context/context.utils';
import { TasksRepository } from '../../repository/tasks/tasks.repository';
import { uuid } from '../../../utils/string/string.utils';

export interface TasksService {
	readonly getAllTasks: () => Result<TasksModel>;
	readonly checkTask: (id: string, value: boolean) => Result<void>;
	readonly createTask: (title: string) => Result<TaskModel>;
	readonly deleteTask: (id: string) => Result<void>;
}

export const tasksService = context.combine(
	context.key<TasksRepository>()('tasksRepository'),
	(tasksRepository): TasksService => {
		return {
			checkTask: tasksRepository.checkTask,
			getAllTasks: tasksRepository.getAllTasks,
			createTask: title =>
				tasksRepository.addTask({
					id: uuid(),
					isCompleted: false,
					title,
				}),
			deleteTask: tasksRepository.deleteTask,
		};
	},
);
