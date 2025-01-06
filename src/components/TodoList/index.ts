import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { type TTodo } from "../../types";
import { map } from "lit/directives/map.js";

@customElement("todo-list")
export class TodoList extends LitElement {
    @property({type: Array}) todos: TTodo[] = []
    @state() localTodos: TTodo[] = [];

    onCheck = (todo: TTodo) => {
        this.dispatchEvent(new CustomEvent('onCheckTodo', {detail: {value: todo.id}}))
    }

    onDelete = (todo: TTodo) => {
        this.dispatchEvent(new CustomEvent('onDeleteTodo', {detail: {value: todo.id}}))
    }

    onStartEditing = (id: number) => {
        if (!this.localTodos.find(el => el.id === id)?.isFinished) {
            this.localTodos = this.localTodos.map(el => el.id === id ? {...el, isEditing: true} : el)
        }
    }

    @query('#editableInput') input ?: HTMLInputElement;

    onBlur = (id: number) => {
        const editedTodo = this.localTodos.find(el => el.id === id);

        if (editedTodo && this.input) {
            this.dispatchEvent(new CustomEvent('onEditTodo', {detail: {value: {...editedTodo, isEditing: false, title: this.input.value }}}))
        }
    }


    protected updated(_changedProperties: PropertyValues): void {
        if(_changedProperties.has('todos')) {
            this.localTodos = [...this.todos]
        }

        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        return html`
            <table class="table">
                <tr>
                    <th>#</th>
                    <th>isFinished</th>
                    <th>Title</th>
                    <th></th>
                </tr>
                ${map(this.localTodos, (el) => html`
                    <tr>
                        <td>${el.id}</td>
                        <td>${el.isFinished}</td>
                        <td class="is-expanded">
                            ${el.isEditing 
                            ? html`<input id="editableInput" .value=${el.title || ''} @blur=${() => this.onBlur(el.id)}>` 
                            : html`<p @dblclick=${() => this.onStartEditing(el.id)}>
                                ${el.title}
                            </p>` }
                        </td>
                        <td>
                            <div class="actions">
                                ${!el.isFinished ? html`<button @click=${() => this.onCheck(el)}>finish</button>` : ''}
                                <button @click=${() => this.onDelete(el)} >delete</button>
                                ${!el.isFinished ? html`<button @click=${() => this.onStartEditing(el.id)}>edit</button>` : ''}
                            </div>
                        </td>
                    </tr>
                        `)}
            </table>
        `
    }

    static styles = css`
        .table {
            width: 100%;
        }

        .table td, .table th {
            border: solid #dbdbdb;
            border-width: 0 0 1px;
            padding: .25em .5em;
            vertical-align: middle;
            text-align: inherit;
        }

        .is-expanded {
            width: 100%;
        }

        .actions {
            display: flex;
            gap: 10px
        }
    `
}