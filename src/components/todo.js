import Link from "next/link";
import { useAuth } from "@clerk/nextjs";


export default function Todo({id, title, content, date, done, fetchData, userid}) {

  // api endpoint
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { getToken, userId } = useAuth();

  // todo done
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

  // delete todo
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


  return (
    <>
    <div key={id}>
      <Link href="/todo/${id}"><h2>{title}</h2></Link>
      <button onClick={itemDelete} className={styles.addButton}>Delete</button>
      <button onClick={itemDone} className={styles.addButton}>Done</button>
    </div>
    </>
  )
}