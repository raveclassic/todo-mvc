import { context } from '../../../utils/context/context.utils';
import { Footer } from './footer.component';
import { createElement, memo } from 'react';
import { newFooterViewModel } from './footer.view-model';
import { useProperty } from '../../hook/use-property.hook';

export const FooterContainer = context.combine(Footer, newFooterViewModel, (Footer, newFooterViewModel) =>
	memo(() => {
		const vm = newFooterViewModel();
		const activeCount = useProperty(vm.activeCount);
		const completedCount = useProperty(vm.completedCount);
		return createElement(Footer, {
			activeCount,
			completedCount,
		});
	}),
);
