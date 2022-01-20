import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Pastebin',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://pastebin.com/u/%s'
	}
];
