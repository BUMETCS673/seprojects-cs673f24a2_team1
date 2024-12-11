import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Filters({ onFilterChange }) {
    const handleDietaryPreferenceChange = (e) => {
        onFilterChange({ dietaryPreference: e.target.value });
    };
    return (_jsx("div", { className: "flex space-x-4 mb-6", children: _jsxs("div", { children: [_jsx("label", { htmlFor: "dietaryPreference", className: "block text-sm font-medium text-gray-700", children: "Dietary Preference" }), _jsxs("select", { id: "dietaryPreference", name: "dietaryPreference", className: "mt-1 block w-full p-2 border border-gray-300 rounded-md", onChange: handleDietaryPreferenceChange, children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "vegan", children: "Vegan" }), _jsx("option", { value: "gluten_free", children: "Gluten-Free" }), _jsx("option", { value: "vegetarian", children: "Vegetarian" })] })] }) }));
}
export default Filters;
