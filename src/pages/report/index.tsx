import { Button, Flex, Text } from "@mantine/core";
import { List, Paper, Table } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { getTitleByLanguage } from "src/locales";
import { useGetReportQuery } from "src/store";
import { CustomAppShell } from "src/ui-kits";
import { downloadExcel } from "react-export-table-to-excel";
import { notify } from "src/utils";
import { useMemo } from "react";

export const TableReport = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useGetReportQuery({})

  const header = [t("thesis"), t("teachers"), t("students")]
  const body = useMemo(() => {
    return data?.reportItems?.map(item => ([
      getTitleByLanguage({
        titleKg: item.thesisTitleKg,
        titleTr: item.thesisTitleTr
      }),
      `${item.curatorFirstname} ${item.curatorLastname}`,
      item.students?.map((student) => `${student.studentFirstname} ${student.studentLastname};`).toString() || ""
    ])) || []
  }, [data])
  const handleDownload = () => {
    try {
      downloadExcel({
        fileName: "Дипломдук иштер боюнча отчёт",
        sheet: "report",

        tablePayload: {
          header,
          body: body,
        },
      });
    } catch (error) {
      notify(false, "Катачылык кетти!", "Excel отчеттун даярдоодо катачылык кетти")
    }
  }


  const rows = data?.reportItems?.map((element) => (
    <Table.Tr key={element.thesisId}>
      <Table.Td>{getTitleByLanguage({
        titleKg: element.thesisTitleKg,
        titleTr: element.thesisTitleTr
      })}</Table.Td>
      <Table.Td>{element.curatorFirstname} {element.curatorLastname}</Table.Td>
      <Table.Td>
        <List>
          {element.students?.map(item => (
            <List.Item key={item.studentId}>
              {item.studentFirstname} {item.studentLastname}
            </List.Item>
          ))}
        </List>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <CustomAppShell>
        <Paper p={8}>
          <Flex w="100%" justify="end" mb={18}>
            <Button onClick={handleDownload}
              variant="outline">
              <IconDownload />
            </Button>
          </Flex>
          {isLoading ?
            <Text>Loading...</Text> :
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t("thesis")}</Table.Th>
                  <Table.Th>{t("teachers")}</Table.Th>
                  <Table.Th>{t("students")}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>}
        </Paper>
      </CustomAppShell>
    </>
  )
}