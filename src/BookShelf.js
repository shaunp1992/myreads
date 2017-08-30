import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Book from './Book.js'


class BookShelf extends Component {
    
    state ={
        sort : 'title'
    }
    
    onChangeSortOrder(sortOption) {
         this.setState({ 
             sort: sortOption 
         })
    }

    render(){
        
        var { sort } = this.state
        var { books, onChangeShelf, onChangeRating } = this.props
        
        var read = books.filter(book => book.shelf === "read")
        var reading = books.filter(book => book.shelf === "currentlyReading")
        var wantTo = books.filter(book => book.shelf === "wantToRead")
        
        reading.sort(sortBy(sort))
        wantTo.sort(sortBy(sort))
        read.sort(sortBy(sort))
        
        var options = [
          { value: 'title', label: 'Title' },
          { value: 'authors', label: 'Author' }
        ];

        return (
         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            
            <div className="bookshelf-controls">
                <select value={sort} onChange={(e) => this.onChangeSortOrder(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="authors">Author/s</option>
                        <option value="rating">Rating</option>
                </select>
            </div>    
                
            <div className="list-books-content">
              <div>
                 <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {read.map((book) => (
                              <li key={book.id}>
                                    <Book book={book} onChangeShelf={this.props.onChangeShelf} onChangeRating={this.props.onChangeRating} ></Book>
                              </li>
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {reading.map((book) => (
                          <li key={book.id}>
                                <Book book={book} onChangeShelf={this.props.onChangeShelf}></Book>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {wantTo.map((book) => (
                              <li key={book.id}>
                                    <Book book={book} onChangeShelf={this.props.onChangeShelf}></Book>
                              </li>
                        ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
                <Link to="/search" className="add-book">Add a book</Link>
            </div>
          </div>
        )
    }
  
}

export default BookShelf