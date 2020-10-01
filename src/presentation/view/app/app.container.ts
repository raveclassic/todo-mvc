import { context } from '../../../utils/context/context.utils';
import { App } from './app.component';
import { createElement, memo, useMemo } from 'react';
import { useValueWithEffect } from '../../hook/use-value-with-effect';
import { newAppStore } from '../../store/app/app.store';
import { TasksModel } from '../../../domain/model/tasks/tasks.model';

export interface AppContainerProps {
	readonly initialModel: TasksModel;
}

export const AppContainer = context.combine(
	context.defer(App, 'appStore'),
	newAppStore,
	useValueWithEffect,
	(getApp, newAppStore, useValueWithEffect) =>
		memo((props: AppContainerProps) => {
			const { initialModel } = props;
			const appStore = useValueWithEffect(useMemo(() => newAppStore(initialModel), [initialModel]));
			const App = useValueWithEffect(useMemo(() => getApp({ appStore }), [appStore]));
			return createElement(App, {});
		}),
);
