import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { valueWithEffect, ValueWithEffect } from '../value-with-effect/value-with-effect.utils';
import { Reader } from 'fp-ts/Reader';
import { memoOnce } from '../memo/memo.utils';

export interface Context<E, A> extends Reader<E, ValueWithEffect<A>> {}

export interface ProjectMany<A, R> {
	(...args: A[]): R;
}

function combine<E, A, R>(a: Context<E, A>, project: (a: A) => R): Context<E, R>;
function combine<EA, A, EB, B, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	project: (a: A, b: B) => R,
): Context<{ [P in keyof (EA & EB)]: (EA & EB)[P] }, R>;
function combine<EA, A, EB, B, EC, C, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	C: Context<EC, C>,
	project: (a: A, b: B, c: C) => R,
): Context<{ [P in keyof (EA & EB & EC)]: (EA & EB & EC)[P] }, R>;
function combine<EA, A, EB, B, EC, C, ED, D, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	project: (a: A, b: B, c: C, d: D) => R,
): Context<{ [P in keyof (EA & EB & EC & ED)]: (EA & EB & EC & ED)[P] }, R>;
function combine<EA, A, EB, B, EC, C, ED, D, EE, E, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	e: Context<EE, E>,
	project: (a: A, b: B, c: C, d: D, e: E) => R,
): Context<{ [P in keyof (EA & EB & EC & ED & EE)]: (EA & EB & EC & ED & EE)[P] }, R>;
function combine<EA, A, EB, B, EC, C, ED, D, EE, E, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	e: Context<EE, E>,
	project: (a: A, b: B, c: C, d: D, e: E) => R,
): Context<{ [P in keyof (EA & EB & EC & ED & EE)]: (EA & EB & EC & ED & EE)[P] }, R>;
function combine<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	e: Context<EE, E>,
	g: Context<EG, G>,
	project: (a: A, b: B, c: C, d: D, e: E, g: G) => R,
): Context<{ [P in keyof (EA & EB & EC & ED & EE & EG)]: (EA & EB & EC & ED & EE & EG)[P] }, R>;
function combine<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	e: Context<EE, E>,
	g: Context<EG, G>,
	h: Context<EH, H>,
	project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H) => R,
): Context<{ [P in keyof (EA & EB & EC & ED & EE & EG & EH)]: (EA & EB & EC & ED & EE & EG & EH)[P] }, R>;
function combine<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	e: Context<EE, E>,
	g: Context<EG, G>,
	h: Context<EH, H>,
	i: Context<EI, I>,
	project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I) => R,
): Context<{ [P in keyof (EA & EB & EC & ED & EE & EG & EH & EI)]: (EA & EB & EC & ED & EE & EG & EH & EI)[P] }, R>;
function combine<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	e: Context<EE, E>,
	g: Context<EG, G>,
	h: Context<EH, H>,
	i: Context<EI, I>,
	j: Context<EJ, J>,
	project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J) => R,
): Context<
	{ [P in keyof (EA & EB & EC & ED & EE & EG & EH & EI & EJ)]: (EA & EB & EC & ED & EE & EG & EH & EI & EJ)[P] },
	R
>;
function combine<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	e: Context<EE, E>,
	g: Context<EG, G>,
	h: Context<EH, H>,
	i: Context<EI, I>,
	j: Context<EJ, J>,
	k: Context<EK, K>,
	project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K) => R,
): Context<
	{
		[P in keyof (EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK)]: (EA &
			EB &
			EC &
			ED &
			EE &
			EG &
			EH &
			EI &
			EJ &
			EK)[P];
	},
	R
>;
function combine<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, R>(
	a: Context<EA, A>,
	b: Context<EB, B>,
	c: Context<EC, C>,
	d: Context<ED, D>,
	e: Context<EE, E>,
	g: Context<EG, G>,
	h: Context<EH, H>,
	i: Context<EI, I>,
	j: Context<EJ, J>,
	k: Context<EK, K>,
	l: Context<EL, L>,
	project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L) => R,
): Context<
	{
		[P in keyof (EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL)]: (EA &
			EB &
			EC &
			ED &
			EE &
			EG &
			EH &
			EI &
			EJ &
			EK &
			EL)[P];
	},
	R
>;
function combine<E, A, R>(...args: NonEmptyArray<Context<E, A> | ProjectMany<A, R>>): Context<E, R> {
	const last = args.length - 1;
	// eslint-disable-next-line no-restricted-syntax
	const fas = args.slice(0, last) as Context<E, A>[];
	// eslint-disable-next-line no-restricted-syntax
	const project = memoOnce(args[last] as ProjectMany<A, R>);
	return e => {
		const as = fas.map(c => c(e));
		return valueWithEffect.new(project(...as.map(a => a.value)), ...as.map(a => a.effects));
	};
}

const key = <A>() => <K extends PropertyKey>(key: K): Context<{ [P in K]: A }, A> => e => valueWithEffect.new(e[key]);

const defer = <E extends object, A, K extends keyof E>(
	fa: Context<E, A>,
	...keys: K[]
): Context<Omit<E, K>, Context<Pick<E, K>, A>> => outerE =>
	// eslint-disable-next-line no-restricted-syntax
	valueWithEffect.new(innerE => fa(Object.assign({}, outerE, innerE) as E));

export const context = {
	combine,
	key,
	defer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContextEnvType<C extends Context<any, unknown>> = C extends Context<infer E, unknown> ? E : never;
