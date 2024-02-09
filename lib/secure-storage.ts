import { getItemAsync, setItemAsync } from 'expo-secure-store';

export async function secureSave(key: string, value: string) {
	await setItemAsync(key, value);
}

export async function secureGet(key: string) {
	const result = await getItemAsync(key);
	return result;
}
