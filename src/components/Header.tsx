import { Link } from 'react-router-dom';
import { ModeChange } from 'src/ui-kits';
import { LanguageSelect } from 'src/components';
import logo from 'src/assets/manas-logo.gif';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="w-screen h-20 bg-gray-50 dark:bg-gray-900 px-8 sm:px-16 flex items-center justify-center shadow-2xl shadow-slate-300 dark:shadow-slate-600">
      <div className="flex flex-wrap w-full justify-between">
        <div className="flex items-center gap-5">
          <Link to="/" className="flex gap-2 sm:gap-6 items-center">
            <img className="w-8 md:w-10" src={logo} alt="" />
            <h1 className="text-2xl sm:text-4xl text-gray-900 dark:text-white uppercase font-bold">
              {t('manas-university')}
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <ModeChange />
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
};
