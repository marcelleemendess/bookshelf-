import styles from '../styles/Home.module.css'
import Books from '../components/Books'
import { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {
    const [book, setBook] = useState('');
    const [result, setResult] = useState([]);
    const [apiKey, setApiKey] = useState('AIzaSyBmaJuN9GGB2NeieGeDYbWiMY3aoOPZGvQ')
    const [loading, setLoading] = useState(false)
  

    const handleChange = (e) => {
      const book = e.target.value;

      setBook(book);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      await axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+apiKey+'&maxResults=40')
      .then(data => {
        setResult(data.data.items);
        console.log(data.data.items);
      })
      .catch(error => {
        console.log(error)
      });
      setBook('');
      
    }
  
    return (
      <div className="root">
        <div className="wrapper">
          <h1>BookShelf</h1>
          <form onSubmit={handleSubmit} >
            <div className="search-block">
              <input
                className="input"
                type="text"
                placeholder="Search for Books"
                onChange={handleChange}
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
          
          <div className="books">
            {result.length >= 1 ? result.map(book => 
              <div key={book.etag}className="book" >
                    <div className="book__title">
                      <h2>{book.volumeInfo.title}</h2>
                    </div>
                    <div className="book__img-block">
                      <a  href={book.volumeInfo.previewLink} target="_blank">
                        <img className="book__img" src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
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
                
            ) : <div className="flash-info">No books to show!</div>}
          </div>
            <footer>
            Made by
            <a href="https://github.com/marcelleemendess" target="_blank"> Marcelle Mendes</a>
          </footer>
        </div>
        
      </div>
    
    )
  
}

export default Home
