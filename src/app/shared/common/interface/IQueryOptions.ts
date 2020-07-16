export interface IQueryOptions {
    page?: number;
    count?: number;
    orderByExpression?: {};
    whereCondition?: string;
}

export interface IFilter {
    key: string;
    value: number;
}

