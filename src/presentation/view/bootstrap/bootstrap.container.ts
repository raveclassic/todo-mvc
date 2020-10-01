import { context } from '../../../utils/context/context.utils';
import { Bootstrap } from './bootstrap.component';
import { createElement, memo, useMemo } from 'react';
import { newBootstrapViewModel } from './bootstrap.view-model';
import { useValueWithEffect } from '../../hook/use-value-with-effect';
import { useProperty } from '../../hook/use-property.hook';

export const BootstrapContainer = context.combine(
	Bootstrap,
	newBootstrapViewModel,
	useValueWithEffect,
	(Bootstrap, newBootstrapViewModel, useValueWithEffect) =>
		memo(() => {
			const vm = useValueWithEffect(useMemo(() => newBootstrapViewModel(), []));
			const initialModel = useProperty(vm.initialModel);
			return createElement(Bootstrap, {
				initialModel,
			});
		}),
);
