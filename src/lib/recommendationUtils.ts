// src/lib/recommendationUtils.ts
import technologiesData from '@/data/technologies.json';

export interface Technology {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  tags: string[];
  category: string;
  compatibilities?: string[];
  website?: string;
}

const defaultTechnologies: Technology[] = technologiesData as Technology[];

// Accept an optional 'technologiesToConsider' parameter for testing.
export const generateRecommendations = (
  currentAnswers: string[],
  technologiesToConsider: Technology[] = defaultTechnologies // Default to real data
): Technology[] => {
  const scores: { [id: string]: number } = {};
  technologiesToConsider.forEach(tech => scores[tech.id] = 0);

  // Q1: Project Type (answers[0])
  if (currentAnswers[0]) {
    const projectTypeKeywords = currentAnswers[0].toLowerCase().split(/[\s,]+/);
    technologiesToConsider.forEach(tech => {
      projectTypeKeywords.forEach(keyword => {
        if (keyword.length < 2) return;
        if (tech.category.toLowerCase().includes(keyword) || tech.tags.some(tag => tag.toLowerCase().includes(keyword))) {
          scores[tech.id] += 3; // Increased score for project type match
        }
      });
    });
  }

  // Q3: Preferred Languages (answers[2])
  if (currentAnswers[2]) {
    const langKeywords = currentAnswers[2].toLowerCase().split(/[\s,]+/);
    technologiesToConsider.forEach(tech => {
      langKeywords.forEach(keyword => {
        if (keyword.length < 2) return;
        let languageMatchScore = 0;
        if (tech.tags.some(tag => tag.toLowerCase().includes(keyword)) || tech.name.toLowerCase().includes(keyword)) {
          languageMatchScore += 3;
        }
        if (tech.category.toLowerCase() === "programming languages" && tech.name.toLowerCase().includes(keyword)) {
          languageMatchScore += 5;
        }

        // If a language matched, and the tech is a framework, give it a small related boost.
        if (languageMatchScore > 0 && (tech.category.toLowerCase().includes("framework") || tech.category.toLowerCase().includes("library"))) {
            if (tech.tags.some(tag => tag.toLowerCase().includes(keyword))) { // Check if the framework explicitly lists the language
                 languageMatchScore += 1; // Small boost for frameworks using the preferred language
            }
        }
        scores[tech.id] += languageMatchScore;
      });
    });
  }

  // Q4: Framework Preferences (answers[3])
  if (currentAnswers[3]) {
    const frameworkKeywords = currentAnswers[3].toLowerCase().split(/[\s,]+/);
    technologiesToConsider.forEach(tech => {
      frameworkKeywords.forEach(keyword => {
        if (keyword.length < 2) return;
        if (tech.name.toLowerCase().includes(keyword) || tech.tags.some(tag => tag.toLowerCase().includes(keyword))) {
          scores[tech.id] += 4;
        }
      });
    });
  }

  // Q5: Database Type (answers[4])
  if (currentAnswers[4]) {
    const dbKeywords = currentAnswers[4].toLowerCase().split(/[\s,]+/);
    technologiesToConsider.forEach(tech => {
      dbKeywords.forEach(keyword => {
        if (keyword.length < 2) return;
        if (tech.category.toLowerCase() === "databases" && (tech.name.toLowerCase().includes(keyword) || tech.tags.some(tag => tag.toLowerCase().includes(keyword)))) {
          scores[tech.id] += 4;
        } else if (tech.tags.some(tag => tag.toLowerCase().includes(keyword))){
          scores[tech.id] +=2;
        }
      });
    });
  }

  // Q6: Specific technologies (answers[5])
  if (currentAnswers[5]) {
    const specificInputs = currentAnswers[5].toLowerCase().split(/\s*,\s*/);
    specificInputs.forEach(input => {
      if (input.startsWith("include ")) {
        const techName = input.substring("include ".length).trim();
        if (techName) {
          technologiesToConsider.forEach(tech => {
            if (tech.name.toLowerCase().includes(techName)) { scores[tech.id] += 10; }
          });
        }
      } else if (input.startsWith("exclude ")) {
        const techName = input.substring("exclude ".length).trim();
        if (techName) {
          technologiesToConsider.forEach(tech => {
            if (tech.name.toLowerCase().includes(techName)) { scores[tech.id] = -Infinity; }
          });
        }
      } else {
          const techName = input.trim();
          if(techName){
               technologiesToConsider.forEach(tech => {
                  if (tech.name.toLowerCase().includes(techName)) { scores[tech.id] += 5; }
               });
          }
      }
    });
  }

  const sortedRecommendedTechnologies = technologiesToConsider
    .filter(tech => scores[tech.id] > 0 && scores[tech.id] !== -Infinity)
    .sort((a, b) => scores[b.id] - scores[a.id]);

  return sortedRecommendedTechnologies.slice(0, 5);
};
