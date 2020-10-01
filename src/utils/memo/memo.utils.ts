export const memoOnce = <Args extends readonly unknown[], R>(f: (...args: Args) => R): ((...args: Args) => R) => {
	let hasValue = false;
	let cachedR: R;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any,no-restricted-syntax
	let cachedArgs: Args = [] as any;
	const update = (args: Args): void => {
		cachedR = f(...args);
		hasValue = true;
		cachedArgs = args;
	};
	return (...args: Args): R => {
		const length = args.length;
		if (hasValue && length === 0) {
			return cachedR;
		}
		if (!hasValue || cachedArgs.length !== length) {
			update(args);
			return cachedR;
		}
		for (let i = 0; i < length; i++) {
			if (cachedArgs[i] !== args[i]) {
				update(args);
				return cachedR;
			}
		}
		return cachedR;
	};
};
