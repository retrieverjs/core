import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'SoundCloud',
		type: RetrieverCheckType.HTTP,
		errorValue: 404,
		url: 'https://soundcloud.com/%s'
	}
];
