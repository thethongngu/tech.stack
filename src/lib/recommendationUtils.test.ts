// src/lib/recommendationUtils.test.ts
import '@testing-library/jest-dom';
import { generateRecommendations, Technology } from './recommendationUtils';

// Define the mock data directly in the test file
const mockTechnologiesForTest: Technology[] = [
  { id: 'react', name: 'React', description: 'JS UI library', tags: ['javascript', 'ui', 'frontend', 'library', 'web'], category: 'Frontend Frameworks/Libraries', website: 'react.dev' },
  { id: 'angular', name: 'Angular', description: 'TS framework', tags: ['typescript', 'frontend', 'framework', 'web'], category: 'Frontend Frameworks/Libraries', website: 'angular.io' },
  { id: 'vue', name: 'Vue.js', description: 'Progressive JS framework', tags: ['javascript', 'ui', 'frontend', 'framework', 'web'], category: 'Frontend Frameworks/Libraries', website: 'vuejs.org' },
  { id: 'nodejs', name: 'Node.js', description: 'JS runtime', tags: ['javascript', 'backend', 'runtime', 'web'], category: 'Backend Platforms', website: 'nodejs.org' },
  { id: 'python', name: 'Python', description: 'General purpose language', tags: ['python', 'backend', 'datascience', 'ml'], category: 'Programming Languages', website: 'python.org' },
  { id: 'django', name: 'Django', description: 'Python web framework', tags: ['python', 'backend', 'framework', 'web'], category: 'Backend Frameworks', website: 'djangoproject.com' },
  { id: 'mongodb', name: 'MongoDB', description: 'NoSQL database', tags: ['database', 'nosql', 'document store'], category: 'Databases', website: 'mongodb.com' },
  { id: 'postgresql', name: 'PostgreSQL', description: 'SQL database', tags: ['database', 'sql', 'relational'], category: 'Databases', website: 'postgresql.org' },
  { id: 'nextjs', name: 'Next.js', description: 'React framework for production', tags: ['react', 'framework', 'ssr', 'javascript', 'web'], category: 'Frontend Frameworks/Libraries', website: 'nextjs.org' },
  { id: 'spring', name: 'Spring Boot', description: 'Java framework', tags: ['java', 'backend', 'framework', 'web'], category: 'Backend Frameworks', website: 'spring.io' },
  { id: 'java', name: 'Java', description: 'General purpose language', tags: ['java', 'backend', 'enterprise'], category: 'Programming Languages', website: 'java.com' },
];


describe('Stack Configuration Wizard - Recommendation Logic', () => {
  const questionsTemplate = [
    "Project type?", "Scale?", "Languages?", "Frameworks?", "Database?", "Specific tech?"
  ];
  const getEmptyAnswers = () => Array(questionsTemplate.length).fill('');

  it('should return an empty array if no relevant answers are provided', () => {
    const answers = getEmptyAnswers();
    // Pass the mock data to the function
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    expect(recommendations).toEqual([]);
  });

  it('should recommend React and Next.js for "React" framework preference', () => {
    const answers = getEmptyAnswers();
    answers[3] = 'React'; // Framework preference
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    const ids = recommendations.map(r => r.id);
    expect(ids).toContain('react');
    expect(ids).toContain('nextjs');
  });

  it('should recommend Python and Django for "Python" language preference', () => {
    const answers = getEmptyAnswers();
    answers[2] = 'Python'; // Language preference
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    const ids = recommendations.map(r => r.id);
    expect(ids).toContain('python');
    expect(ids).toContain('django');
  });

  it('should recommend frontend frameworks for "Web App" project type', () => {
    const answers = getEmptyAnswers();
    answers[0] = 'Web App'; // Project type
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    const feFrameworks = recommendations.filter(t => t.category === 'Frontend Frameworks/Libraries');
    expect(feFrameworks.length).toBeGreaterThan(0);
    expect(recommendations.some(r => r.id === 'react' || r.id === 'nextjs' || r.id === 'vue' || r.id === 'angular')).toBe(true);
  });

  it('should recommend NoSQL databases for "NoSQL" database preference', () => {
    const answers = getEmptyAnswers();
    answers[4] = 'NoSQL'; // Database type
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    expect(recommendations.some(tech => tech.id === 'mongodb')).toBe(true);
  });

  it('should recommend SQL databases for "SQL" database preference', () => {
    const answers = getEmptyAnswers();
    answers[4] = 'SQL'; // Database type
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    expect(recommendations.some(tech => tech.id === 'postgresql')).toBe(true);
  });


  it('should exclude React if "exclude React" is specified', () => {
    const answers = getEmptyAnswers();
    answers[3] = 'Vue.js';
    answers[5] = 'exclude React';
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    expect(recommendations.some(tech => tech.id === 'react')).toBe(false);
    expect(recommendations.some(tech => tech.id === 'nextjs')).toBe(false);
    expect(recommendations.some(tech => tech.id === 'vue')).toBe(true);
  });

  it('should highly rank Next.js if "include Next.js" or just "Next.js" is specified in Q6', () => {
    let answers = getEmptyAnswers();
    answers[5] = 'include Next.js';
    let recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].id).toBe('nextjs');

    answers = getEmptyAnswers();
    answers[5] = 'Next.js';
    recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].id).toBe('nextjs');
  });

  it('should handle combined answers and rank appropriately (JS, React, NoSQL Web App)', () => {
    const answers = getEmptyAnswers();
    answers[0] = 'Web App';
    answers[2] = 'JavaScript';
    answers[3] = 'React';
    answers[4] = 'NoSQL';
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);

    expect(recommendations.length).toBeGreaterThan(0);
    const ids = recommendations.map(r => r.id);

    expect(ids).toContain('react');
    expect(ids).toContain('nextjs');
    expect(ids).toContain('mongodb');
    expect(ids).toContain('nodejs');

    expect(['react', 'nextjs']).toContain(recommendations[0].id);
  });

  it('should handle empty string answers gracefully (same as no answer)', () => {
    const answers = Array(questionsTemplate.length).fill('');
    answers[2] = '  ';
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    expect(recommendations).toEqual([]);
  });

  it('should prioritize "include" over other scoring if it results in top items', () => {
    const answers = getEmptyAnswers();
    answers[0] = "Web App";
    answers[2] = "Python";
    answers[5] = "include React";
    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].id).toBe('react');
  });

  it('should correctly parse multiple specific techs in Q6, e.g. "include Node.js, exclude MongoDB"', () => {
    const answers = getEmptyAnswers();
    answers[2] = "JavaScript";
    answers[4] = "NoSQL, SQL";
    answers[5] = "include Node.js, exclude MongoDB";

    const recommendations = generateRecommendations(answers, mockTechnologiesForTest);
    const ids = recommendations.map(r => r.id);

    expect(ids).toContain('nodejs');
    expect(ids).not.toContain('mongodb');
    expect(ids).toContain('postgresql');
  });
});
