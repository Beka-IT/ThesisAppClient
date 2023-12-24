import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomModal } from 'src/ui-kits/custom-modal';

interface ChangePasswordProps {
  setHidden: (a: false) => void;
}

type changePasswordType = {
  password?: string;
  confirmPassword?: string;
};

export const ChangePassword = ({ setHidden }: ChangePasswordProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<changePasswordType>({});
  const [form, setForm] = useState<changePasswordType>({
    password: '',
    confirmPassword: '',
  });
  const validateForm = () => {
    const newErrors: changePasswordType = {};
    if (!form.password) {
      newErrors.password = t('password-required');
    }
    if (!form.confirmPassword && form.password === form.confirmPassword) {
      newErrors.confirmPassword = t('confirmPassword-required');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // change password
    }
  };

  return (
    <CustomModal setHidden={setHidden}>
      <h2 className=" text-white dark:text-gray-900 font-semibold text-2xl mb-4">
        {t('change-password')}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <p className="absolute -bottom-5 font-semibold text-[14px] text-red-600">
            {errors.password}
          </p>
          <input
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            value={form.password}
            type="password"
            placeholder={t('new-password')}
            className="bg-transparent border-b-2 outline-none border-b-white dark:border-b-black py-2 px-4"
          />
        </div>
        <div className="relative">
          <p className="absolute -bottom-5 font-semibold text-[14px] text-red-600">
            {errors.confirmPassword}
          </p>
          <input
            onChange={(e) =>
              setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            value={form.confirmPassword}
            type="password"
            placeholder={t('repeat-password')}
            className="bg-transparent py-2 px-4 outline-none border-b-2 border-b-white dark:border-b-black"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-300 mt-5 hover:bg-gray-100 dark:bg-gray-700 text-black dark:text-white dark:hover:bg-gray-900 duration-300 font-bold py-2 px-4 rounded"
        >
          {t('verify-password')}
        </button>
      </form>
    </CustomModal>
  );
};
