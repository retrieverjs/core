import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'MyAnimeList',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://myanimelist.net/profile/@%s'
	}
];
