import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Book from './Book.js'


class BookShelf extends Component {
    
    state ={
        sort : 'title',
        visibleShelf: 'all'
    }

    onChangeSortOrder(sortOption) {
         this.setState({ 
             sort: sortOption 
         })
    }

    onChangeVisibleShelf(){
//         this.setState({ 
//             visibleShelf: visibleShelfSelection 
//         })
        console.log("clicked");
    }

    onChangeVisibleShelf (visibleShelfSelection){
        this.setState({ 
             visibleShelf: visibleShelfSelection 
         })
      }

    render(){
        
        var { sort, visibleShelf } = this.state
        var { books, onChangeShelf, onChangeRating, onChangeVisibleShelf, onClicky } = this.props
        
        var read = books.filter(book => book.shelf === "read")
        var reading = books.filter(book => book.shelf === "currentlyReading")
        var wantTo = books.filter(book => book.shelf === "wantToRead")
        
        reading.sort(sortBy(sort))
        wantTo.sort(sortBy(sort))
        read.sort(sortBy(sort))
        
        return (
         <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads App</h1>
            </div>
            
                
            <div className="bookshelf-control-bar">
                <div className="bookshelf-tab-controls">
                    <div id="all" onClick={(e) => this.onChangeVisibleShelf(e.target.id)}>All</div>
                    <div id="read" onClick={(e) => this.onChangeVisibleShelf(e.target.id)}>Read</div>
                    <div id="currentlyReading" onClick={(e) => this.onChangeVisibleShelf(e.target.id)}>Currently Reading</div>
                    <div id="wantToRead" onClick={(e) => this.onChangeVisibleShelf(e.target.id)}>Want To Read</div>
                </div>
                
                <div className="bookshelf-sorting-controls">
                    <select value={sort} onChange={(e) => this.onChangeSortOrder(e.target.value)}>
                            <option value="title">Title</option>
                            <option value="authors">Authors</option>
                            <option value="rating">Rating</option>
                    </select>
                </div>   
            </div>    
             
                
            <div className="list-books-content">
              <div>
                  
                  {visibleShelf === 'read' || visibleShelf === 'all' ? 
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
                        </div>:null
                  }
                  
                  
                 {visibleShelf === 'currentlyReading' || visibleShelf === 'all' ? 
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
                    </div>:null
                 }
                  
                 {visibleShelf === 'wantToRead' || visibleShelf === 'all' ? 
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
                     </div>:null
                 }
                  
                  
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