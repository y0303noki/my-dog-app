import { useEffect, useState } from "react";

export default function Home() {
  const [dogImage, setDogImage] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setDogImage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Random Dog Image</h1>
      <img src={dogImage} alt="Random Dog" />
    </div>
  );
}
