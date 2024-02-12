import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeepEqualMemo } from "../../hooks";
import { useLazySearchRequestQuery } from "src/store";
import Pagination from "../pagination";
import CustomLoader from "../custom-loader";
import HoverText from "../hover-text";
import { fakeUsers } from "src/assets/fake-users";

type Props<E> = {
    headCells: HeadCell<E>[];
    searchApiUrl?: string;
    onRowClick?: (row: E) => void;
    extraFilter?: object;
    doubleClickPath?: (row: E) => void;
};

const initResponse = {
    data: { content: fakeUsers, page: 0, totalElements: 4, totalPages: 1 },
    loading: false,
};





export const AppTable = <Entity extends {}>({
    headCells,
    searchApiUrl,
    onRowClick,
    extraFilter,
    doubleClickPath,
}: Props<Entity>) => {
    const { t } = useTranslation();

    const [searchRequest, { data: searchData, isLoading, isError }] =
        useLazySearchRequestQuery();

    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const rowsPerPageOptions = ["10", "25"];
    const [[page, rowsPerPage], setPagination] = useState([0, 10]);
    const { content, totalElements } = searchData ?? initResponse.data;
    const localFilter = useDeepEqualMemo(extraFilter);

    const search = useCallback(async () => {
        return await searchRequest(
            {
                path: searchApiUrl,
                body: {
                    filter: {
                        ...localFilter,
                    },
                    pageRequest: {
                        limit: rowsPerPage,
                        page: page,
                    },
                    sorting: {
                        sortBy: "ID",
                        sortDirection: "ASC",
                    },
                },
            },
            false
        );
    }, [searchRequest, searchApiUrl, localFilter, rowsPerPage, page]);

    useEffect(() => {
        if (extraFilter) {
            setPagination([0, rowsPerPage]);
        }
    }, [extraFilter, rowsPerPage]);

    useEffect(() => {
        search();
    }, [localFilter, rowsPerPage, search]);

    const getPageRecordInfo = () => {
        const firstRowNum = page * rowsPerPage + 1;
        const lastRowNum = firstRowNum + content.length - 1;

        return `${firstRowNum} - ${lastRowNum} из ${totalElements}`;
    };

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
            <div className="overflow-auto">
                {isLoading ? (
                    <CustomLoader />
                ) :
                    // isError ||
                    !content[0] ? (
                        <div className="flex items-center justify-center text-gray-600 dark:text-gray-200 text-2xl italic font-normal">
                            Записи не найдены
                        </div>
                    ) :
                        (
                            <table className="w-full table-auto border-collapse">
                                <thead className="border-b-2 border-b-gray-400 border-b-solid">
                                    <tr>
                                        {headCells.map((headCell) => {
                                            if (!headCell.display) {
                                                return (
                                                    <th key={headCell.label} className={`p-2 border-r-2 border-r-gray-400  dark:text-gray-200 last:border-r-0 text-gray-700 text-xs sm:text-sm xl:text-xl font-medium`}>
                                                        {headCell.label}
                                                    </th>
                                                );
                                            } else return null;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.map((row: Entity, index: number) => (
                                        <tr
                                            key={index}
                                            className={`${selectedRow === index ? "bg-gray-300 dark:bg-gray-600" : ""
                                                } cursor-pointer`}
                                            onDoubleClick={() => handleDoubleClick(row)}
                                            onClick={() => {
                                                handleRowClick(row);
                                                setSelectedRow(index);
                                            }}>
                                            {headCells.map((cell) => {
                                                if (!cell.display) {
                                                    const value = cell.render?.(row);
                                                    return (
                                                        <td
                                                            key={cell.label}
                                                            className="px-2 max-w-[230px] text-gray-900 py-3 dark:text-gray-300 font-medium whitespace-nowrap overflow-hidden text-center"
                                                        >
                                                            {cell.label === "№" ? (
                                                                index + 1 + page * rowsPerPage
                                                            ) : value && value.toString().length > 32 ? (
                                                                <HoverText
                                                                    width={350}
                                                                    text={value.toString().slice(0, 32) + "..."}
                                                                    hoverText={value}
                                                                />
                                                            ) : (
                                                                value ?? "-"
                                                            )}
                                                        </td>
                                                    );
                                                } else return null;
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
            </div>
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
                <p className="text-sm">{getPageRecordInfo()}</p>
                <div className="ml-4">
                    <Pagination
                        total={Math.ceil(totalElements / rowsPerPage)}
                        onChange={handleChangePage}
                        size="xs"
                        color={isLoading ? "gray" : "indigo"}
                    />
                </div>
            </div>
        </div>
    );
};
