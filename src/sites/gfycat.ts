import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Gfycat',
		type: RetrieverCheckType.HTML,
		errorValue: 'Page not found',
		url: 'https://gfycat.com/@%s'
	}
];
