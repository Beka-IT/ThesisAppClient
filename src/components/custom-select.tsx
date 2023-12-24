import { getTitleByLanguage } from 'src/locales';

interface CustomSelectItem {
  id: number;
  titleKg: string;
  titleTr: string;
}

interface CustomSelectList {
  defaultValue: { titleKg: string; titleTr: string };
  data: CustomSelectItem[];
  value: string;
  onChange: (value: string) => void;
}

export const CustomSelect = ({
  data,
  value,
  onChange,
  defaultValue,
}: CustomSelectList) => {
  return (
    <select
      onChange={(el) => onChange(el.currentTarget.value)}
      value={value || getTitleByLanguage(defaultValue)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {data.map((o) => {
        return (
          <option key={o.id} value={o.id}>
            {getTitleByLanguage(o) === '-' ? null : getTitleByLanguage(o)}
          </option>
        );
      })}
    </select>
  );
};
