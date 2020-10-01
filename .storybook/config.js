import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const req = require.context('../src', true, /\.story.tsx/);
function loadStories() {
	req.keys().forEach(filename => req(filename));
}

addParameters({
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
});

addDecorator(withKnobs);
configure(loadStories, module);
