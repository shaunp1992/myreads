import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book.js'

class SearchBooks extends Component {
    
    state = {
        query: '',
    }
        
    updateQuery = (query => {
        this.setState({query: query})
    })
    
    render(){
        
        var showingBooks
        var { books, onChangeShelf } = this.props
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
                                <Book book={book} onChangeShelf={this.props.onChangeShelf}></Book>
                          </li>
                        ))}
                    </ol>
                </div>
            </div> 
        )
    }
  
}

export default SearchBooks