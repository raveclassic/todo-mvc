import styled from 'styled-components';

export const MainStyled = styled.section`
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
`;

export const ToggleAllLabelStyled = styled.label`
	width: 60px;
	height: 34px;
	font-size: 0;
	position: absolute;
	top: -52px;
	left: -13px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);

	&:before {
		content: '❯';
		font-size: 22px;
		color: #e6e6e6;
		padding: 10px 27px 10px 27px;
	}
`;

export const ToggleAllStyled = styled.input.attrs({ type: 'checkbox' })`
	width: 1px;
	height: 1px;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
	right: 100%;
	bottom: 100%;

	&:checked {
		${ToggleAllLabelStyled} {
			color: #737373;
		}
	}
`;
