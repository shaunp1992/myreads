import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

class SearchBooks extends Component {
    
    state = {
        query: '',
    }
        
    updateQuery = (query => {
        this.setState({query: query})
    })
    
    render(){
        
        var showingBooks
        var { books } = this.props
        var { query }= this.state
        
        if(query){
            var match = new RegExp(escapeRegExp(query), 'i')
            showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
        }
        else{
            showingBooks = books
        }
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                      <Link to="/" className="close-search">Close</Link>
                      <div className="search-books-input-wrapper">
                          <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                      </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => ( 
                            <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <ul className="book-authors">
                                  {book.authors.map((author, index) => ( 
                                      <li key={index} className="book-author">{author}</li>
                                  ))}
                              </ul>    
                            </div>
                          </li>
                          ))}
                    </ol>
                </div>
            </div> 
        )
    }
  
}

export default SearchBooks