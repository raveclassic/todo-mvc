import { context } from '../../../utils/context/context.utils';
import { AppStore } from '../../store/app/app.store';
import { Property } from 'frp-ts/lib/property';
import { TasksModel } from '../../../domain/model/tasks/tasks.model';

export interface TasksViewModel {
	readonly tasks: Property<TasksModel>;
}

export interface NewTasksViewModel {
	(): TasksViewModel;
}

export const newTasksViewModel = context.combine(
	context.key<AppStore>()('appStore'),
	(appStore): NewTasksViewModel => () => appStore,
);
