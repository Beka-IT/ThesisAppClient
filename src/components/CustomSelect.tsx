import { useTranslation } from "react-i18next";

interface CustomSelectItem {
  id: number,
  textKg: string,
  textTr: string,
}

interface CustomSelectList {
  titleKg: string
  titleTr: string
  data: CustomSelectItem[]
}

const CustomSelect = ({data, titleKg, titleTr}: CustomSelectList) => {
  const { i18n } = useTranslation();
  
  return(
      <select id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {
          data.map(o => {
            return <option value={o.id}>{ i18n.language == 'kg' ? o.textKg : o.textTr}</option>
          })
        }
      </select>
  )
}

export default CustomSelect;