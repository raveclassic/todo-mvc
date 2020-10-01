import { AppStore } from './app.store';
import { constVoid } from 'fp-ts/function';

export const APP_STORE_MOCK: AppStore = {
	addTask: constVoid,
};
