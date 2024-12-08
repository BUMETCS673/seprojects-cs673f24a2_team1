// src/components/Filters.tsx

import React from 'react';

interface FilterOptions {
    dietaryPreference: string;
}

interface FiltersProps {
    onFilterChange: (filters: FilterOptions) => void;
}

function Filters({ onFilterChange }: FiltersProps) {
    const handleDietaryPreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({ dietaryPreference: e.target.value });
    };

    return (
        <div className="flex space-x-4 mb-6">
            <div>
                <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700">
                    Dietary Preference
                </label>
                <select
                    id="dietaryPreference"
                    name="dietaryPreference"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    onChange={handleDietaryPreferenceChange}
                >
                    <option value="">All</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten_free">Gluten-Free</option>
                    <option value="vegetarian">Vegetarian</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;
