import React from 'react';
import { ITechnology } from '../types'; // Assuming types is in src/types

interface TechCardProps {
  technology: ITechnology;
  // viewMode: 'grid' | 'list'; // Future: To enable different card layouts for list view
}

const TechCard: React.FC<TechCardProps> = ({ technology /*, viewMode */ }) => {
  // Placeholder for initials if no logo
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col h-full">
      <div className="flex items-start mb-3">
        {technology.logoUrl ? (
          <img
            src={technology.logoUrl}
            alt={`${technology.name} logo`}
            className="w-12 h-12 object-contain mr-4" // Consistent size, object-contain
          />
        ) : (
          <div
            className="w-12 h-12 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center rounded text-lg font-semibold mr-4"
          >
            {getInitials(technology.name)}
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-0">{technology.name}</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 text-ellipsis overflow-hidden flex-grow">
        {technology.description}
      </p>

      <div className="mb-3">
        <strong className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">TAGS:</strong>
        <div className="flex flex-wrap gap-1">
          {technology.tags.map(tag => (
            <span
              key={tag}
              className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <strong className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">COMPATIBILITIES:</strong>
        <div className="flex flex-wrap gap-1">
          {(technology.compatibilities ?? []).map(comp => (
            <span
              key={comp}
              className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium"
            >
              {comp}
            </span>
          ))}
        </div>
      </div>

      {technology.website && (
        <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
          <a
            href={technology.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline text-sm font-medium"
          >
            Visit Website &rarr;
          </a>
        </div>
      )}
    </div>
  );
};

export default TechCard;
