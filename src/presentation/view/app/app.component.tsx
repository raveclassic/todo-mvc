import React, { memo } from 'react';
import { Theme } from '../theme/theme.component';
import { AppStyled } from './app.styled';
import { context } from '../../../utils/context/context.utils';
import { HeaderContainer } from '../header/header.container';
import { FooterContainer } from '../footer/footer.container';
import { TasksContainer } from '../tasks/tasks.container';

export const App = context.combine(
	HeaderContainer,
	FooterContainer,
	TasksContainer,
	(HeaderContainer, FooterContainer, TasksContainer) =>
		memo(() => {
			return (
				<Theme>
					<AppStyled>
						<HeaderContainer />
						<TasksContainer />
						<FooterContainer />
					</AppStyled>
				</Theme>
			);
		}),
);
