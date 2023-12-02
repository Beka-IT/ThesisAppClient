import  React, { useState } from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../components/LanguageSelect';
import { useNavigate, useNavigation } from 'react-router-dom';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white h-16">
                  {t('app-title')}
              </h3>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <input type="email" value={login} onChange={e => setLogin(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('email-input')}/>
                  </div>
                  <div>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" placeholder={t('password')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {t('sign-in')}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t('doesnt-sign-up')} <a onClick={() => navigate("/sign-up")} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{t('sign-up')}</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
}