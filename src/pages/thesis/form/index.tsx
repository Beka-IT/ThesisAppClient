import { Button, Flex, Grid, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useCreateThesisMutation, useUpdateThesisMutation } from "src/store"
import { notify } from "src/utils"

type Props = {
  data?: ThesisDetail
}

export const ThesisForm = ({ data }: Props) => {
  const { t } = useTranslation()
  const [update] = useUpdateThesisMutation()
  const [create] = useCreateThesisMutation()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      id: data?.id || null,
      titleKg: data?.titleKg || "",
      titleTr: data?.titleTr || "",
      descriptionKg: data?.descriptionKg || "",
      descriptionTr: data?.descriptionTr || "",
    },
    validate: {
      titleKg: (value) => !value,
      titleTr: (value) => !value,
      descriptionKg: (value) => !value,
      descriptionTr: (value) => !value,
    }
  })
  const handleSubmit = async (values: ThesisForm) => {
    if (data) {
      try {
        await update(values).unwrap()
        notify(true, t("updated"))
      } catch (error) {
        notify(false)
      }
    } else {
      try {
        await create(values).unwrap()
        notify(true, t("created"))
      } catch (error) {
        notify(false)
      }
    }

  }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid className="dark:text-white">
        <Grid.Col>
          <TextInput
            label={t("titleKg")}
            {...form.getInputProps("titleKg")}
            error={form.errors.titleKg}
          />
        </Grid.Col>
        <Grid.Col>
          <TextInput
            label={t("titleTr")}
            {...form.getInputProps("titleTr")}
            error={form.errors.titleTr}
          />
        </Grid.Col>
        <Grid.Col>
          <textarea style={{ width: "100%", height: "140px", padding: "10px" }}
            placeholder={t("descriptionKg")}
            content={form.values.descriptionKg}
            onChange={(value) => form.setFieldValue("descriptionKg", value.target.value)}
          />
        </Grid.Col>
        <Grid.Col>
          <textarea style={{ width: "100%", height: "140px", padding: "10px" }}
            placeholder={t("descriptionTr")}
            value={form.values.descriptionTr}
            onChange={(value) => form.setFieldValue("descriptionTr", value.target.value)}
          />
        </Grid.Col>
        <Grid.Col>
          <Flex w="100%" justify="center" gap={10}>
            <Button bg="orange" onClick={() => navigate("/thesis")}>
              {t("reset")}
            </Button>
            <Button bg="baseDark" type="submit">
              {t("save")}
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </form>
  )
}
