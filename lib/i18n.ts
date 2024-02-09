import type { Dictionary, Locale } from './constants';

const dictionaries = {
	en: () => import('@/translations/en.json'),
	pt: () => import('@/translations/pt.json')
};

export const loadLocale = async (locale: Locale): Promise<Dictionary> => {
	const result = (await dictionaries[locale]()) as unknown as Dictionary;
	return result;
};
