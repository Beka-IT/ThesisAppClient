import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VerifyCode } from 'src/components';

// TODO remove, this demo shouldn't need to reset the theme.

export const SignIn = () => {
  const [login, setLogin] = useState<string>('');
  const [isVerify, setVerify] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>();
  const { t } = useTranslation();

  function isValidEmail(email: string) {
    return /\S+@manas\.edu\.kg$/.test(email);
  }

  const validateEmail = () => {
    return !isValidEmail(login) && login !== ''
      ? setError('Манас почтаны туура киргизиниз!')
      : setError(null);
  };

  const validatePassword = () => {
    return password === '' && login !== ''
      ? setError('Сырсозду киргизиниз!')
      : setError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validatePassword();
    validateEmail();
    if (!error) {
      setVerify(true);
    }
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <section className="bg-gray-50 h-screen dark:bg-gray-900 text-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white h-16">
              {t('app-title')}
            </h3>
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-white dark:bg-gray-800 dark:text-red-400 h-10"
              role="alert"
            >
              <span className="font-medium">{error}</span>
            </div>
            {isVerify ? (
              <VerifyCode />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <input
                    type="email"
                    onBlur={validateEmail}
                    value={login}
                    autoComplete="on"
                    onChange={(e) => setLogin(e.target.value)}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t('email-input')}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    onBlur={validatePassword}
                    value={password}
                    autoComplete="on"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder={t('password')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {t('sign-in')}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer">
                  {t('doesnt-sign-up')}
                  <Link
                    to={'/sign-up'}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {t('sign-up')}
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
