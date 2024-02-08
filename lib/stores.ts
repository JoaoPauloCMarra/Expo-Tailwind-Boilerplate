import { atom } from 'jotai';

const sampleAtom = atom('jotai is working');

export const getSampleText = atom((get) => get(sampleAtom));
