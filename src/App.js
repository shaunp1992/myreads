import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf.js'

class BooksApp extends React.Component {
  state = {
    books : [],
    showSearchPage: true,
  }
  
   componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })   
    }

    

  render() {

    return (
      <div className="app">
        
         <Route exact path='/' render={() => (
              <BookShelf></BookShelf>
            )}>
        </Route>    
        
        <Route path='/search' render={( {history} ) => (
              <SearchBooks books={this.state.books}></SearchBooks>
            )}>
        </Route>    
            
        
       

      </div>
    )
  }
}

export default BooksApp
