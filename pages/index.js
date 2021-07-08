import Head from 'next/head'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";


const Home = () => {
    const [book, setBook] = useState('');
    const [result, setResult] = useState([]);
    const [apiKey, setApiKey] = useState('AIzaSyBmaJuN9GGB2NeieGeDYbWiMY3aoOPZGvQ')
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      await axios
        .get('https://www.googleapis.com/books/v1/volumes?q=' + book + '&key=' + apiKey + '&maxResults=40')
        .then(data => {
          setResult(data.data.items);
          setLoading(false)
        })
        .catch(error => {
        console.log(error.message)
        });     
    }
  
  const handleClear = () => {
    setBook('');
    setResult('')
    
  }
  
  return (
    <>
      <div className="root">
        <div className="wrapper">
          <Head>
            <link real="icon" href="/favicon.ico"></link>
          </Head>
          <h1>BookShelf</h1>
          <form onSubmit={handleSubmit} >
            <div className="search-block">
              {book ?
                <div className="clear" onClick={handleClear}>
                  <div className="clear__left"></div>
                  <div className="clear__right"></div>
                </div>
                : null
              }
              <input
                className="input"
                type="text"
                value={book}
                placeholder="Search for Books"
                onChange={(e) => setBook(e.target.value)}
                required
              />
              <button
                type="submit"
                className="search-btn"
              >
                Search
              </button>
            </div>
          </form>

          {loading ?
            <span><Loader type="ThreeDots" color="black" height={80} width={80} /></span>
            :
            (<div className="books">
              {result.length >= 1 ? result.map(book => 
                <div key={book.etag} className="book" >
                      <div className="book__title">
                        <h2>{book.volumeInfo.title}</h2>
                      </div>
                      <div className="book__img-block">
                      <a href={book.volumeInfo.previewLink} target="_blank">
                        {book.volumeInfo.imageLinks ?
                            <img className="book__img" src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                          :
                            <img className="book__img" src="img/img.jpg" alt={book.title} />

                        }
                      </a>
                      </div>
                      <div className="book__desc">
                        <div className="book__field">
                          <strong>Author: </strong>
                          {book.volumeInfo.authors}
                        </div>
                        <div className="book__field">
                          <strong>Published: </strong>
                          {book.volumeInfo.publishedDate}
                        </div>
                        <div className="book__field">
                          <strong>Publisher: </strong>
                          {book.volumeInfo.publisher}
                        </div>
                      </div> 
                    </div>
                  
                ) : <div className="flash-info">No books to show!</div>
              }
            </div>)
          }
          <footer>
            Made by
            <a href="https://github.com/marcelleemendess" target="_blank"> Marcelle Mendes</a>
          </footer>
        </div>  
      </div>
    </>
  )
  
}

export default Home
