import styled from 'styled-components';

export interface LinkStyledProps {
	readonly isActive: boolean;
}

export const LinkStyled = styled.a<LinkStyledProps>`
	color: inherit;
	margin: 3px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 3px;

	&:hover {
		border-color: rgba(175, 47, 47, 0.1);
	}

	${props => props.isActive && `border-color: rgba(175, 47, 47, 0.2);`}
`;
