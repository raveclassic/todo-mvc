import { TasksModel } from '../../../domain/model/tasks/tasks.model';
import { context } from '../../../utils/context/context.utils';
import { TasksService } from '../../../domain/service/tasks/tasks.service';
import { pipe } from 'fp-ts/function';
import { take, tap } from '@most/core/dist';
import { Property } from 'frp-ts/lib/property';
import { valueWithEffect, ValueWithEffect } from '../../../utils/value-with-effect/value-with-effect.utils';
import { atom } from '../../../utils/frp-ts/frp-ts.utils';
import { pending, RemoteData } from '@devexperts/remote-data-ts';

export interface BootstrapViewModel {
	readonly initialModel: Property<RemoteData<Error, TasksModel>>;
}

export interface NewBootstrapViewModel {
	(): ValueWithEffect<BootstrapViewModel>;
}

export const newBootstrapViewModel = context.combine(
	context.key<TasksService>()('tasksService'),
	atom.new,
	(tasksService, newAtom): NewBootstrapViewModel => () => {
		const initialModel = newAtom<RemoteData<Error, TasksModel>>(pending);
		const fetchEffect = pipe(tasksService.getAllTasks(), take(1), tap(initialModel.set));
		return valueWithEffect.new(
			{
				initialModel,
			},
			fetchEffect,
		);
	},
);
