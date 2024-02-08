import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { getSampleText } from '@/lib/stores';

const useHomePage = () => {
	const [inputPostId, setPostId] = useState<Post['id'] | 0>(0);

	const sampleText = useAtomValue(getSampleText);

	const {
		data: postsData,
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
		refetchOnWindowFocus: false
	});

	const onIdInputChange = useCallback((value: string) => {
		const id = Number(value);
		if (isNaN(id)) return;
		setPostId(id);
	}, []);

	const onApiCallPress = async () => {
		if (!inputPostId && inputPostId > 0) return;
		await fetchPosts();
	};

	return {
		sampleText,
		inputPostId,
		postsData,
		postsError,
		postsAreFetching,

		onIdInputChange,
		onApiCallPress
	};
};

export default useHomePage;
