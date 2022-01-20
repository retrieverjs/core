import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Tumblr',
		type: RetrieverCheckType.HTML,
		errorValue: 'There\'s nothing here.',
		url: 'https://%s.tumblr.com'
	}
];
