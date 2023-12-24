import i18next from 'i18next';
import { useCookie } from '../hooks';

interface MyObject {
  titleRu: string;
  titleKg: string;
  titleEn: string;
  [key: string]: any | undefined;
}

type UniversalObject<T extends MyObject> =
  | Record<string, T[keyof T]>
  | undefined
  | null;

export const getTitleByLanguage = <T extends MyObject>(
  object: UniversalObject<T>,
): string => {
  if (!object) return '-';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const i18lng = i18next.language;
  const lang: string = i18lng === 'tr' ? 'titleTr' : 'titleKg';
  return object[lang] || '-';
};
