import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage('kg');
  }, []);
  return (
    <div className="flex justify-end items-center text-2xl font-semibold text-gray-900 dark:text-white ml-0 gap-2 px-2">
      <button data-tooltip-target="tooltip-kg">
        <img
          width={30}
          height={30}
          src="/kg-flag.png"
          alt=""
          onClick={() => i18n.changeLanguage('kg')}
        />
      </button>
      <button data-tooltip-target="tooltip-tr">
        <img
          width={30}
          height={30}
          src="/tr-flag.png"
          alt=""
          onClick={() => i18n.changeLanguage('tr')}
        />
      </button>
      <div
        id="tooltip-kg"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Кыргызча
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div
        id="tooltip-tr"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Türkçe
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};
