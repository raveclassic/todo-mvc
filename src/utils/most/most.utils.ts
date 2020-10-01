import { Stream } from '@most/types';
import { createAdapter } from '@most/adapter';
import { Monad1 } from 'fp-ts/Monad';
import * as core from '@most/core/dist';
import { pipeable } from 'fp-ts/lib/pipeable';

declare module 'fp-ts/lib/HKT' {
	interface URItoKind<A> {
		Stream: Stream<A>;
	}
}

export const createEffect = <A>(
	handleEvents: (event: Stream<A>) => Stream<unknown>,
): [(a: A) => void, Stream<unknown>] => {
	const [next, local] = createAdapter<A>();
	return [next, handleEvents(local)];
};

export const monadStream: Monad1<'Stream'> = {
	URI: 'Stream',
	map: (fa, f) => core.map(f, fa),
	ap: core.ap,
	of: core.now,
	chain: (fa, f) => core.chain(f, fa),
};

export const stream = {
	...monadStream,
	...pipeable(monadStream),
};
