import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { SignedOut, SignedIn} from '@clerk/nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


export default function Home() {

  // to show add task div
  const [showDiv, setShowDiv] = useState(false)
  function handleButtonClick() {
    setShowDiv(prevShowDiv => !prevShowDiv)
  }

  // to fetch data from todolist
  const fetchData = async (token) => {

    const response = await fetch(
      API_ENDPOINT + "/todolist" + "?completed=false&userid="+userId,
      {
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
      }
    );
    const data = await response.json();
    setItems(data.sort((a,b)=>(a.createdOn <= b.createdOn) ? 1 : -1));
    setLoading(false);
    const catesSet = new Set(data.map((item) => item.category));
    setTodoCates(catesSet);
  };

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
        <form>
        <textarea className={styles.takingTitle} rows="1" cols="60" name="text" placeholder="Title"></textarea>
          <textarea className={styles.takingNote} rows="5" cols="60" name="text" placeholder="Take a note"></textarea>
          <br/>
          <input type="submit" value="submit"/>
        </form>
      </div> }
      <br></br>
      <div className={styles.todoList}>
        <h1>Your-todo list</h1>
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
  