import React, { useState } from 'react';
import technologiesData from '../../data/technologies.json';
import { ITechnology } from '../../types';
import TechCard from '../../components/TechCard';

const TechnologiesPage = () => {
  const technologies: ITechnology[] = technologiesData;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const allCategories = ['All', ...new Set(technologies.map(t => t.category).sort())];
  const allTags = ['All', ...new Set(technologies.flatMap(t => t.tags ?? []).sort())];
  const allCompatibilities = ['All', ...new Set(technologies.flatMap(t => t.compatibilities ?? []).sort())];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedCompatibility, setSelectedCompatibility] = useState<string>('All');

  const filteredTechnologies = technologies.filter(tech => {
    const categoryMatch = selectedCategory === 'All' || tech.category === selectedCategory;
    const tagMatch = selectedTag === 'All' || (tech.tags ?? []).includes(selectedTag);
    const compatibilityMatch = selectedCompatibility === 'All' || (tech.compatibilities ?? []).includes(selectedCompatibility);
    const searchLower = searchTerm.toLowerCase();
    const searchMatch = searchTerm === '' ||
                        tech.name.toLowerCase().includes(searchLower) ||
                        tech.description.toLowerCase().includes(searchLower) ||
                        (tech.tags ?? []).some(tag => tag.toLowerCase().includes(searchLower));
    return categoryMatch && tagMatch && compatibilityMatch && searchMatch;
  });

  const viewModeButtonClasses = "py-2 px-4 rounded-md font-medium text-sm transition-colors";
  const activeViewModeClasses = "bg-blue-600 hover:bg-blue-700 text-white";
  const inactiveViewModeClasses = "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600";

  const selectClasses = "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-center sm:text-left";

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Technology Catalog
      </h1>

      {/* Controls Bar - Search, Filters, View Mode */}
      <div className="mb-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, description, or tag..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={`w-full ${selectClasses} placeholder-gray-400 dark:placeholder-gray-500`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="category-select" className={labelClasses}>Category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className={`w-full ${selectClasses}`}
            >
              {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="tag-select" className={labelClasses}>Tag:</label>
            <select
              id="tag-select"
              value={selectedTag}
              onChange={e => setSelectedTag(e.target.value)}
              className={`w-full ${selectClasses}`}
            >
              {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="compatibility-select" className={labelClasses}>Compatibility:</label>
            <select
              id="compatibility-select"
              value={selectedCompatibility}
              onChange={e => setSelectedCompatibility(e.target.value)}
              className={`w-full ${selectClasses}`}
            >
              {allCompatibilities.map(comp => <option key={comp} value={comp}>{comp}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">View:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`${viewModeButtonClasses} ${viewMode === 'grid' ? activeViewModeClasses : inactiveViewModeClasses}`}
            disabled={viewMode === 'grid'}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`${viewModeButtonClasses} ${viewMode === 'list' ? activeViewModeClasses : inactiveViewModeClasses}`}
            disabled={viewMode === 'list'}
          >
            List
          </button>
        </div>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">
        Displaying {filteredTechnologies.length} of {technologies.length} technologies.
      </p>

      {/* Tech Cards Container */}
      {filteredTechnologies.length > 0 ? (
        <div className={
          viewMode === 'grid' ?
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" :
          "flex flex-col gap-6 items-center" // For list view, cards will be centered
        }>
          {filteredTechnologies.map(tech => (
            <div key={tech.id} className={viewMode === 'list' ? 'w-full max-w-2xl' : ''}> {/* Constrain width in list view */}
              <TechCard technology={tech} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
          No technologies match the current filters and search term.
        </p>
      )}
    </div>
  );
};

export default TechnologiesPage;
