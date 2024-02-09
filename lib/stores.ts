import { atom } from 'jotai';
import type { Dictionary, Locale } from './constants';
import { DEFAULT_LOCALE } from './constants';

/**
 * i18n Storage
 */
export type I18nAtom = {
	locale: Locale;
	dictionary: Dictionary;
};

export const i18nAtom = atom<I18nAtom>({
	locale: DEFAULT_LOCALE,
	dictionary: {}
});

export const getLocaleAtom = atom((get) => get(i18nAtom));

export const setLocaleAtom = atom(null, (_, set, update: I18nAtom) => {
	set(i18nAtom, update);
});

/**
 * Sample Storage
 */

const sampleAtom = atom('jotai is working');

export const getSampleText = atom((get) => get(sampleAtom));
