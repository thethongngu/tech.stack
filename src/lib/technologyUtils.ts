import technologiesData from '@/data/technologies.json';
import { ITechnology } from '@/types';

export const getTechnologyById = (
  id: string,
  data: ITechnology[] = technologiesData as ITechnology[]
): ITechnology | undefined => {
  return data.find((tech) => tech.id === id);
};
