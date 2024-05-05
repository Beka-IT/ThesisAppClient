import { Button, Flex, Grid, PasswordInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useResetPasswordMutation } from "src/store";
import { notify } from "src/utils";

type Props = {
  toggle: () => void
}

export const ChangePassword = ({ toggle }: Props) => {
  const { t } = useTranslation()
  const [reset] = useResetPasswordMutation()
  const form = useForm({
    initialValues: {
      newPassword: "",
      oldPassword: "",
      repeatPassword: ""
    },
    validate: {
      oldPassword: value => !value,
      newPassword: value => !value,
      repeatPassword: value => !value
    }
  })

  const handleSubmit = async (values: ResetPasswordRequest) => {
    try {
      await reset(values).unwrap()
      notify(true, t("saved"))
      toggle()
    } catch (error) {
      notify(false)
    }
  }

  return (
    <>
      <Title ta="center" fz={{ base: 20, md: 24 }}>
        {t('change-password')}
      </Title>
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Grid>
          <Grid.Col>
            <PasswordInput
              {...form.getInputProps("oldPassword")}
              label={t("old-password")}
            />
          </Grid.Col>
          <Grid.Col>
            <PasswordInput
              {...form.getInputProps("newPassword")}
              label={t("new-password")}
            />
          </Grid.Col>
          <Grid.Col>
            <PasswordInput
              {...form.getInputProps("repeatPassword")}
              label={t("repeatPassword")}
            />
          </Grid.Col>
          <Grid.Col>
            <Flex w="100%" justify="center">
              <Button type="submit">
                {t("save")}
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
};
