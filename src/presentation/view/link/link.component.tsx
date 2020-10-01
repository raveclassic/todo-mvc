import React, { memo } from 'react';
import { LinkStyled } from './link.styled';

export interface LinkProps {
	readonly label: string;
	readonly path: string;
	readonly isActive: boolean;
}

export const Link = memo((props: LinkProps) => {
	const { label, isActive, path } = props;
	return (
		<LinkStyled isActive={isActive} href={`#${path}`}>
			{label}
		</LinkStyled>
	);
});
