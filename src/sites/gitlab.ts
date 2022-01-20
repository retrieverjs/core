import { RetrieverCheckType } from '../retriever';

export default [
	{
		name: 'GitLab',
		type: RetrieverCheckType.HTML,
		errorValue: '[]',
		url: 'https://gitlab.com/%s',
		probeURL: 'https://gitlab.com/api/v4/users?username=%s'
	}
];
