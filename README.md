<p align="center">
	<table>
		<tbody>
			<td align="center">
				<h1>@retrieverjs/core</h1>
				<p>Easy username availability checking</p>
				<p>
					<a href="https://www.npmjs.com/package/@retrieverjs/core"><img src="https://img.shields.io/npm/v/@retrieverjs/core?color=crimson&label=%40retrieverjs%2Fcore&logo=npm&style=flat-square"></a>
					<a href="https://www.npmjs.com/package/@retrieverjs/core"><img src="https://img.shields.io/npm/dt/@retrieverjs/core?color=crimson&logo=npm&style=flat-square"></a>
					<a href="https://www.npmjs.com/package/@retrieverjs/core"><img src="https://img.shields.io/librariesio/release/npm/@retrieverjs/core?color=crimson&logo=npm&style=flat-square"></a>
				</p>
				<p>
					<a href="https://github.com/retrieverjs/core/releases/latest"><img src="https://img.shields.io/github/release-date/retrieverjs/core.svg?label=Released&logo=github&style=flat-square"></a>
					<a href="https://github.com/retrieverjs/core/releases/latest"><img src="https://img.shields.io/github/release/retrieverjs/core.svg?label=Stable&logo=github&style=flat-square"></a>
					<a href="https://github.com/retrieverjs/core"><img src="https://img.shields.io/github/repo-size/retrieverjs/core.svg?label=Repo%20Size&logo=github&style=flat-square"></a>
					<a href="https://github.com/retrieverjs/core/releases/latest"><img src="https://img.shields.io/github/downloads/retrieverjs/core/latest/total.svg?label=Downloads&logo=github&style=flat-square"></a>
				</p>
				<p>
					<a href='https://ko-fi.com/O4O1DV77' target='_blank'><img height='36' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' alt='Buy Me a Coffee at ko-fi.com' /></a>
				</p>
				<img width="2000" height="0">
			</td>
		</tbody>
	</table>
</p>

# Installation

```sh
npm i @retrieverjs/core

# or

yarn add @retrieverjs/core
```

# Usage

```typescript
import { Retriever } from '@retrieverjs/core';

import type { IRetrieverResult } from '@retrieverjs/core';

const retriever = new Retriever();

retriever.on('results', (results: IRetrieverResult[]) => console.log(results));

// Check all sites
await retriever.checkUsernameAvailability('username');

// Or specific ones
await retriever.checkUsernameAvailability('username', ['deviantart', 'vimeo']);
```

# Other events

```typescript
retriever.on('started', (username: string) => console.log('Checking username', username));
retriever.on('siteCheckStarted', (url: string) => console.log('Started checking site', url));
retriever.on('siteCheckResults', (url: string, result: IRetrieverResult) => console.log('Got results from site:', results));
```

# Adding custom sites

```typescript
import { Retriever, RetrieverCheckType } from '@retrieverjs/core';

const myCustomSites = [
	{
		name: 'My Site',
		type: RetrieverCheckType.HTTP,
		followRedirects: false, // true by default
		checkOnMobile: false, // false by default
		minimumLength: 6, // 3 by default
		maximumLength: 36, // 36 by default
		errorValue: 404, // HTTP status code if type is RetrieverCheckType.HTTP or string if RetrieverCheckType.HTML
		url: 'https://my-site.dev/%s', // URL to check
		probeURL: 'https://my-site.dev/api/getUsername/%s', // An optional, alternative URL to check instead if url doesn't suffice
	}
];

const retriever = new Retriever(myCustomSites);

console.log(retriever.getSitesNames());
console.log(retriever.getSites());
```

# Current Supported Sites

- Bandcamp
- DeviantArt
- Fandom
- Gfycat
- Giphy
- GitHub
- Gravatar
- League of Legends (all regions)
- Medium
- MyAnimeList
- Newgrounds
- NPM
- Pastebin
- Patreon
- SoundCloud
- Steam profile and group
- Telegram short URL
- TikTok
- Tumblr
- Twitch
- Vimeo
- Wikipedia

More sites will be added over time. If one is missing then open an issue!
