import { Button, Flex, Grid, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetDepartamentsQuery, useGetFacultiesQuery, useRegisterMutation } from 'src/store';
import { notify } from 'src/utils';

const initialValues: RegistrationType = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  patronomyc: "",
  facultyId: null,
  departmentId: null,
  phoneNumber: "",
};

export const SignUp = () => {
  const [register] = useRegisterMutation()
  const { t } = useTranslation();
  const { data: faculties } = useGetFacultiesQuery({})
  const navigate = useNavigate()
  const facultyData = faculties?.map(el => ({
    label: el.title,
    value: `${el.id}`
  }))
  const form = useForm({
    initialValues,
    validate: {
      email: (value) => !value,
      password: (value) => !value,
      firstname: (value) => !value,
      lastname: (value) => !value,
      patronomyc: (value) => !value,
      facultyId: (value) => !value,
      departmentId: (value) => !value,
      phoneNumber: (value) => !value,
    }
  })
  const { data: departments } = useGetDepartamentsQuery(form.values.facultyId || 0, {
    refetchOnMountOrArgChange: true,
  })
  const departamentData = departments?.map(el => ({
    label: el.title,
    value: `${el.id}`
  }))

  const handleSubmit = async (values: RegistrationType) => {
    try {
      await register(values).unwrap();
      notify(true, t("registered"))
      navigate("/sign-in")
    } catch (error) {
      console.error(error)
      notify(false)
    }
  }

  return (
    <section className="bg-gray-50 h-screen dark:bg-gray-900 text-center ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-[70vw] xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white h-16">
              {t('app-title')}
            </h3>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))} className="flex gap-4">
              <Grid ta="start" gutter={5}>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    {...form.getInputProps("firstname")}
                    error={form.errors.firstname}
                    label={t('firstname')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    {...form.getInputProps("lastname")}
                    error={form.errors.lastname}
                    label={t('lastname')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    {...form.getInputProps("patronomyc")}
                    error={form.errors.patronomyc}
                    label={t('patronomyc')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    {...form.getInputProps("phoneNumber")}
                    error={form.errors.phoneNumber}
                    label={t('phoneNumber')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    {...form.getInputProps("email")}
                    error={form.errors.email}
                    label={t('email')}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Select
                    {...form.getInputProps("facultyId")}
                    error={form.errors.facultyId}
                    label={t('facultyId')}
                    data={facultyData}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Select
                    {...form.getInputProps("departmentId")}
                    error={form.errors.departmentId}
                    label={t('departmentId')}
                    data={departamentData}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <PasswordInput
                    {...form.getInputProps("password")}
                    error={form.errors.password}
                    label={t('password')}
                  />
                </Grid.Col>
                <Grid.Col mt={10} span={12}>
                  <Flex gap={10} w="100%" justify="center">
                    <Button bg="orange" onClick={() => navigate("/")}>
                      {t("reset")}
                    </Button>
                    <Button bg="baseDark" type='submit'>
                      {t("send")}
                    </Button>
                  </Flex>
                </Grid.Col>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
