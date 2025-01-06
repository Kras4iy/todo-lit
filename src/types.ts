export type TNewTodo = {
    authorName?: string
    title?: string,
}

export type TTodo = TNewTodo & {
    id: number,
    isFinished: boolean,
    isEditing?: boolean,
}

export enum SortingOrderEnum {
    All='All',
    Active='Active',
    Complete='Complete',
}

export enum FilterFieldsEnum {
    sort='sort',
    search='search'
}

export type TFilter = {
    [FilterFieldsEnum.sort]: SortingOrderEnum,
    [FilterFieldsEnum.search]?: string,
}