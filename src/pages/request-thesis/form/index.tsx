import { Button, Checkbox, Flex, Grid, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useCookie } from "src/hooks"
import { useCreateRequestMutation, useGetDepartmentsTeachersQuery, useUpdateRequestMutation } from "src/store"
import { notify } from "src/utils"

type Props = {
  data?: RequestRespone
}

export const RequestForm = ({ data }: Props) => {
  const { t } = useTranslation()
  const [update] = useUpdateRequestMutation()
  const [create] = useCreateRequestMutation()
  const profile = useCookie<Profile>("profile").getCookie()
  const departmentId = profile?.departmentId
  const { data: teachers } = useGetDepartmentsTeachersQuery(departmentId || 0)
  const navigate = useNavigate()
  const teachersSelect = teachers?.map(el => ({
    label: `${el.firstname}${el.lastname}`,
    value: `${el.id}`
  }))
  const form = useForm<RequestForm>({
    initialValues: {
      id: data?.id,
      titleKg: data?.titleKg || "",
      titleTr: data?.titleTr || "",
      descriptionKg: data?.descriptionKg || "",
      descriptionTr: data?.descriptionTr || "",
      curatorId: data?.curatorId || 0,
      isMyTheme: data?.isMyTheme === false ? false : true,
    },
    validate: {
      titleKg: (value) => !value,
      titleTr: (value) => !value,
      descriptionKg: (value) => !value,
      descriptionTr: (value) => !value,
      curatorId: (value) => !value,
    }
  })
  const handleSubmit = async (values: RequestForm) => {
    if (data) {
      try {
        await update(values).unwrap()
        notify(true, t("updated"))
        navigate("/request-thesis")
      } catch (error) {
        notify(false)
      }
    } else {
      try {
        await create(values).unwrap()
        notify(true, t("created"))
        navigate("/request-thesis")
      } catch (error) {
        notify(false)
      }
    }

  }
  console.log(form.values)
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid className="dark:text-white">
        <Grid.Col mt={20}>
          <Checkbox
            label={t("isMyTheme")}
            {...form.getInputProps("isMyTheme")}
            onChange={(event) => form.setFieldValue("isMyTheme", event.target.checked)}
            checked={form.values.isMyTheme}
            error={form.errors.isMyTheme}
          />
        </Grid.Col>
        <Grid.Col mt={20}>
          <Select
            label={t("teachers")}
            {...form.getInputProps("curatorId")}
            value={`${form.values.curatorId}`}
            data={teachersSelect}
            error={form.errors.isMyTheme}
          />
        </Grid.Col>
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
          <textarea
            style={{ width: "100%", height: "140px", padding: "10px" }}
            placeholder={t("descriptionKg")}
            value={form.values.descriptionKg}
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
