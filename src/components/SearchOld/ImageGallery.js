import { useState, useEffect } from "react";
import { PixabayFetch } from "./pixabay";
import ImageGalleryItem from "./ImageGalleryItem";



//для запроса
const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
const BASE_URL = `https://api.themoviedb.org/3/`;
const newPixabayFetch = new PixabayFetch(API_KEY, BASE_URL);

export default function ImageGallery({ searchValue }) {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState("init");


  useEffect(() => {
    newPixabayFetch.searchQuery = searchValue;
    if (searchValue === "") {
      return;
    }
    setStatus("pending");
    newPixabayFetch
      .searchPhotos()
      .then((searchResults) => {
        setSearchResults(searchResults);
        setStatus("success");
        scrolling();
      })
      .catch(() => {
        setStatus("error");
      });
  }, [searchValue]);

  const scrolling = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (status === "init") {
    return null;
  }
 
  if (status === "success") {
    return (
      <>
        <ul className="ImageGallery">
          {searchResults.length > 0 &&
            searchResults.map((picture) => {
              return (
                <ImageGalleryItem
                  key={picture.id} title={picture.title}
                />
              );
            })}
          
        </ul>
      </>
    );
  }
  if (status === "error") {
    if (searchResults.length === 0) {
      return alert(`Sorry, we have not find such word... Lets try again!`);
    }
  }
}
