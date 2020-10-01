import { property } from 'frp-ts';
import { Property } from 'frp-ts/lib/property';
import { context } from '../../../utils/context/context.utils';
import { AppStore } from '../../store/app/app.store';
import { pipe } from 'fp-ts/function';

export interface FooterViewModel {
	readonly activeCount: Property<number>;
	readonly completedCount: Property<number>;
}

export interface NewFooterViewModel {
	(): FooterViewModel;
}

export const newFooterViewModel = context.combine(
	context.key<AppStore>()('appStore'),
	(appStore): NewFooterViewModel => () => {
		const activeCount = pipe(
			appStore.tasks,
			property.map(tasks => tasks.filter(task => !task.isCompleted).length),
		);
		const completedCount = pipe(
			property.sequenceT(activeCount, appStore.tasks),
			property.map(([activeCount, tasks]) => tasks.length - activeCount),
		);
		return {
			activeCount,
			completedCount,
		};
	},
);
