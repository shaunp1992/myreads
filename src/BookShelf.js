import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book.js'
import $ from 'jquery';


class BookShelf extends Component {
    
    static propTypes ={
       books: PropTypes.array.isRequired,
       onChangeShelf: PropTypes.func.isRequired,
       onChangeRating: PropTypes.func,
   } 
    
    state ={
        sort : 'title',
        visibleShelf: 'all',
        active: false
    }
    
    componentDidMount() {
       this.setActiveTabUnderline()  
    }

    componentDidUpdate() {
       this.setActiveTabUnderline()      
    }

    setActiveTabUnderline(){
       var activeWidth = $('.active-tab').outerWidth()
       document.getElementById("tab-underline").style.width = activeWidth + "px"     
       
       var activeLeft = ($(".active-tab" ).position().left) - 175
       document.getElementById("tab-underline").style.marginLeft = activeLeft + "px"  
    }

    onChangeSortOrder(sortOption) {
         this.setState({ 
             sort: sortOption 
         })
    }

    onChangeVisibleShelf (visibleShelfSelection){
        this.setState({ 
             visibleShelf: visibleShelfSelection,
         })
      }

    render(){
        
        var { sort, visibleShelf } = this.state
        var { books, onChangeShelf, onChangeRating } = this.props
        var read = books.filter(book => book.shelf === "read")
        var reading = books.filter(book => book.shelf === "currentlyReading")
        var wantTo = books.filter(book => book.shelf === "wantToRead")
        reading.sort(sortBy(sort))
        wantTo.sort(sortBy(sort))
        read.sort(sortBy(sort))
        
        return (
         <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
                
            <div className="bookshelf-control-bar">
                <div className="bookshelf-tab-controls-container">
                    <div className="bookshelf-tab-controls">
                        <div id="all" className={"shelf-tab " + (visibleShelf === 'all' ? 'active-tab': '')} onClick={(e) => this.onChangeVisibleShelf(e.target.id)}>All</div>
                        <div id="read" className={"shelf-tab " + (visibleShelf === 'read' ? 'active-tab': '')} onClick={(e) => this.onChangeVisibleShelf(e.target.id)}>Read</div>
                        <div id="currentlyReading" className={"shelf-tab " + (visibleShelf === 'currentlyReading' ? 'active-tab': '')} onClick={(e) => this.onChangeVisibleShelf(e.target.id)}>Reading</div>
                        <div id="wantToRead" className={"shelf-tab " + (visibleShelf === 'wantToRead' ? 'active-tab': '')} onClick={(e) => this.onChangeVisibleShelf(e.target.id)}>Want To Read</div>
                    </div>
                    <hr id="tab-underline"/>
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
                                        <Book book={book} onChangeShelf={onChangeShelf} onChangeRating={onChangeRating} showRating={true} ></Book>
                                  </li>
                            ))}
                        </ol>
                      </div>
                    </div>:null
                }
                {visibleShelf === 'currentlyReading' || visibleShelf === 'all' ? 
                  <div className="bookshelf">
                      <h2 className="bookshelf-title">Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                            {reading.map((book) => (
                              <li key={book.id}>
                                    <Book book={book} onChangeShelf={onChangeShelf}></Book>
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
                                    <Book book={book} onChangeShelf={onChangeShelf} showBuyButton={true}></Book>
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