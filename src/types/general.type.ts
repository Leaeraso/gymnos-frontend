export interface PaginatedResponse<T> {
    data: T[];
    paginate: {
        page: number;
        pageSize: number;
        total: number;
    };
} 