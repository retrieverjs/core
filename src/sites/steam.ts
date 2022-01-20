import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'Steam Profile',
		type: RetrieverCheckType.HTML,
		errorValue: 'The specified profile could not be found.',
		url: 'https://steamcommunity.com/id/%s'
	},
	{
		name: 'Steam Group',
		type: RetrieverCheckType.HTML,
		errorValue: 'No group could be retrieved for the given URL.',
		url: 'https://steamcommunity.com/groups/%s'
	}
];
