import { Scheduler } from '@most/types';
import { newDefaultScheduler } from '@most/scheduler';
import { ValueWithEffect } from '../value-with-effect/value-with-effect.utils';
import { runEffects } from '@most/core/dist';

export const unsafeRunValueWithEffect = (scheduler: Scheduler = newDefaultScheduler()) => <A>(
	fa: ValueWithEffect<A>,
): A => {
	void runEffects(fa.effects, scheduler);
	return fa.value;
};
