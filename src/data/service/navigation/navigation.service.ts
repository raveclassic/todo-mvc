import { context } from '../../../utils/context/context.utils';
import { HistoryDataSource } from '../../data-source/history/history.data-source';
import { NavigationService } from '../../../domain/service/navigation/navigation.service';
import { Clock } from 'frp-ts/lib/clock';

export const navigationService = context.combine(
	context.key<HistoryDataSource>()('historyDataSource'),
	context.key<Clock>()('clock'),
	(history, clock): NavigationService => ({
		location: {
			get: () => {
				return history.location;
			},
			subscribe: observer => {
				const unsubscribe = history.listen(() => {
					observer.next(clock.now());
				});
				return {
					unsubscribe,
				};
			},
		},
	}),
);
