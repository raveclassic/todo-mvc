import { Property } from 'frp-ts/lib/property';
import { context } from '../../../utils/context/context.utils';
import { NavigationService } from '../../../domain/service/navigation/navigation.service';
import { pipe } from 'fp-ts/function';
import { property } from 'frp-ts';

export interface LinkViewModel {
	readonly isActive: Property<boolean>;
}

export interface NewLinkViewModel {
	(path: string): LinkViewModel;
}

export const newLinkViewModel = context.combine(
	context.key<NavigationService>()('navigationService'),
	(navigationService): NewLinkViewModel => path => {
		const isActive = pipe(
			navigationService.location,
			property.map(location => location.pathname === path),
		);
		return {
			isActive,
		};
	},
);
