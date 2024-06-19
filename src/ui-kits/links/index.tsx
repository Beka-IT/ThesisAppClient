import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Title, Tooltip } from '@mantine/core';
import { useMediaQuery } from 'src/hooks';

type LinksProps = {
    path: string;
    icon: ReactNode;
    title: string;
    open: boolean;
    onClick: (a: boolean) => void;
};

export const Links = ({ icon, path, title, open, onClick }: LinksProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <Link
            to={path}
            onClick={() => isMobile && onClick(false)}
            className="flex items-center w-full justify-start px-4 sm:px-6 py-5 gap-5 duration-300 text-gray-900 dark:text-white dark:hover:bg-white/20 hover:bg-gray-900/20"
        >
            <Flex gap={12} align="center">
                {open ?
                    <Box h={18} w={18}>
                        {icon}
                    </Box> :
                    <Tooltip label={title}>
                        {icon}
                    </Tooltip>
                }
                {open && (
                    <Title lh={1.4} fz={{ base: 14, sm: 16, xl: 18 }}>
                        {title}
                    </Title>
                )}
            </Flex>
        </Link>
    );
};
