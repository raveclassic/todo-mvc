import React, { memo } from 'react';
import { context } from '../../../utils/context/context.utils';
import { AppContainer } from '../app/app.container';
import { TasksModel } from '../../../domain/model/tasks/tasks.model';
import { RemoteData, fold } from '@devexperts/remote-data-ts';
import { constNull, pipe } from 'fp-ts/function';

export interface BootstrapProps {
	readonly initialModel: RemoteData<unknown, TasksModel>;
}

export const Bootstrap = context.combine(AppContainer, AppContainer =>
	memo((props: BootstrapProps) => {
		const { initialModel } = props;
		return pipe(
			initialModel,
			fold(
				constNull,
				() => <>Loading</>,
				e => {
					console.warn(e);
					return <>Failure</>;
				},
				initialModel => <AppContainer initialModel={initialModel} />,
			),
		);
	}),
);
