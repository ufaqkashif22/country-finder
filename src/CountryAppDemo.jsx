import React, { useEffect, useState } from "react";
import CountryCard from "./component/CountryCard";
import CountrySortFilter from "./component/CountrySortFilter";
import CountryModal from "./component/CountryModal";
import { useLanguage } from "./context/LanguageContext";
import { auth } from "./firebase";

export default function CountryAppDemo() {
  const { language, toggleLanguage, t } = useLanguage();
  const [sortOption, setSortOption] = useState("name-asc");
  const [regionFilter, setRegionFilter] = useState("All");
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3,currencies,languages,maps")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.log(err));
  }, []);

  const filtered = Array.isArray(countries)
    ? countries
        .filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
        .filter((country) =>
          regionFilter === "All" ? true : country.region === regionFilter
        )
        .sort((a, b) => {
          switch (sortOption) {
            case "name-asc":
              return a.name.common.localeCompare(b.name.common);
            case "name-desc":
              return b.name.common.localeCompare(a.name.common);
            case "pop-asc":
              return a.population - b.population;
            case "pop-desc":
              return b.population - a.population;
            default:
              return 0;
          }
        })
    : [];

  const summarizeCountry = async (country) => {
    const code = country.cca3;
    setModalOpen(true);
    setSelectedCountry(country);

    setLoading((prev) => ({ ...prev, [code]: true }));
    setErrors((prev) => ({ ...prev, [code]: "" }));
    setSummaries((prev) => ({ ...prev, [code]: "" }));

    try {
      const res = await fetch("http://localhost:5000/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: country.name.common }),
      });

      const data = await res.json();

      if (!data.summary || data.summary === "No summary found.") {
        setErrors((prev) => ({ ...prev, [code]: "❌ No summary found." }));
      } else {
        setSummaries((prev) => ({ ...prev, [code]: data.summary }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, [code]: "❌ Error fetching summary." }));
    }

    setLoading((prev) => ({ ...prev, [code]: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Top Bar: Title Centered, Buttons on Sides */}
      <div className="flex items-center justify-between mb-6 px-4">
        {/* Logout Button */}
        <button
          onClick={() => {
            auth.signOut();
            window.location.reload();
          }}
          className="text-sm text-red-600 font-medium hover:bg-gray-300 px-2 py-1 rounded-md hover:underline flex items-center gap-1"
        >
          🚪 Logout
        </button>

        {/* Title Centered */}
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center flex-1">
          🌍 {t.appTitle}
        </h1>

        {/*  Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="text-sm text-blue-600 hover:bg-gray-300 px-2 py-1 rounded-md font-medium hover:underline flex items-center gap-1"
        >
          🌐 {language === "en" ? t.switchToUrdu : "Switch to English"}
        </button>
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full max-w-xl p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {/* 🔀 Sort & Filter */}
      <CountrySortFilter
        sortOption={sortOption}
        setSortOption={setSortOption}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      />

      {/* Country Cards */}
      <div dir={language === "ur" ? "rtl" : "ltr"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-10">
          {filtered.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onSummarize={summarizeCountry}
              loading={loading[country.cca3]}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <CountryModal
        open={modalOpen}
        setOpen={setModalOpen}
        country={selectedCountry}
        summary={summaries[selectedCountry?.cca3]}
        loading={loading[selectedCountry?.cca3]}
        error={errors[selectedCountry?.cca3]}
      />
<footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-16 py-6 border-t border-gray-200 dark:border-gray-700">
  © {new Date().getFullYear()} Country Explorer • Built with 🌍 React, TailwindCSS, and RESTCountries API.  
  <a
    href="https://github.com/ufaqkashif22"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline ml-2"
  >
    View on GitHub
  </a>
</footer>

    </div>
  );
}
