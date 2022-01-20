import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'GitHub',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://github.com/%s'
	}
];
