import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Giphy',
		type: RetrieverCheckType.HTML,
		errorValue: '<title>404 Not Found</title>',
		url: 'https://giphy.com/channel/%s'
	}
];
