import Link from "next/link";
import { useAuth  } from "@clerk/nextjs";


export default function Todo({id, title, content, date, done, fetchData}) {

  // api endpoint
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { getToken } = useAuth();

  // todo done
  const itemDone = async (e) => {
    const token = await getToken({ template: "codehooks" });
    const response = await fetch(API_ENDPOINT + "/todo" + "/" + id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({_id:id, title: title, content:content, date:date, done:true})
    });

    const data = await response.json()
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
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={itemDelete}>Delete</button>

    </div>
    </>
  )
}