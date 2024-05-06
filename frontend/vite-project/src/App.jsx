import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        console.log(data); // Log the fetched books
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>Title:</strong> {book.title}, <strong>Author:</strong>{" "}
            {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
