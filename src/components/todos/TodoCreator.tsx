import { useTodoStore } from '@/stores/todo'
import { useRef, useState } from 'react'

export default function TodoCreator() {
    const [title, setTitle] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const createTodo = useTodoStore(state => state.createTodo)

    function handleCreate() {
        createTodo(title)
    }
    function handleCreate2() {
        createTodo(inputRef.current?.value || '')
    }

    return (
        <div className="flex-column mg-auto">
            <div>
                <input
                    className="rounded-md"
                    value={title}
                    onChange={e => {
                        setTitle(e.currentTarget.value)
                    }}
                    placeholder="할 일을 입력하세요."
                    onKeyDown={e => {
                        if (e.nativeEvent.isComposing) return
                        if (e.key == 'Enter') {
                            handleCreate
                        }
                    }}
                />
                <button onClick={handleCreate}>추가!</button>
            </div>
            <div>
                <input
                    className="rounded-md"
                    ref={inputRef}
                    placeholder="할 일을 입력하세요."
                />
                <button onClick={handleCreate2}>추가!</button>
            </div>
        </div>
    )
}
