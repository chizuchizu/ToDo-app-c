import React, { useEffect, useState, useCallback } from "react";
import { fetchImages } from "./api";


function Header() {
    return(
        <div>
            <section class="hero is-primary">
                <div class="hero-body">
                    <p class="title">ToDo App</p>
                    <p class="subtitle">日々の進捗どうですか</p>
                </div>
            </section>
        </div>
    )
}

function Footer() {
    return(
        <div>
            <footer class="footer">
                <div class="content has-text-centered">
                    <p><strong>ToDo App</strong> by Ochi Yuma</p>
                </div>
            </footer>
        </div>
    )
}

const UlTodos = React.memo((props) => {
    const mapped_todos = props.todos.map(
        (todo, i) =>  {
            return (
                <div class="box" key={i}>
                    <nav class="level">
                        <div class="level-left">
                            {todo.task}
                            <p>&nbsp;&nbsp;</p>
                        </div>
                        <div class="level-right">
                            <button class="delete" onClick={() => props.handleDeleteTask(i)}>Delete</button>
                        </div>
                    </nav>
                </div>
            ) 
        }
    )
    console.log("mapped",mapped_todos)
    return(
        <div class="section">
        <div class="level-item">
            <ul>{mapped_todos}</ul>
        </div>
        </div>
    ) 
})

function Main() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState(
        []
    )

    const handleChange = (event) => {
        setText(
            () => event.target.value
        )
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.log("clicked");

        setTodos(
            todos_ => [...todos_, { task: text }]
        )
        console.log(todos);

        setText(
            () => ""
        )
    }
    
    const handleDelete = useCallback((index) => {
        const newTodos = todos.slice();
        newTodos.splice(index, 1);

        setTodos(newTodos);
    }, [todos])

    return(
        <div>
            <div class="section">
                <div class="level-item">
                    <div class="field has-addons">
                        <p class="control">
                            <input class="input is-rounded" value={text} onChange={handleChange} type="text" placeholder="add your task" type="input"></input>
                        </p>
                        <p class="control">
                            <button class="button is-primary" type="submit" onClick={handleClick}>Submit</button>
                        </p>
                    </div>
                </div>
                <UlTodos todos={todos} handleDeleteTask={handleDelete}/>
            </div>
        </div>
    )
}



function App() {
  return (
    <div>
        <Header />
        <Main />
        <Footer />
    </div>
  );
}

export default App;

