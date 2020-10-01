import styled from 'styled-components';

export const FooterStyled = styled.footer`
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	font-size: 15px;
	border-top: 1px solid #e6e6e6;

	&:before {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 50px;
		overflow: hidden;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2),
			0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 430px) {
		height: 50px;
	}
`;

export const TodoCountStyled = styled.span`
	float: left;
	text-align: left;
`;

export const TodoCountValueStyled = styled.strong`
	font-weight: 300;
`;

export const FiltersStyled = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
	left: 0;

	@media (max-width: 430px) {
		bottom: 10px;
	}
`;

export const FilterStyled = styled.li`
	display: inline;
`;

export const ClearCompletedStyled = styled.button.attrs({ type: 'button' })`
	&,
	&:active {
		float: right;
		position: relative;
		line-height: 20px;
		text-decoration: none;
		cursor: pointer;
	}

	&:hover {
		text-decoration: underline;
	}
`;
