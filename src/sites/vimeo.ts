import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Vimeo',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://vimeo.com/%s',
	}
];
