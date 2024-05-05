import { CustomAppShell } from "src/ui-kits"
import { DateTimePicker } from "@mantine/dates"
import { Button, Center, Grid, TextInput } from "@mantine/core"
import { DeadlineTime } from "src/components"
import { useCreateDeadlineMutation } from "src/store"
import { DateTime, notify } from "src/utils"
import { useForm } from "@mantine/form"
import { useTranslation } from "react-i18next"

export const DeadlinePage = () => {
    const [createDeadline] = useCreateDeadlineMutation()
    const { t } = useTranslation()
    const form = useForm({
        initialValues: {
            endDate: DateTime.GetNow(),
            academicYear: ""
        }
    })


    const handleSubmit = async (values: Deadline) => {
        try {
            await createDeadline(values).unwrap()
            notify(true, t("saved"))
        } catch (error) {
            notify(false, t("cant-save"))
        }
    }
    return (
        <CustomAppShell>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Grid className="dark:text-white">
                            <Grid.Col>
                                <DateTimePicker
                                    minDate={DateTime.GetNow()}
                                    {...form.getInputProps("endDate")}
                                    error={form.errors.endDate}
                                    label={t("choose-date")}
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <TextInput
                                    placeholder="2024"
                                    {...form.getInputProps("academicYear")}
                                    error={form.errors.academicYear}
                                    label={t("academicYear")}
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Button type="submit" bg="baseDark">
                                    {t("save")}
                                </Button>
                            </Grid.Col>
                        </Grid>

                    </form>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Center>
                        <DeadlineTime />
                    </Center>
                </Grid.Col>
            </Grid>
        </CustomAppShell>
    )
}
