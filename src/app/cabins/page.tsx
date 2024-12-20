// COMPONENTS
import { Counter } from "@/components";

export default async function CabinsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  console.log("MY DATA", data);

  return (
    <div>
      <h1>CabinsPage</h1>

      <ul>
        {data.map((singleData: { id: number; name: string }) => (
          <li key={singleData.id}>{singleData.name}</li>
        ))}
      </ul>

      <Counter users={data} />
    </div>
  );
}
