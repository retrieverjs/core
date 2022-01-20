import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Medium',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://medium.com/@%s'
	}
];
