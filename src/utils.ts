import { FilterFieldsEnum, SortingOrderEnum, TFilter, TTodo } from "./types";

export const getFilteredTodos = (todos: TTodo[], filter: Partial<TFilter>) => {
        let preparedTodos = [...todos];
        if (Object.prototype.hasOwnProperty.call(filter, FilterFieldsEnum.sort)) {
          switch (filter[FilterFieldsEnum.sort]) {
            case SortingOrderEnum.All:
              preparedTodos = [...todos]
              break;
            case SortingOrderEnum.Active:
              preparedTodos = [...todos.filter(el => !el.isFinished)];
              break;
            case SortingOrderEnum.Complete:
              preparedTodos = [...todos.filter(el => el.isFinished)];
              break;
            default:
          }
        }

        if (Object.prototype.hasOwnProperty.call(filter, FilterFieldsEnum.search) && filter[FilterFieldsEnum.search]) {
            preparedTodos = preparedTodos.filter(el => el.title?.includes(filter[FilterFieldsEnum.search] as string))
        }

        return preparedTodos;
}