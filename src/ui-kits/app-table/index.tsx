import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeepEqualMemo } from "../../hooks";

type Props<E> = {
    headCells: HeadCell<E>[];
    searchApiUrl?: string;
    onRowClick?: (row: E) => void;
    extraFilter?: object;
    doubleClickPath?: (row: E) => void;
};

export const AppTable = <Entity extends {}>({
    headCells,
    searchApiUrl,
    onRowClick,
    extraFilter,
    doubleClickPath,
}: Props<Entity>) => {
    const { t } = useTranslation();

    const rowsPerPageOptions = ["10", "25"];
    const [[page, rowsPerPage], setPagination] = useState([0, 10]);
    const localFilter = useDeepEqualMemo(extraFilter);


    useEffect(() => {
        if (extraFilter) {
            setPagination([0, rowsPerPage]);
        }
    }, [extraFilter, rowsPerPage]);

    const handleRowClick = (row: Entity) => onRowClick?.(row);

    const handleChangePage = (newPage: number) =>
        setPagination([newPage - 1, rowsPerPage]);

    const handleChangeRowsPerPage = (event: string | null) => {
        if (event) {
            setPagination([0, Number.parseInt(event)]);
        }
    };

    const handleDoubleClick = (row: Entity) => {
        if (doubleClickPath) {
            doubleClickPath(row)
        }
    }
    return (
        <div className="h-full flex flex-col justify-between min-w-full min-h-[37.8rem] py-2 xs:p-4 ">
            <div className="flex items-center gap-2 justify-end text-gray-600 dark:text-gray-400">
                <p className="text-sm">{t`rowsInPage`}: </p>
                <select
                    className="w-16 text-center border rounded-md bg-gray-900"
                    value={rowsPerPage.toString()}
                    onChange={(e) => handleChangeRowsPerPage(e.target.value)}
                >
                    {rowsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
