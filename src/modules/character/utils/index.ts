import type { CharacterId } from '../types';

export const isValidCharacterId = (id: number): id is CharacterId => [1, 2, 3, 4, 5].includes(id);
