import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const useHomePage = () => {
	const [inputPostId, setPostId] = useState<Post['id'] | null>(null);

	const {
		data: postsData,
		isFetching: postsAreFetching,
		error: postsError,
		refetch: fetchPosts
	} = useQuery({
		queryKey: ['posts', { id: inputPostId! }],
		queryFn: async ({ queryKey }): Promise<Post> => {
			const [_, { id }] = queryKey as ['posts', { id: Post['id'] }];
			return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json());
		},
		enabled: false
	});

	const onIdInputChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		const id = Number(e.nativeEvent.text);
		if (isNaN(id)) return;
		setPostId(id);
	}, []);

	const onApiCallPress = useCallback(() => {
		if (!inputPostId) return;
		fetchPosts();
	}, [fetchPosts, inputPostId]);

	return {
		inputPostId,
		postsData,
		postsError,
		postsAreFetching,

		onIdInputChange,
		onApiCallPress
	};
};

export default useHomePage;
