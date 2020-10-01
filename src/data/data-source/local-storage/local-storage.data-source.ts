import { Decoder, Encoder } from 'io-ts';
import { context } from '../../../utils/context/context.utils';
import { WindowLikeModel } from '../../model/window-like/window-like.model';
import { either } from 'fp-ts';
import { Property } from 'frp-ts/lib/property';
import { Clock } from '@most/types';

export interface LocalStorageDataSource {
	readonly get: <A>(key: string, codec: Decoder<unknown, A>) => Property<A | undefined>;
	readonly set: <A>(key: string, value: A, codec: Encoder<A, unknown>) => void;
}

export interface NewLocalStorageDataSource {
	(): LocalStorageDataSource;
}

export const newLocalStorageDataSource = context.combine(
	context.key<WindowLikeModel>()('windowLike'),
	context.key<Clock>()('clock'),
	(window, clock): NewLocalStorageDataSource => () => {
		return {
			get: (key, codec) => ({
				get: () => {
					const item = window.localStorage.getItem(key);
					if (item !== null) {
						try {
							const parsed = JSON.parse(item);
							const decoded = codec.decode(parsed);
							if (either.isRight(decoded)) {
								return decoded.right;
							}
						} catch {
							return;
						}
					}
				},
				subscribe: observer => {
					const handler = (e: StorageEvent) => {
						if (e.key === key) {
							observer.next(clock.now());
						}
					};
					window.addEventListener('storage', handler);
					return {
						unsubscribe() {
							window.removeEventListener('storage', handler);
						},
					};
				},
			}),
			set: (key, value, codec) => {
				const encoded = codec.encode(value);
				try {
					window.localStorage.setItem(key, JSON.stringify(encoded));
				} catch {
					return;
				}
			},
		};
	},
);
