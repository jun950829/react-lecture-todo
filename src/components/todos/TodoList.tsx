import { useTodoStore } from '@/stores/todo'
import { useEffect } from 'react'
import TodoListRow from './TodoListRow'

export default function TodoList() {
    const todos = useTodoStore(state => state.todos)
    const getTodos = useTodoStore(state => state.getTodos)

    // const { todos, getTodos } = useTodoStore()

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <>
            {todos.map(todo => {
                return (
                    <TodoListRow
                        key={todo.id}
                        title={todo.title}
                        id={todo.id}
                    />
                )
            })}
        </>
    )
}
