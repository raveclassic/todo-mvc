import { Property } from 'frp-ts/lib/property';
import { LocationModel } from '../../model/location/location.model';

export interface NavigationService {
	readonly location: Property<LocationModel>;
}
