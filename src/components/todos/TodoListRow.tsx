import { useTodoStore } from '@/stores/todo'
import { useState } from 'react'

export default function TodoListRow(todo: { title: string; id: string }) {
    const deleteTodo = useTodoStore(state => state.deleteTodo)
    const updateTodo = useTodoStore(state => state.updateTodo)
    const [value, setValue] = useState(todo.title)
    const [isEdit, setIsEdit] = useState(false)

    function deleteHandler(id: string) {
        deleteTodo(id)
    }

    function updateHandler(id: string, title: string) {
        updateTodo(id, title)
        setIsEdit(false)
    }

    function cancelHandler() {
        setIsEdit(false)
        setValue(todo.title)
    }

    return (
        <div className="mx-auto my-1 w-150 rounded-lg border border-gray-500 py-2">
            {isEdit ? (
                <input
                    className="border border-gray-500"
                    type="text"
                    value={value}
                    onChange={e => {
                        setValue(e.currentTarget.value)
                    }}
                />
            ) : (
                <span>{todo.title}</span>
            )}
            {isEdit ? (
                <button
                    className="mx-1 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => cancelHandler()}>
                    취소
                </button>
            ) : (
                <button
                    className="mx-1 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setIsEdit(true)}>
                    수정
                </button>
            )}

            {isEdit ? (
                <button
                    className="mx-1 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => updateHandler(todo.id, value)}>
                    수정
                </button>
            ) : (
                <button
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => deleteHandler(todo.id)}>
                    삭제
                </button>
            )}
        </div>
    )
}
