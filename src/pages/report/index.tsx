import { Button, Flex, Text } from "@mantine/core";
import { List, Paper, Table } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { getTitleByLanguage } from "src/locales";
import { useGetReportQuery } from "src/store";
import { CustomAppShell } from "src/ui-kits";

export const TableReport =() => {
    const {t} = useTranslation()
    const {data, isLoading} = useGetReportQuery({})

    const handleDownloadExcel = () => {
      if(data){
        //@ts-ignore
        const url = window.URL.createObjectURL(new Blob([data.reportItems]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Дипломдук иштер боюнча отчёт.xlsx`);
        document.body.appendChild(link);
        link.click();
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
        
        <CustomAppShell>
        <Paper p={8}>
          <Flex w="100%" justify="end" mb={18}>
            <Button 
              onClick={handleDownloadExcel}
              variant="outline">
              <IconDownload/>
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
    )
}