import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import type { Locale } from '@/lib/constants';
import { loadLocale } from '@/lib/i18n';
import { getSampleText } from '@/lib/stores';
import { vibrate } from '@/lib/utils';
import useTranslations from '@/hooks/use-translations';

const useHomePage = () => {
	const { setLocale } = useTranslations();
	const [inputPostId, setPostId] = useState<Post['id'] | 0>(0);

	const sampleText = useAtomValue(getSampleText);

	const {
		data: post,
		isFetching: postsAreFetching,
		error: postsError,
		refetch: fetchPosts
	} = useQuery({
		queryKey: ['posts', { id: inputPostId! }],
		queryFn: async ({ queryKey }): Promise<Post> => {
			const [_, { id }] = queryKey as ['posts', { id: Post['id'] }];
			return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
				if (!res.ok) throw new Error('Network response was not ok');
				return res.json();
			});
		},
		enabled: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		initialData: { id: 0, title: '', userId: 0, body: '' }
	});

	const onIdInputChange = useCallback((value: string) => {
		const id = Number(value);
		if (isNaN(id)) return;
		setPostId(id);
	}, []);

	const onApiCallPress = async () => {
		if (!inputPostId || inputPostId <= 0) return;
		vibrate();
		await fetchPosts();
	};

	const onSwitchLocale = async (nextLocale: Locale) => {
		const dictionary = await loadLocale(nextLocale);
		setLocale({ locale: nextLocale, dictionary });
	};

	return {
		sampleText,
		inputPostId,
		post,
		postsError,
		postsAreFetching,

		onSwitchLocale,
		onIdInputChange,
		onApiCallPress
	};
};

export default useHomePage;
