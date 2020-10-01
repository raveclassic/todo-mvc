import { Property } from 'frp-ts/lib/property';
import { context } from '../../../utils/context/context.utils';
import { AppStore } from '../../store/app/app.store';
import { atom } from '../../../utils/frp-ts/frp-ts.utils';

export interface HeaderViewModel {
	readonly value: Property<string>;
	readonly setValue: (value: string) => void;
	readonly commit: () => void;
}

export interface NewHeaderViewModel {
	(): HeaderViewModel;
}

export const newHeaderViewModel = context.combine(
	context.key<AppStore>()('appStore'),
	atom.new,
	(appStore, newAtom): NewHeaderViewModel => () => {
		const value = newAtom('');
		return {
			value,
			setValue: value.set,
			commit() {
				appStore.addTask(value.get());
				value.set('');
			},
		};
	},
);
