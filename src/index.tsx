import { render } from 'react-dom';
import React from 'react';
import { newCounterClock } from 'frp-ts/lib/clock';
import { newDefaultScheduler } from '@most/scheduler';
import { newLocalStorageDataSource } from './data/data-source/local-storage/local-storage.data-source';
import { unsafeRunValueWithEffect } from './utils/test/test.utils';
import { newTasksRepository } from './data/repository/tasks/tasks.repository';
import { tasksService } from './domain/service/tasks/tasks.service';
import { newHistoryDataSource } from './data/data-source/history/history.data-source';
import { navigationService } from './data/service/navigation/navigation.service';
import { BootstrapContainer } from './presentation/view/bootstrap/bootstrap.container';

const root = document.getElementById('root');
if (root !== null) {
	const clock = newCounterClock();
	const scheduler = newDefaultScheduler();
	const run = unsafeRunValueWithEffect(scheduler);
	const localStorageDataSource = run(newLocalStorageDataSource({ windowLike: window, clock }))();
	const tasksRepository = run(newTasksRepository({ localStorageDataSource }))();
	const historyDataSource = newHistoryDataSource();
	const Resolved = run(
		BootstrapContainer({
			clock,
			scheduler,
			tasksService: run(tasksService({ tasksRepository })),
			navigationService: run(navigationService({ clock, historyDataSource })),
		}),
	);
	render(<Resolved />, root);
}
