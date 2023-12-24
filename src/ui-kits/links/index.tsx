import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { useMediaQuery } from 'src/hooks';

type LinksProps = {
  path: string;
  icon: ReactNode;
  title: string;
  open: boolean;
  onClick: (a: boolean) => void;
};

export const Links = ({ icon, path, title, open, onClick }: LinksProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Link
      to={path}
      onClick={() => isMobile && onClick(false)}
      className="flex items-center justify-start gap-5 text-gray-900 dark:text-white"
    >
      <div className="w-8 h-8">{icon}</div>
      {open && (
        <h3 className="font-semibold text-2xl -mt-2">
          {t(`${title.toLowerCase()}`)}
        </h3>
      )}
    </Link>
  );
};
