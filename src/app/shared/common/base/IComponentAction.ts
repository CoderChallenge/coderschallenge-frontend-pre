import { IQueryOptions, IFilter } from '@app-shared/common/interface/IQueryOptions';
import { IError } from '@app-shared/common/model/IError';
import { IAlert } from '@app/shared/common/model/IAlert';
import { INameAndId } from '@app/shared/common/model/ILevel';


export interface IComponentAction {
    url: any;
    query: IQueryOptions;
    items: any;
    states: any;
    statuses: any;
    nameAndIds: INameAndId[];
    pager: any;
    item: any;
    size: number;
    sizes: Array<number>;
    genders: Array<string>;
    months: Array<string>;
    hideFilter: boolean;
    filter: any;
    error: IError;
    alert: IAlert;
    filterarray: IFilter[];
    notificationData: Array<any>;
    isUploading: boolean;
    paginationConfig?: { count: number; page: number; total: number };
    selectedIds: any;
    selectedAll: any;

    getParamValue: (key: string) => string;
    pageChanged: (event) => void;
    changePage: () => void;
    goBack();
    goTo(url);
    go(route, id);
    gotoRoute(route, id, other);
    goToNav(route);
    reloadComponent();
    setupPagination();
    genPagination();
    getNameAndId(url);
    getPageInfoDescription(): string;
    toggleFilter();
    titleRoute(title: string);
    secureData(value: any): string;
    unsecureData(value: any): string;
    checkUncheckAll();
    isAllSelected();
    getCheckedItemList();
    formatQueryString(): string;
}
