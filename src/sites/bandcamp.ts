import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Bandcamp',
		type: RetrieverCheckType.HTTP,
		errorValue: 303,
		url: 'https://%s.bandcamp.com'
	}
];
