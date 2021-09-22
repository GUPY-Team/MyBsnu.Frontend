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
