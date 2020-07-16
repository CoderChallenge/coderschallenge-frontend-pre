import { IQueryOptions } from './IQueryOptions';

export class QueryBuilder {
     static toQueryString(query: IQueryOptions): string {
        // tslint:disable-next-line:max-line-length
        return `?page=${query.page}&count=${query.count}&orderByExpression=${query.orderByExpression}&whereCondition=${query.whereCondition}`;
    }
}
