///D:\dummycountry\tailwind-dummy-ui\src\component\CountryModal.jsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../component/ui/dialog";
import { useLanguage } from "../context/LanguageContext";

export default function CountryModal({ open, setOpen, country, summary, loading, error }) {
  const { t } = useLanguage(); // language context

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
           {country?.name?.common ? `🌍 ${country.name.common}` : t.summaryTitle}

          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-gray-600 text-sm">{t.loadingLabel || "Loading summary..."}</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : (
          <>
            <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-line mb-4">
              {summary}
            </p>

            <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>{t.populationLabel}:</strong> {country?.population?.toLocaleString() || "N/A"}</p>
              <p><strong>{t.languagesLabel}:</strong> {country?.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
              <p><strong>{t.currencyLabel}:</strong> {
                country?.currencies
                  ? Object.values(country.currencies).map(cur => cur.name).join(", ")
                  : "N/A"
              }</p>
              <p>
                <strong>{t.mapLabel}:</strong>{" "}
                <a
                  href={country?.maps?.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {t.viewOnMap || "View on Google Maps"}
                </a>
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
