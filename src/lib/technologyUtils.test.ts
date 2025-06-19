import { getTechnologyById } from './technologyUtils';
import { ITechnology } from '@/types';

describe('getTechnologyById', () => {
  const sample: ITechnology[] = [
    { id: 'react', name: 'React', description: 'JS UI', tags: [], category: 'lib' },
    { id: 'node', name: 'Node.js', description: 'JS runtime', tags: [], category: 'platform' },
  ];

  it('returns matching technology', () => {
    const tech = getTechnologyById('react', sample);
    expect(tech?.name).toBe('React');
  });

  it('returns undefined for unknown id', () => {
    const tech = getTechnologyById('unknown', sample);
    expect(tech).toBeUndefined();
  });
});
