import { Link, LinkProps } from './link.component';
import { context } from '../../../utils/context/context.utils';
import { newLinkViewModel } from './link.view-model';
import { createElement, memo, useMemo } from 'react';
import { useProperty } from '../../hook/use-property.hook';

export interface LinkContainerProps extends Omit<LinkProps, 'isActive'> {}

export const LinkContainer = context.combine(newLinkViewModel, newLinkViewModel =>
	memo((props: LinkContainerProps) => {
		const { path, label } = props;
		const vm = useMemo(() => newLinkViewModel(path), [path]);
		const isActive = useProperty(vm.isActive);
		return createElement(Link, {
			isActive,
			path,
			label,
		});
	}),
);
