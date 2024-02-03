import { ExpoResponse } from 'expo-router/server';
import type { ExpoRequest } from 'expo-router/server';

export async function GET(_: ExpoRequest, { id }: Record<string, string>) {
	return ExpoResponse.json({ id, hello: 'world' });
}
