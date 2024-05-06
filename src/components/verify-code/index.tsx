import { useTranslation } from 'react-i18next';
import useVerificationHook from 'react-code-hook';
import { useConfirmationMutation } from 'src/store';
import { notify } from 'src/utils';
import { useCookie } from 'src/hooks';
import { Button, Center, Flex } from '@mantine/core';

type Props = {
  toggle: () => void
}

export const VerifyCode = ({ toggle }: Props) => {
  const { code, inputStates, inputClass, handleChange, handleKeyDown } =
    useVerificationHook(6);
  const profile = useCookie<Profile>("profile").getCookie()
  const { t } = useTranslation();
  const [confirmationEmail] = useConfirmationMutation()
  const handleSubmit = async () => {
    try {
      if (code) {
        const res = await confirmationEmail({
          code: code,
          email: profile?.email
        })
        if ("data" in res) {
          if (res.data) {
            notify(true, t("verified"))
            notify(true, t("wellcome"))
            toggle()
          } else {
            notify(false, t("incorrect-code"))
          }
        }
      }
    } catch (error) {
      notify(false, t("error"))
    }
  }

  return (
    <Flex direction="column" justify="center" gap={10} pb={10}>
      <h5 className="text-gray-900 dark:text-white font-semibold text-lg mb-5 text-center">
        {t('verify-code')}
      </h5>
      <div className="flex items-center justify-center gap-3">
        {inputStates.map((state, ii) => {
          return (
            <input key={ii}
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
      <Center mt={20}>
        <Button bg="orange" mr={10} onClick={toggle}>
          {t("reset")}
        </Button>
        <Button onClick={handleSubmit}>
          {t("send")}
        </Button>
      </Center>
    </Flex>
  );
};
