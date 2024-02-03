import { ExpoResponse } from 'expo-router/server';
import type { ExpoRequest } from 'expo-router/server';

export function GET(_: ExpoRequest) {
	return ExpoResponse.json({ hello: 'world' });
}
