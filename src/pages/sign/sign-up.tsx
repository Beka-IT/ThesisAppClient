import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CustomSelect, VerifyCode } from 'src/components';

type errorsType = {
  email?: string | null;
  name?: string | null;
  surname?: string | null;
  patronomyc?: string | null;
  faculty?: string | null;
  department?: string | null;
  phoneNumber?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
};

export const SignUp = () => {
  const { t } = useTranslation();
  const [isVerify, setVerify] = useState(false);
  const [errors, setErrors] = useState<errorsType>({});
  const [form, setForm] = useState({
    email: '',
    name: '',
    surname: '',
    patronomyc: '',
    faculty: '',
    department: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors: errorsType = {};
    // Add validation logic here
    if (!form.email) {
      newErrors.email = t('email-required');
    }
    if (!form.name) {
      newErrors.name = t('name-required');
    }
    if (!form.surname) {
      newErrors.surname = t('surname-required');
    }
    if (!form.patronomyc) {
      newErrors.patronomyc = t('patronomyc-required');
    }
    if (!form.faculty) {
      newErrors.faculty = t('faculty-required');
    }
    if (!form.department) {
      newErrors.department = t('department-required');
    }
    if (!form.phoneNumber) {
      newErrors.phoneNumber = t('phoneNumber-required');
    }
    if (!form.password) {
      newErrors.password = t('password-required');
    }
    if (!form.confirmPassword && form.password === form.confirmPassword) {
      newErrors.confirmPassword = t('confirmPassword-required');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e: React.FormEvent<errorsType>) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setVerify(true);
    }
  };

  return (
    <section className="bg-gray-50 h-screen dark:bg-gray-900 text-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white h-16">
              {t('app-title')}
            </h3>
            {isVerify ? (
              <VerifyCode />
            ) : (
              <form onSubmit={handleSignUp} className="space-y-[20px]">
                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.email}
                  </p>
                  <input
                    type="email"
                    value={form.email}
                    autoComplete="on"
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t('email-input')}
                  />
                </div>
                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.name}
                  </p>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder={t('name-placeholder')}
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.surname}
                  </p>
                  <input
                    type="text"
                    value={form.surname}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, surname: e.target.value }))
                    }
                    placeholder={t('surname-placeholder')}
                    name="surname"
                    id="surname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.patronomyc}
                  </p>
                  <input
                    type="text"
                    value={form.patronomyc}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        patronomyc: e.target.value,
                      }))
                    }
                    placeholder={t('patronomyc-placeholder')}
                    name="patronomyc"
                    id="patronomyc"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.faculty}
                  </p>
                  <CustomSelect
                    value={form.faculty}
                    onChange={(el: string) =>
                      setForm((prev) => ({ ...prev, faculty: el }))
                    }
                    defaultValue={{ titleKg: 'Факультет', titleTr: 'Fakulte' }}
                    data={[
                      { id: 1, titleKg: 'Гуманитардык', titleTr: 'Insani' },
                      { id: 2, titleKg: 'Экономика', titleTr: 'Ekonomi' },
                      { id: 3, titleKg: 'Инженерия', titleTr: 'Mühendislik' },
                    ]}
                  />
                </div>
                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.department}
                  </p>
                  <CustomSelect
                    onChange={(el: string) =>
                      setForm((prev) => ({ ...prev, department: el }))
                    }
                    value={form.department}
                    defaultValue={{ titleKg: 'Болум', titleTr: 'Bolum' }}
                    data={[
                      { id: 1, titleKg: 'Компьютердик', titleTr: 'Bilgisayar' },
                      { id: 2, titleKg: 'Экология', titleTr: 'Cevre' },
                      { id: 3, titleKg: 'Химия', titleTr: 'Kimya' },
                    ]}
                  />
                </div>

                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.phoneNumber}
                  </p>
                  <input
                    type="text"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    placeholder={t('phoneNumber-placeholder')}
                    name="phoneNumber"
                    id="phoneNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.password}
                  </p>
                  <input
                    type="password"
                    value={form.password}
                    autoComplete="off"
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                    name="password"
                    id="password"
                    placeholder={t('password')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <p className="absolute text-sm -top-5 text-red-600">
                    {errors.confirmPassword}
                  </p>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    autoComplete="off"
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder={t('confirmPassword')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {t('sign-up')}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer">
                  {t('exists-account')}
                  <Link
                    to="/sign-in"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {t('sign-in')}
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
