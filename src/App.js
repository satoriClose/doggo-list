import { useEffect, useState } from "react";
import { fetchImages } from "./api";
import { css } from "@emotion/css";

function Header() {
  const headerStyle = css`
    padding: 8px;
    background-color: hotpink;
    color: #471212;
    font-size: 24px;
    border-radius: 4px;
  `;
  return (
    <header className={headerStyle}>
      <h1>Doggo</h1>
    </header>
  );
}

function Image(props) {
  const itemStyle = css`
    border-radius: 0px;
    width: 32%;
    height: 300px;
    background: #3d9fb1;
    margin-bottom: 10px;
  `;
  const imgStyle = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;
  return (
    <div className={itemStyle}>
      <img src={props.src} alt="cute dog" className={imgStyle} />
    </div>
  );
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  const itemsStyle = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &::after {
      content: "";
      display: block;
      width: 32%;
      height: 0;
    }
  `;

  return (
    <gallery>
      <div className={itemsStyle}>
        {urls.map((url) => {
          return <Image src={url} />;
        })}
      </div>
    </gallery>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      setUrls(urls);
    });
  }, []);

  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }

  const mainStyle = css`
    padding: 10px 0px 0px 0px;
  `;

  return (
    <main className={mainStyle}>
      <section>
        <div>
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section>
        <Gallery urls={urls} />
      </section>
    </main>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <select name="breed" defaultValue="shiba">
              <option value="shiba">柴犬</option>
              <option value="pug">パグ</option>
              <option value="borzoi">ボルゾイ</option>
            </select>
          </div>
          <div>
            <button type="submit">Reload</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
      </p>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
