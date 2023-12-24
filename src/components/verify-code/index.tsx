import { useTranslation } from 'react-i18next';
import useVerificationHook from 'react-code-hook';

export const VerifyCode = () => {
  const { code, inputStates, inputClass, handleChange, handleKeyDown } =
    useVerificationHook(6);
  const { t } = useTranslation();
  return (
    <div className="pb-10">
      <h5 className="text-gray-900 dark:text-white font-semibold text-lg mb-5">
        {t('verify-code')}
      </h5>
      <div className="flex items-center justify-center gap-3">
        {inputStates.map((state, ii) => {
          return (
            <input
              type="text"
              value={state.digit}
              className={`${inputClass}
                                bg-transparent border-b-2
                                w-7 text-gray-900 dark:text-white
                                text-center text-3xl outline-none
                                border-b-solid border-b-black
                                dark:border-b-white`}
              onChange={(e) => handleChange(e, ii)}
              onKeyDown={handleKeyDown}
            />
          );
        })}
      </div>
    </div>
  );
};
