"use client";

// REACT
import { useState } from "react";

interface User {
  id: number;
  name: string;
}

interface CounterProps {
  users: User[];
}

export default function Counter({ users }: CounterProps) {
  const [count, setCount] = useState(0);

  console.log(users);

  return (
    <button onClick={() => setCount(prevCount => prevCount + 1)}>
      {count}
    </button>
  );
}
