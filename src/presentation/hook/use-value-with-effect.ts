import { ValueWithEffect } from '../../utils/value-with-effect/value-with-effect.utils';
import { context } from '../../utils/context/context.utils';
import { Disposable, Scheduler, Sink, Time } from '@most/types';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { constVoid } from 'fp-ts/function';

const voidSink: Sink<void> = {
	error: (time: Time, error: Error) => {
		console.error(error);
	},
	end: constVoid,
	event: constVoid,
};

export const useValueWithEffect = context.combine(
	context.key<Scheduler>()('scheduler'),
	scheduler => <A>(fa: ValueWithEffect<A>): A => {
		const disposableRef = useRef<Disposable>();
		useMemo(() => {
			disposableRef.current?.dispose();
			disposableRef.current = fa.effects.run(voidSink, scheduler);
		}, [fa]);
		useLayoutEffect(() => () => disposableRef.current?.dispose(), []);
		return fa.value;
	},
);
