// src/component/CountrySortFilter.jsx


export default function CountrySortFilter({ sortOption, setSortOption, regionFilter, setRegionFilter }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8 mt-8">
      <select
        className="p-2 border rounded text-sm dark:bg-gray-800 dark:text-white"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="name-asc">Sort: A–Z</option>
        <option value="name-desc">Sort: Z–A</option>
        <option value="pop-asc">Population ↑</option>
        <option value="pop-desc">Population ↓</option>
      </select>

      <select
        className="p-2 border rounded text-sm dark:bg-gray-800 dark:text-white"
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
      >
        <option value="All">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antarctic</option>
      </select>
    </div>
  );
}
