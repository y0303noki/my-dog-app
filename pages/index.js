import { useEffect, useState } from "react";

export default function Home() {
  const [dogImage, setDogImage] = useState("");
  const [dogName, setDogName] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        setDogImage(data.message);

        // 画像URLから犬の名前を抽出
        const urlParts = data.message.split("/");
        const dogNameFromUrl = urlParts[urlParts.length - 2];
        setDogName(dogNameFromUrl);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Random Dog Image</h1>
      <p>Name: {dogName}</p>
      <img src={dogImage} alt="Random Dog" />
    </div>
  );
}
