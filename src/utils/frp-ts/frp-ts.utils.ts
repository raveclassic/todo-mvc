import { context } from '../context/context.utils';
import { Clock } from 'frp-ts/lib/clock';
import { atom as frpTSAtom, emitter as frpTSEmitter } from 'frp-ts';

const env = context.combine(context.key<Clock>()('clock'), clock => ({ clock }));

export const atom = {
	...frpTSAtom,
	new: context.combine(env, frpTSAtom.newAtom),
};

export const emitter = {
	...frpTSEmitter,
	fromEvent: context.combine(env, frpTSEmitter.fromEvent),
	new: context.combine(env, frpTSEmitter.newEmitter),
};
