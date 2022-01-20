import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Patreon',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://patreon.com/%s'
	}
];
