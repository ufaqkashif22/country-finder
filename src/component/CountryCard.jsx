///D:\dummycountry\tailwind-dummy-ui\src\component\CountryCard.jsx
import { useLanguage } from "../context/LanguageContext";

export default function CountryCard({ country, onSummarize,loading = false  }) {

    const { t } = useLanguage();
  const code = country.cca3;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out">
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h2 className="text-xl font-semibold">{country.name.common}</h2>
      <p className="text-sm text-gray-600">
         {t.capitalLabel}: {country.capital?.[0] || "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        {t.populationLabel}: {country.population?.toLocaleString() || "N/A"}
      </p>
      <p className="text-sm text-gray-600">{t.regionLabel}: {country.region}</p>

      <button
           onClick={() => onSummarize(country)}
        className="mt-3 text-sm text-blue-600 underline"
      >
        {loading[code] ? t.loadingLabel : t.summaryButton}
      </button>
    </div>
  );
}
