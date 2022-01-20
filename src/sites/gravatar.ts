import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Gravatar',
		type: RetrieverCheckType.HTML,
		errorValue: 'we couldn\'t find that profile',
		url: 'http://gravatar.com/%s',
		probeURL: 'http://en.gravatar.com/%s'
	}
];
