import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  const [dogImages, setDogImages] = useState([]); // 過去の犬の画像を格納するステート
  const [dogName, setDogName] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mainImageWidth, setMainImageWidth] = useState("300px"); // メインの画像の幅
  const [previousImagesWidth, setPreviousImagesWidth] = useState("100px"); // 過去の画像の幅

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        const newDogImages = [...dogImages, data.message]; // 新しい画像を配列に追加
        setDogImages(newDogImages);

        setDogName(getDogNameFromUrl(data.message)); // 画像URLから犬の名前を取得

        setImageLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setImageError(true);
      });
  }, []);

  const getNewDogImage = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        const newDogImages = [...dogImages, data.message]; // 新しい画像を配列に追加
        setDogImages(newDogImages);

        setDogName(getDogNameFromUrl(data.message)); // 画像URLから犬の名前を取得

        setImageLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setImageError(true);
      });
  };

  // 画像URLから犬の名前を抽出する関数
  const getDogNameFromUrl = (imageUrl) => {
    const urlParts = imageUrl.split("/");
    return urlParts[urlParts.length - 2];
  };

  const handleImageLoad = (event) => {
    // 画像の幅を設定
    const imgWidth = event.target.width;
    if (dogImages.length === 0) {
      // メインの画像の幅
      setMainImageWidth(`${imgWidth}px`);
    } else {
      // 過去の画像の幅
      setPreviousImagesWidth(`${imgWidth}px`);
    }
    setImageLoaded(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h1>Random Dog Image</h1>
          <p>Name: {dogName}</p>
          {imageError ? (
            <p>Error loading image.</p>
          ) : (
            <>
              {imageLoaded ? (
                <img
                  src={dogImages[dogImages.length - 1]}
                  alt="Random Dog"
                  className="img-fluid"
                  onLoad={handleImageLoad}
                  style={{ maxWidth: mainImageWidth }} // メインの画像の幅を指定
                />
              ) : (
                <p>Loading image...</p>
              )}
            </>
          )}
          <Button variant="primary" className="mt-3" onClick={getNewDogImage}>
            Get New Dog
          </Button>
        </Col>
      </Row>

      {/* 過去の犬の画像を表示 */}
      <Row className="mt-5 justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h2>Previous Dog Images</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {dogImages.slice(0, -1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Dog ${index}`}
                className="img-thumbnail m-2"
                style={{ maxWidth: previousImagesWidth }} // 過去の画像の幅を指定
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
