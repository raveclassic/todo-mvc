import { TasksModel } from '../../model/tasks/tasks.model';
import { TaskModel } from '../../model/task/task.model';
import { Result } from '../../../utils/result/result.utils';

export interface TasksRepository {
	readonly getAllTasks: () => Result<TasksModel>;
	readonly checkTask: (id: string, value: boolean) => Result<void>;
	readonly addTask: (task: TaskModel) => Result<TaskModel>;
	readonly deleteTask: (id: string) => Result<void>;
}
