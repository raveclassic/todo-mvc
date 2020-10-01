import { Property } from 'frp-ts/lib/property';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Subscription } from 'frp-ts/lib/observable';

export const useProperty = <A>(fa: Property<A>): A => {
	const [a, setA] = useState(fa.get());
	const subscription = useRef<Subscription>();
	useMemo(() => {
		subscription.current?.unsubscribe();
		subscription.current = fa.subscribe({
			next() {
				setA(fa.get());
			},
		});
	}, [fa]);
	useLayoutEffect(() => () => subscription.current?.unsubscribe(), []);
	return a;
};
