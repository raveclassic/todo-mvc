import { ContextEnvType } from '../../../utils/context/context.utils';
import { HeaderViewModel, newHeaderViewModel } from './header.view-model';
import { pipe } from 'fp-ts/function';
import { APP_STORE_MOCK } from '../../store/app/app.store.mock';
import { unsafeRunValueWithEffect } from '../../../utils/test/test.utils';
import { newCounterClock } from 'frp-ts/lib/clock';
import { AppStore } from '../../store/app/app.store';

const testVM = (e: Partial<ContextEnvType<typeof newHeaderViewModel>> = {}): HeaderViewModel =>
	pipe(
		newHeaderViewModel({ appStore: APP_STORE_MOCK, clock: newCounterClock(), ...e }),
		unsafeRunValueWithEffect(),
		f => f(),
	);

describe('header.view-model', () => {
	describe('newHeaderViewModel', () => {
		it('should init with empty state', () => {
			const vm = testVM();
			expect(vm.value.get()).toEqual('');
		});
	});
	describe('setValue', () => {
		it('should store value locally', () => {
			const appStore: AppStore = {
				...APP_STORE_MOCK,
				addTask: jest.fn(APP_STORE_MOCK.addTask),
			};
			const vm = testVM({ appStore });
			vm.setValue('foo');
			expect(vm.value.get()).toEqual('foo');
			expect(appStore.addTask).toHaveBeenCalledTimes(0);
		});
	});
	describe('commit', () => {
		it('should send stored value to store', () => {
			const appStore: AppStore = {
				...APP_STORE_MOCK,
				addTask: jest.fn(APP_STORE_MOCK.addTask),
			};
			const vm = testVM({ appStore });
			vm.setValue('foo');
			expect(vm.value.get()).toEqual('foo');
			expect(appStore.addTask).toHaveBeenCalledTimes(0);
			vm.commit();
			expect(appStore.addTask).toHaveBeenLastCalledWith('foo');
		});
	});
});
