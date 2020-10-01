import React, { memo } from 'react';
import {
	ClearCompletedStyled,
	FiltersStyled,
	FilterStyled,
	FooterStyled,
	TodoCountStyled,
	TodoCountValueStyled,
} from './footer.styled';
import { context } from '../../../utils/context/context.utils';
import { LinkContainer } from '../link/link.container';

export interface FooterProps {
	readonly activeCount: number;
	readonly completedCount: number;
}

export const Footer = context.combine(LinkContainer, LinkContainer =>
	memo((props: FooterProps) => {
		const { completedCount, activeCount } = props;
		return (
			<FooterStyled>
				<TodoCountStyled>
					<TodoCountValueStyled>{activeCount}</TodoCountValueStyled> item{activeCount !== 1 ? 's' : ''}
				</TodoCountStyled>
				<FiltersStyled>
					<FilterStyled>
						<LinkContainer path={'/'} label={'All'} />
					</FilterStyled>
					<FilterStyled>
						<LinkContainer path={'/active'} label={'Active'} />
					</FilterStyled>
					<FilterStyled>
						<LinkContainer path={'/completed'} label={'Completed'} />
					</FilterStyled>
				</FiltersStyled>
				{completedCount > 0 && <ClearCompletedStyled>Clear completed</ClearCompletedStyled>}
			</FooterStyled>
		);
	}),
);
