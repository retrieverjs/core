import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Telegram',
		type: RetrieverCheckType.HTML,
		errorValue: '<meta property="og:description" content="">',
		url: 'https://t.me/%s'
	}
];
