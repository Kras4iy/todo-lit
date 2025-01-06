import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FilterFieldsEnum, SortingOrderEnum, TFilter } from "../../types";
import { map } from "lit/directives/map.js";

@customElement('todo-filter')
export class Filter extends LitElement {
    @property({type: Object}) filter: TFilter = {sort: SortingOrderEnum.All}

    onChangeFilter = (key: keyof TFilter) => (event) => {
        this.dispatchEvent(new CustomEvent('onFilterChange', {detail: {[key]: event.target.value}}))
    }

    render() {
        return html`
            <div>
                <select .value=${SortingOrderEnum.Active} @change=${this.onChangeFilter(FilterFieldsEnum.sort)}>
                    ${map(Object.keys(SortingOrderEnum), (option) => html`
                        <option value=${option} ?selected=${this.filter.sort === option}>${option}</option>
                    `)}
                </select>
                <input .value=${this.filter.search || ''} @input=${this.onChangeFilter(FilterFieldsEnum.search)}>
            </div>
        `
    }
}