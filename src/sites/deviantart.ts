import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'DeviantArt',
		type: RetrieverCheckType.HTML,
		errorValue: 'Page Not Found',
		url: 'https://deviantart.com/%s'
	}
];
