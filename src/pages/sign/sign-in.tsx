import { Button, Modal, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageSelect, VerifyCode } from 'src/components';
import { getMenu } from 'src/constants';
import { useCookie } from 'src/hooks';
import { routes } from 'src/route-config';
import { useLoginMutation } from 'src/store';
import { notify } from 'src/utils';

export const SignIn = () => {
  const [opened, { toggle }] = useDisclosure()
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const cookie = useCookie<Profile>("profile")
  function isValidEmail(email: string) {
    const res = /\S+@manas\.edu\.kg$/.test(email)
    return !res && t("incorrect-email");
  }
  const form = useForm({
    initialValues: {
      email: "1904.01028@manas.edu.kg",
      password: "123123"
    },
    validate: {
      email: (value) => isValidEmail(value),
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
      const role = profile?.role
      const menus = getMenu(t)?.filter((item) => item?.roles?.includes(role))
      navigate(menus?.[0]?.path)
    }
  }, [])
  return (
    <section className="bg-gray-50 h-screen dark:bg-gray-900 text-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <LanguageSelect />
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white h-16">
              {t('app-title')}
            </h3>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))} className="space-y-4 md:space-y-6">
              <div>
                <TextInput
                  labelProps={{ class: "text-black dark:text-white" }}
                  {...form.getInputProps("email")}
                  error={form.errors.email}
                  label={t('email')}
                />
              </div>
              <div>
                <PasswordInput
                  labelProps={{ class: "text-black dark:text-white" }}
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
      <Modal
        withCloseButton={false}
        closeOnClickOutside={false}
        centered opened={opened} onClose={toggle}>
        <VerifyCode toggle={toggle} />
      </Modal>
    </section>
  );
};
