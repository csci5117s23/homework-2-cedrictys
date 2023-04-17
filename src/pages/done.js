import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { SignedOut, SignedIn, useAuth} from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import Todo from "@/components/todo"


export default function Done() {

  // api_endpoint
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { getToken, userId, isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);

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
  const [doneItems, setDoneItems] = useState([]);
  const fetchData = async (token) => {
    const response = await fetch(API_ENDPOINT + "/todo?done=true&userid=" + userId, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      }
    });

    const data = await response.json()
    setDoneItems(data)
    setLoading(false);
  }

    const doneListsItem = doneItems.map((item) => (
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
        <button className={styles.addButton}><Link href="/todos" style={{ textDecoration: 'none', color: 'black' }}>Todos</Link></button>
      </div>
      <br></br>
      <div className={styles.todoList}>
        <h1>Your done todo list</h1>
        <p>Hooray!! You have done these tasks!!</p>
        <div className={styles.todoListItem}>{doneListsItem}</div>
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
// }
  