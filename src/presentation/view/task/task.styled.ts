import styled from 'styled-components';
import { TextInputStyled } from '../text-input/text-input.styled';

export const ViewStyled = styled.div``;

export const ToggleLabelStyled = styled.label`
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: center left;

	word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
	font-weight: 400;
	color: #4d4d4d;
`;

export const ToggleStyled = styled.input.attrs({ type: 'checkbox' })`
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
	opacity: 0;

	@media screen and (-webkit-min-device-pixel-ratio: 0) {
		background: none;
		height: 40px;
	}

	&:checked {
		${ToggleLabelStyled} {
			background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
		}
	}
`;

export const DestroyStyled = styled.button.attrs({ type: 'button' })`
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;

	&:after {
		content: '×';
	}

	&:hover {
		color: #af5b5e;
	}
`;

export const EditStyled = styled(TextInputStyled)`
	display: none;
`;

export interface TaskStyledProps {
	readonly isInEditMode: boolean;
	readonly isCompleted: boolean;
}

export const TaskStyled = styled.li<TaskStyledProps>`
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;

	&:last-child {
		${props => props.isInEditMode && `margin-bottom: -1px;`}
	}

	${props =>
		props.isInEditMode &&
		`
		border-bottom: none;
		padding: 0;
		${ViewStyled} {
			display: none;
		}
		${EditStyled} {
			display: block;
			width: calc(100% - 43px);
			padding: 12px 16px;
			margin: 0 0 0 43px;
		}
	`}

	${props =>
		props.isCompleted &&
		`
		${ToggleLabelStyled} {
			color: #cdcdcd;
			text-decoration: line-through;
		}
	`}

	&:hover {
		${DestroyStyled} {
			display: block;
		}
	}
`;
