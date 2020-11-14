'use strict';

class ToDo {
    constructor ( form, input, todoList, todoCompleted, todoItem, todoRemoveComplete ) {
        this.form = document.querySelector( form );
        this.input = document.querySelector( input );
        this.todoList = document.querySelector( todoList );
        this.todoCompleted = document.querySelector( todoCompleted );
        this.todoItem = document.querySelectorAll( todoItem );
        this.todoRemoveComplete = document.querySelectorAll( todoRemoveComplete );
        this.todoData = new Map( JSON.parse( localStorage.getItem( 'toDoList' ) ) );
    }
    addToStorage () {
        localStorage.setItem( 'toDoList', JSON.stringify([...this.todoData]) );
    }
    render () {
        this.input.required = true;
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.input.value = '';
        this.todoData.forEach( this.createItem, this );
        this.addToStorage();
    }
    createItem ( todo ) {
        const li = document.createElement( 'li' );

        li.classList.add( 'todo-item' );
        li.key = todo.key;
        li.insertAdjacentHTML( 'beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if ( todo.completed ) {
            this.todoCompleted.prepend( li );
        } else {
            this.todoList.prepend( li );
        }
    }
    addTodo ( event ) {
        event.preventDefault();

        if ( this.input.value.trim() ) {
            this.input.required = false;

            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };

            this.todoData.set( newTodo.key, newTodo );
            this.render();
        }
    }
    deleteItem ( element ) {
        this.todoData.forEach( item => {
            if ( element.key === item.key ) this.todoData.delete( item.key );
        });
        this.render();
    }
    completedItem ( element ) {
        this.todoData.forEach( item => {
            if ( element.key === item.key) {
                if ( item.completed ) item.completed = false;
                else item.completed = true;
            }
        });
        this.render();
    }
    generateKey () {
        return Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 );
    }
    handler () {
        document.querySelector( '.todo-container' ).addEventListener( 'click', event => {
            let target = event.target;
            const element = target.parentNode.parentNode;

            if ( target.matches( '.todo-remove' ) ) {
                this.deleteItem( element );
            } else if ( target.matches( '.todo-complete' ) ) {
                this.completedItem( element );
            }
        });
    }
    init () {
        this.form.addEventListener( 'submit', this.addTodo.bind( this ) );
        this.handler();
        this.render();
    }
}

const todo = new ToDo( '.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-item', '.todo-complete' );
todo.init();