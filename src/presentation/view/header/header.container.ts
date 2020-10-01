import { context } from '../../../utils/context/context.utils';
import { newHeaderViewModel } from './header.view-model';
import { createElement, memo, useMemo } from 'react';
import { Header } from './header.component';
import { useProperty } from '../../hook/use-property.hook';

export const HeaderContainer = context.combine(newHeaderViewModel, newHeaderViewModel =>
	memo(() => {
		const vm = useMemo(() => newHeaderViewModel(), []);
		const value = useProperty(vm.value);
		return createElement(Header, {
			value,
			onValueChange: vm.setValue,
			onCommit: vm.commit,
		});
	}),
);
