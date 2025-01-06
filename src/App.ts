import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import './components/AddTodo';
import './components/TodoList';
import './components/Filter';
import { styles } from './styles'
import { SortingOrderEnum, TFilter, TNewTodo, TTodo } from './types';
import { getFilteredTodos } from './utils';

const mock = [
    {
        "authorName": "opkopkop",
        "title": "opkop",
        "isFinished": false,
        "id": 1
    },
    {
        "authorName": "opkopkopopkop",
        "title": "opkopopkopkop",
        "isFinished": false,
        "id": 2
    }
]

@customElement('todo-app')
export class App extends LitElement {
  @state() todos: TTodo[] = mock;
  @state() filter: TFilter = {
    sort: SortingOrderEnum.All,
  }

  onAddTodo = (data: {detail: {value: TNewTodo}}) => {
    this.todos = [...this.todos, {...data.detail.value, isFinished: false, id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1}];
  }

  onCheckTodo = (data: {detail: {value: number}}) => {
    this.todos = this.todos.map(el => el.id === data.detail.value ? {...el, isFinished: !el.isFinished} : el)
  }

  onDeleteTodo = (data: {detail: {value: number}}) => {
    this.todos = this.todos.filter(el => el.id !== data.detail.value)
  }

  onFilterChange = (data: {detail: Partial<TFilter>}) => {
    this.filter = {...this.filter, ...data.detail}
  }

  onEditTodo = (data: {detail: {value: TTodo}}) => {
    console.log("data", data);
    this.todos = this.todos.map(el => el.id === data.detail.value.id ? {...data.detail.value} : el);
  }


  render() {
    return html`
    <div class="container">
      <div class="box">
        <h1 class="title">Todos:</h1>
        <add-todo @onAddTodo=${this.onAddTodo}></add-todo>
        <todo-filter @onFilterChange=${this.onFilterChange} ></todo-filter>
        <todo-list @onCheckTodo=${this.onCheckTodo} @onEditTodo=${this.onEditTodo}  @onDeleteTodo=${this.onDeleteTodo} .todos=${getFilteredTodos(this.todos, this.filter)}></todo-list>
      </div>
    </div>
    `
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-app': App
  }
}
