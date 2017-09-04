import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    
   static propTypes ={
       books: PropTypes.array.isRequired,
       onChangeShelf: PropTypes.func.isRequired,
   } 
    
   state = {
        query: '',
        searchResults: []
    }
        
    updateSearch(query, books) {
        this.setState({ query: query})
        
        if(query){ 
            BooksAPI.search(query, 20).then((searchResults) => {
                if(!searchResults.error){
                    this.setState({ 
                      searchResults: searchResults.map(searchedBook => {
                          books.forEach( book => {
                              if(searchedBook.id === book.id){
                                 searchedBook = book 
                               }
                          })
                          return searchedBook
                      })
                   })
                }
                else{
                     this.setState({ searchResults : []})
                }
            })   
        }
        else{
            this.setState({ searchResults : []})
        }
    }

    render(){
        
        var { searchResults, query }= this.state
        var { onChangeShelf, books } = this.props
        
        searchResults.sort(sortBy('title'))
        
        return (
            
            <div className="search-books">
                 <div className="list-books-title">
                    <h1>Add Book</h1>
                     <div className="search-books-input-wrapper">
                          <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateSearch(event.target.value, books)}/>
                         <div className="search-button" ><span className="search-icon"></span></div>
                      </div>
                </div>
                
                <div className="search-books-bar">
                    <div className="search-books-bar-inner">
                      <Link to="/" className="close-search">Close</Link>
                      
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.map((book) => ( 
                          <li key={book.id}>
                                <Book book={book} onChangeShelf={this.props.onChangeShelf} showShelf={true}></Book>
                          </li>
                        ))}
                    </ol>
                </div>
            </div> 
        )
    }
  
}

export default SearchBooks