import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useCookie } from 'src/hooks';
import { useLoginMutation } from 'src/store';
import { notify } from 'src/utils';

export const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const cookie = useCookie("profile")
  function isValidEmail(email: string) {
    return /\S+@manas\.edu\.kg$/.test(email);
  }
  const form = useForm({
    initialValues: {
      email: "2308.01012@manas.edu.kg",
      password: "123123"
    },
    validate: {
      // email: (value) => isValidEmail(value),
      password: (value) => !value
    }
  })
  const handleSubmit = async (values: AuthRequest) => {
    try {
      const res = await login(values).unwrap();
      cookie.setCookie(res)
      notify(true, t("wellcome"))
      navigate("/thesis")
    } catch (error) {
      notify(false, t("login-error"))
    }
  }
  useEffect(() => {
    const profile = cookie.getCookie()
    if (profile) {
      navigate("/thesis")
    }
  }, [])
  return (
    <section className="bg-gray-50 h-screen dark:bg-gray-900 text-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white h-16">
              {t('app-title')}
            </h3>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))} className="space-y-4 md:space-y-6">
              <div>
                <TextInput
                  {...form.getInputProps("email")}
                  error={form.errors.email}
                  label={t('email')}
                />
              </div>
              <div>
                <PasswordInput
                  {...form.getInputProps("password")}
                  label={t('password')}
                />
              </div>
              <Button
                type="submit"
                bg="baseDark"
              >
                {t('sign-in')}
              </Button>
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
          </div>
        </div>
      </div>
    </section>
  );
};
