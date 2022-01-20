import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Wikipedia',
		type: RetrieverCheckType.HTML,
		errorValue: 'is not registered on this wiki.',
		url: 'https://en.wikipedia.org/wiki/User:%s',
	}
];
