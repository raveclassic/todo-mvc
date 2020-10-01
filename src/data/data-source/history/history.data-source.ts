import { History, createHashHistory } from 'history';

export interface HistoryDataSource extends History {}

export interface NewHistoryDataSource {
	(): HistoryDataSource;
}

export const newHistoryDataSource: NewHistoryDataSource = createHashHistory;
