import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'TikTok',
		type: RetrieverCheckType.HTTP,
		checkOnMobile: true,
		errorValue: 404,
		url: 'https://www.tiktok.com/@%s'
	}
];
