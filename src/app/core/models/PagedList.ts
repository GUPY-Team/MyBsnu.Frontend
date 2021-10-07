export interface PagedList<T> {
    items: T[];
    currentPage: number;
    totalPages: number;
    pageSize: number;
    count: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export class EmptyPagedList<T> implements PagedList<T> {
    items = [];
    currentPage = 0;
    totalPages = 0;
    pageSize = 0;
    count = 0;
    totalCount = 0;
    hasPreviousPage = false;
    hasNextPage = false;
}

export interface Pagination {
    page: number;
    pageSize: number;
}

interface PaginationConstants {
    readonly minPage: number;
    readonly defaultPage: number;
    readonly minPageSize: number;
    readonly defaultPageSize: number;
    readonly defaultMaxPageSize: number;
    readonly extendedMaxPageSize: number;
}

export const PaginationConstants: PaginationConstants = {
    minPage: 1,
    defaultPage: 1,
    minPageSize: 1,
    defaultPageSize: 10,
    defaultMaxPageSize: 100,
    extendedMaxPageSize: 32767
};
