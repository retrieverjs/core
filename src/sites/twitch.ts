import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Twitch',
		type: RetrieverCheckType.HTML,
		errorValue: 'Sorry, that page is in another castle!',
		url: 'https://twitch.tv/%s',
		probeURL: 'https://m.twitch.tv/%s',
	}
];
