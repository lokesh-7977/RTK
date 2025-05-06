"use client"
import { useQuery } from "@tanstack/react-query"

export default function Page() {
  const { status, data, error } = useQuery({
    queryKey: ['joke'],
    queryFn: async () => {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?amount=10');
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      return response.json();
    },
  })

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error' && error instanceof Error) {
    return <span>Error: {error.message}</span>
  }

  if (status === 'success' && data) {
    return (
      <div>
        <h1>Jokes</h1>
        <ul>
          {data.jokes.map((joke: any, index: number) => (
        <li key={index}>
          {joke.type === 'twopart' ? (
            <div>
          <p><strong>Setup:</strong> {joke.setup}</p>
          <p><strong>Delivery:</strong> {joke.delivery}</p>
            </div>
          ) : (
            <p>{joke.joke}</p>
          )}
        </li>
          ))}
        </ul>
      </div>
    );
  }

  return null; 
}