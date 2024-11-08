import {useEffect, useState} from "react";
import axios from "axios";


type Todo = {
    id: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "DONE";
};

export default function Home(){

    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        console.log("loaded all todos")
        loadAllTodos()
    }, [])

    const loadAllTodos = () => {
        axios.get("/api/todo")
            .then((response) =>{
                setTodos(response.data)
            })
            .catch((error) => {
                console.error("Error loading todos", error)
            })
    }

    return(
        <>
            <h1>Home</h1>
            <button onClick={loadAllTodos}>Load todos</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <strong>{todo.description}</strong> - {todo.status}
                    </li>
                ))}
            </ul>
        </>
    );
}

