import axios from 'axios';
import { format } from 'node:util';
import EventEmitter from 'node:events';
import { USER_AGENT, USER_AGENT_MOBILE } from './constants';

import npm from './sites/npm';
import giphy from './sites/giphy';
import steam from './sites/steam';
import vimeo from './sites/vimeo';
import fandom from './sites/fandom';
import gfycat from './sites/gfycat';
import github from './sites/github';
import gitlab from './sites/gitlab';
import medium from './sites/medium';
import tiktok from './sites/tiktok';
import tumblr from './sites/tumblr';
import twitch from './sites/twitch';
import patreon from './sites/patreon';
import bandcamp from './sites/bandcamp';
import gravatar from './sites/gravatar';
import pastebin from './sites/pastebin';
import telegram from './sites/telegram';
import wikipedia from './sites/wikipedia';
import deviantart from './sites/deviantart';
import newgrounds from './sites/newgrounds';
import soundcloud from './sites/soundcloud';
import myanimelist from './sites/myanimelist';
import leagueoflegends from './sites/leagueoflegends';

export const enum RetrieverCheckType {
	HTML,
	HTTP,
};

export const enum RetrieverStatus {
	Unavailable,
	Unreliable,
	Avaiable,
	Invalid,
	Error,
	Pending,
};

export interface IRetrieverResult {
	name: string;
	status: RetrieverStatus;
	url: string;
	note: string;
};

export interface IRetrieverSite {
	/**
	 * The name of the site for display purposes and searching.
	 */
	name: string;
	/**
	 * Type of error check to run on this site.
	 * 
	 * {@link RetrieverCheckType.HTML} checks for content in the response HTML body.
	 * 
	 * {@link RetrieverCheckType.HTTP} checks for a specific code in the response HTTP status.
	 */
	type: RetrieverCheckType;
	/**
	 * Whether to follow redirects for this check, defaults to `true`.
	 */
	followRedirects?: boolean;
	/**
	 * Whether to use a mobile user agent for this check, defaults to `false`.
	 */
	checkOnMobile?: boolean;
	/**
	 * The minimum length of the username for this check, defaults to `3`.
	 */
	minimumLength?: number;
	/**
	 * The maximum length of the username for this check, defaults to `36`.
	 */
	maximumLength?: number;
	/**
	 * The error value to check for that indicates an available username on this site.
	 *
	 * If `type` is set to {@link RetrieverCheckType.HTML} then this value should be a string, otherwise it should be an HTTP status code number.
	 */
	errorValue: string | number;
	/**
	 * The `printf`-formatted URL to check where the first string specifier (`%s`) is the username.
	 */
	url: string;
	/**
	 * A `printf`-formatted URL that is used instead to check for username availability. When set, {@link url} is used for display purposes.
	 */
	probeURL?: string;
};

export class Retriever extends EventEmitter {
	private readonly _sites: IRetrieverSite[];

	public constructor(additionalSites?: IRetrieverSite[]) {
		super();
		this._sites = [
			...bandcamp,
			...deviantart,
			...fandom,
			...gfycat,
			...giphy,
			...github,
			...gitlab,
			...gravatar,
			...leagueoflegends,
			...medium,
			...myanimelist,
			...newgrounds,
			...npm,
			...pastebin,
			...patreon,
			...soundcloud,
			...steam,
			...telegram,
			...tiktok,
			...tumblr,
			...twitch,
			...vimeo,
			...wikipedia,
		];

		if (additionalSites?.length) {
			this._sites.push(...additionalSites);
		}
	};

	/**
	 * Checks username availability in all sites
	 * @param username Username to check availability of
	 */
	public async checkUsernameAvailability(username: string): Promise<void>;
	/**
	 * Checks username availability of a specific site
	 * @param username Username to check availability of
	 * @param siteNames Case-insensitive array of site names - see {@link getSites()}
	 */
	public async checkUsernameAvailability(username: string, siteName: string[]): Promise<void>;
	/**
	 * Checks username availability of a specific site
	 * @param username Username to check availability of
	 * @param siteNames Case-insensitive array of site names - see {@link getSites()}
	 */
	public async checkUsernameAvailability(username: string, siteNames?: string[] | undefined): Promise<void> {
		username = username.toLowerCase();

		this.emit('started', username);

		const results: IRetrieverResult[] = [];
		
		const sites: IRetrieverSite[] = (siteNames && siteNames.length) ?
			this._sites.filter(s => siteNames.map(s => s.toLowerCase()).includes(s.name.toLowerCase())) :
			this._sites;

		if (!sites.length) throw new Error('Could not find sites to test');

		for (const site of sites) {
			const result = await this._testSite(site, username);
			results.push(result);
			this.emit('siteCheckResults', result);
		}

		this.emit('results', results);
	};

	/**
	 * Returns an array of all site names in this instance
	 */
	public getSiteNames(): string[] {
		return this._sites.map(s => s.name);
	};

	/**
	 * Returns all sites in this instance
	 */
	public getSites(): IRetrieverSite[] {
		return this._sites;
	};

	private async _testSite(site: IRetrieverSite, username: string): Promise<IRetrieverResult> {
		const url = format(site.url, username);

		this.emit('siteCheckStarted', url);

		const result: IRetrieverResult = {
			name: site.name,
			url: url,
			status: RetrieverStatus.Pending,
			note: ''
		};

		const followRedirects = site.followRedirects ?? true;
		const checkOnMobile = site.checkOnMobile ?? false;
		const minimumLength = site.minimumLength ?? 3;
		const maximumLength = site.maximumLength ?? 36;
		const probeURL = site.probeURL ? format(site.probeURL, username) : url;

		if (username.length < minimumLength) {
			result.status = RetrieverStatus.Invalid;
			result.note = `Username is below minimum length: ${minimumLength}`;
		} else if (username.length > maximumLength) {
			result.status = RetrieverStatus.Invalid;
			result.note = `Username is above maximum length: ${maximumLength}`;
		} else {
			const http = axios.create({
				headers: {
					'user-agent': checkOnMobile ? USER_AGENT_MOBILE : USER_AGENT
				},
				maxRedirects: followRedirects ? 5 : 0,
				validateStatus: (code: number) => {
					/**
					 * Don't throw on 200, 300, and 400 class status codes
					 */
					return code < 500 && code > 199;
				},
				timeout: 5_000,
			});

			try {
				const res = await http.get(probeURL);
				const statusCode = res.status;
				let body: string;
				if (typeof res.data === 'object') {
					body = JSON.stringify(res.data);
				} else {
					body = <string>res.data;
				}

				switch (site.type) {
					case RetrieverCheckType.HTTP:
						result.status = statusCode === site.errorValue ? RetrieverStatus.Avaiable : RetrieverStatus.Unavailable;
						break;
					case RetrieverCheckType.HTML:
						result.status = body.includes(<string>site.errorValue) ? RetrieverStatus.Avaiable : RetrieverStatus.Unavailable;
						break;
				}
			} catch (err: any) {
				result.status = RetrieverStatus.Error;
				result.note = err.message;
			}
		}

		return result;
	};
};
