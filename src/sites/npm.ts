import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'npm',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://www.npmjs.com/~%s'
	}
];
