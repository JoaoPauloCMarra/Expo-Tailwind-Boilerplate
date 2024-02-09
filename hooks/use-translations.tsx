import { useAtomValue, useSetAtom } from 'jotai';
import { getLocaleAtom, setLocaleAtom } from '@/lib/stores';

type Variables = Record<string, string>;

const replaceStringVariable = (value: string, variables?: Variables) =>
	value.replaceAll(/\{([^}]+)\}/gi, (_, a) =>
		a.split('.').reduce((b: Record<string, string>, c: string) => b[c], variables)
	);

export default function useTranslations() {
	const { locale, dictionary } = useAtomValue(getLocaleAtom);
	const setLocale = useSetAtom(setLocaleAtom);

	const translate = (path: string, variables?: Variables) => {
		let result = '';
		try {
			const [module, ...nestedPath] = path.split('.');
			const moduleKey = nestedPath.join('.');
			const moduleDictionary = dictionary[module];

			if (moduleDictionary[moduleKey]) {
				result = replaceStringVariable(moduleDictionary[moduleKey], variables);
			}

			return result;
		} catch (error) {
			return path;
		}
	};

	return { locale, t: translate, setLocale };
}
