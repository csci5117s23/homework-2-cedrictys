import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { SignedOut, SignedIn, useAuth} from '@clerk/nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Todo from "@/components/todo"


export default function Home() {

  // api_endpoint
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { getToken, userId, isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);

  // to show add task div
  const [showDiv, setShowDiv] = useState(false)
  function handleButtonClick() {
    setShowDiv(prevShowDiv => !prevShowDiv)
  }

  useEffect(() => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        fetchData(token);
        setLoading(false);
      }
    }
    process();
  }, [isLoaded]);

  // get item
  const [todoItems, setTodoItems] = useState(null);
  const fetchData = async (token) => {
    const response = await fetch(API_ENDPOINT + "/todo", {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      }
    });

    const data = await response.json()
    setTodoItems(data.sort((a,b)=>(a.date <= b.date) ? 1 : -1));
    setLoading(false);
  }

  // to add todo item
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [newTodo, setNewTodo] = useState(null)

  function titleChange(e) {
    setTitle(e.target.value);
  };

  function contentChange(e) {
    setContent(e.target.value);
  };

  const newTodoItem = async(e) => {
    e.preventDefault();
    setNewTodo({title: title, content: content});
    const token = await getToken({ template: "codehooks" });
    if (content != "") {
      const response = await fetch(API_ENDPOINT + "/todo", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({title: title, content:content, userid:userId})
      });
      const data = await response.json()
    }
    fetchData(token);
    setTitle("");
    setContent("");
    setNewTodo(null);

  }

  if (loading) {
    return (
    <>
    <main className={styles.todoMain}>
      <div className={styles.todoList}>
        <h1>Loading ...</h1>
      </div>
    </main>
    </>
    )
  } else {
    const todoListsItem = todoItems.map((item) => (
      <div>
        <Todo 
          key={item.id}
          id={item._id}
          title={item.title}
          content={item.content}
          date={item.date}
          done={item.done}
          fetchData={fetchData}
        />
      </div>
    ));

  return (
    <>
    <Head>
      <title>Todo</title>
    </Head>
    <SignedIn>
    <main className={styles.todoMain}>
      <div className={styles.buttonPosition}>
        <button className={styles.addButton} onClick={handleButtonClick}>Add a task</button>
        <button className={styles.addButton}><Link href="/done" style={{ textDecoration: 'none', color: 'black' }}>Dones</Link></button>
      </div>
      {showDiv && <div>
        <form onSubmit={newTodoItem}>
          <textarea className={styles.takingTitle} rows="1" cols="60" name="text" placeholder="Title" id="title" value={title} onChange={titleChange}></textarea>
          <textarea className={styles.takingNote} rows="5" cols="60" name="text" placeholder="Take a note" id="content" value={content} onChange={contentChange}></textarea>
          <br/>
          <input type="submit" value="submit" className={styles.addButton}/>
          
        </form>
      </div> }
      <br></br>
      <div className={styles.todoList}>
        <h1>Your-todo list</h1>
        <div>{todoLists}</div>
      </div>
    </main>
    </SignedIn>
    <SignedOut>
    <main>
      <div className={styles.main}>
        <br></br>
        Looks like you are logged out !!
        <br></br>
        <button className={styles.button}><Link href="/login">Login</Link></button>
      </div>
    </main>
    </SignedOut>
    
    </>
    )
  }
}
  