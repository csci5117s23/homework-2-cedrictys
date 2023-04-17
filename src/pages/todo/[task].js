import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { SignedOut, SignedIn, useAuth} from '@clerk/nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Todo from "@/components/todo"
import { useRouter } from "next/router"


export default function Task() {

  // api_endpoint
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { getToken, userId, isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { item } = router.query;
  

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
  const [todoItems, setTodoItems] = useState([]);
  const fetchData = async (token) => {
    const response = await fetch(API_ENDPOINT + "/todo", {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      }
    });

    const data = await response.json()
    setData(data)
  }

  // edit 
  const [edit, setEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const isEditing = () => {
    setEditing(true);
  }
  const notEditing = () => {
    setEditing(false);
  }

  function newContentChange(e) {
    setBewContent(e.target.value);
  };

  const update = async (e) => {
    e.preventDefault();
    const token = await getToken({ template: "codehooks" });
    const response = await fetch(API_ENDPOINT + "/todo" + "/" + id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({_id:id, title: title, content:newContent, date:date, done:true, userid:userId})
    });

    setEditing(false);
    fetchData(token);
  }

  // item done
  const itemDone = async (e) => {
    e.preventDefault();
    const token = await getToken({ template: "codehooks" });
    const response = await fetch(API_ENDPOINT + "/todo" + "/" + id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({_id:id, title: title, content:content, date:date, done:true, userid:userId})
    });
    fetchData(token);
  }

  // item delete
  const itemDelete = async (e) => {
    const token = await getToken({ template: "codehooks" });
    await fetch(API_ENDPOINT + "/todo" + "/" + id, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + token,
      }
    });
    fetchData(token);
  }

  // to show add task div
  const [showDiv, setShowDiv] = useState(false)
  function handleButtonClick() {
    setShowDiv(prevShowDiv => !prevShowDiv)
  }
  
  if(rounter?.isFallback) {
    return (
        <>
        <main className={styles.todoMain}>
          <div className={styles.todoList}>
            <h1>Loading ...</h1>
          </div>
        </main>
        </>
        )
  }
  else {
  return (
    <>
    <Head>
      <title>Todo</title>
    </Head>
    <SignedIn>
    <main className={styles.todoMain}>
      <div className={styles.buttonPosition}>
        <button className={styles.addButton}><Link href="/todos" style={{ textDecoration: 'none', color: 'black' }}>Todos</Link></button>
        <button className={styles.addButton}><Link href="/done" style={{ textDecoration: 'none', color: 'black' }}>Done</Link></button>
      </div>
      <div className={styles.todoList}>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
        <button onClick={handleButtonClick} className={styles.addButton}>Edit</button>
        <button onClick={itemDelete} className={styles.addButton}>Delete</button>
        <button onClick={itemDone} className={styles.addButton}>Done</button>
      </div>
      {showDiv && <div>
        <form onSubmit={update}>
          <textarea className={styles.takingNote} rows="5" cols="60" name="text" placeholder="Take a note" id="content" value={newContent}></textarea>
          <br/>
          <input type="submit" value="submit" className={styles.addButton}/>
          
        </form>
      </div> }
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
  