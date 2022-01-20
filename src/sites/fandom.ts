import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Fandom',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://fandom.com/u/%s'
	}
];
