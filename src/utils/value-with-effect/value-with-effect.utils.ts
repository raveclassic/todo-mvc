import { Stream } from '@most/types';
import { pipe } from 'fp-ts/function';
import { mergeArray, multicast } from '@most/core/dist';

export interface ValueWithEffect<A> {
	readonly value: A;
	readonly effects: Stream<unknown>;
}

const newValueWithEffect = <A>(value: A, ...effects: readonly Stream<unknown>[]): ValueWithEffect<A> => ({
	value,
	effects: pipe(effects, mergeArray, multicast),
});

export const valueWithEffect = {
	new: newValueWithEffect,
};
