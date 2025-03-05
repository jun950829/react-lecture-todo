import { create } from 'zustand'
import { combine } from 'zustand/middleware'

interface Todo {
    id: string
    order: number
    title: string
    done: boolean
    createdAt: string
    updatedAt: string
}

export const useTodoStore = create(
    // combine(상태, 액션 함수)
    combine(
        {
            todos: [] as Todo[]
        },
        (set, get) => ({
            getTodos: async () => {
                const data: Todo[] = await requestTodo({})

                set(state => ({ todos: (state.todos = [...data]) }))
            },

            createTodo: async (title: string) => {
                const data: Todo = await requestTodo({
                    method: 'POST',
                    data: {
                        title
                    }
                })

                const { todos } = get()
                set({
                    todos: [data, ...todos]
                })
            },

            updateTodo: async (id: string, title: string) => {
                const data: Todo = await requestTodo({
                    endpoint: id,
                    method: 'PUT',
                    data: {
                        title,
                        done: false
                    }
                })

                const { todos } = get()
                set({
                    todos: [data, ...todos.filter(todo => todo.id !== id)]
                })
            },

            deleteTodo: async (id: string) => {
                const data: boolean = await requestTodo({
                    endpoint: id,
                    method: 'DELETE'
                })
                if (data) {
                    const { todos } = get()
                    set({
                        todos: [...todos.filter(todo => todo.id !== id)]
                    })
                }
            }
        })
    )
)

async function requestTodo(payload: {
    endpoint?: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: unknown
}) {
    const { endpoint = '', method = 'GET', data } = payload

    const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos${'/' + endpoint}`,
        {
            method,
            headers: {
                'content-type': 'application/json',
                apikey: 'KDT8_bcAWVpD8',
                username: 'KDT8_ParkYoungWoong'
            },
            body: data ? JSON.stringify(data) : undefined
        }
    )

    return await res.json()
}
