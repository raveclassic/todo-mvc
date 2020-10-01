import { Property } from 'frp-ts/lib/property';
import { context } from '../../../utils/context/context.utils';
import { atom } from '../../../utils/frp-ts/frp-ts.utils';
import { AppStore } from '../../store/app/app.store';

export interface TaskViewModel {
	readonly isInEditMode: Property<boolean>;
	readonly toggleEditMode: (value: boolean) => void;
	readonly check: (value: boolean) => void;
	readonly destroy: () => void;
}

export interface NewTaskViewModel {
	(id: string): TaskViewModel;
}

export const newTaskViewModel = context.combine(
	atom.new,
	context.key<AppStore>()('appStore'),
	(newAtom, appStore): NewTaskViewModel => id => {
		const isInEditMode = newAtom(false);
		const check = (value: boolean) => appStore.checkTask(id, value);
		const destroy = () => appStore.deleteTask(id);
		return {
			isInEditMode,
			toggleEditMode: isInEditMode.set,
			check,
			destroy,
		};
	},
);
