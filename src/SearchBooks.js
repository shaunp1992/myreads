import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    
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
                           books.filter( book => {
                               if(searchedBook.id === book.id){
                                  searchedBook.shelf = book.shelf 
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
                <div className="search-books-bar">
                      <Link to="/" className="close-search">Close</Link>
                      <div className="search-books-input-wrapper">
                          <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateSearch(event.target.value, books)}/>
                      </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.map((book) => ( 
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