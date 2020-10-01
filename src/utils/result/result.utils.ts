import { Stream } from '@most/types';
import { monadStream } from '../most/most.utils';
import { pipeable } from 'fp-ts/lib/pipeable';
import { Monad1 } from 'fp-ts/Monad';
import { RemoteData } from '@devexperts/remote-data-ts';
import { getRemoteDataM } from '@devexperts/remote-data-ts/dist/remote-data-t';

export type Result<A> = Stream<RemoteData<Error, A>>;

declare module 'fp-ts/lib/HKT' {
	interface URItoKind<A> {
		Result: Result<A>;
	}
}

export const monadResult: Monad1<'Result'> = {
	...getRemoteDataM(monadStream),
	URI: 'Result',
};

export const result = {
	...monadResult,
	...pipeable(monadResult),
};
