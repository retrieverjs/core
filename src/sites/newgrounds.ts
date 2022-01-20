import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Newgrounds',
		type: RetrieverCheckType.HTML,
		errorValue: 'No user',
		url: 'https://%s.newgrounds.com'
	}
];
