import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { type TNewTodo } from "../../types";



@customElement('add-todo')
export class AddTodo extends LitElement {
    @state() newTodo: TNewTodo = {
        authorName: undefined,
        title: undefined,
    }

    onAddTodo = () => {
        this.dispatchEvent(new CustomEvent('onAddTodo', {detail: {value: {...this.newTodo}}}))
    }

    
    onChange = (type: keyof TNewTodo) => (event) => {
        this.newTodo = {...this.newTodo, [type]: event.target.value}
    }
    

    render() {
        return html`
            <div>
                <label for='newTodoAuthor'>
                    Author name
                </label>
                <input id="newTodoAuthor" @input="${this.onChange('authorName')}">
            </div>
            <div>
                <label for="newTodoTitle">
                    Title
                </label>
                <input id="newTodoTitle" @input="${this.onChange('title')}">
            </div>
                <button @click=${this.onAddTodo}>Add New Todo</button>
        `
    }

    static styles = css`
        :host {
            display: flex;
            gap: 10px;
        }

        label {
            display: block;
        }
    `
}