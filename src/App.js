import React, { Component, View } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf.js'


class BooksApp extends React.Component {
    
  state = {
    books : [], 
  }
  
   componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })   
    }
    
    changeShelf = (book, newShelf) => {
        book.shelf = newShelf;
        BooksAPI.update(book, newShelf).then(
         this.setState(state => ({
           books: state.books.filter(b => b.id !== book.id).concat([book])
         }))
       );        
    }    

  render() {
      
    return (
      <div className="app">
         <Route exact path='/' render={() => (
              <BookShelf books={this.state.books} onChangeShelf={this.changeShelf}></BookShelf>
            )}>
        </Route>    
        <Route path='/search' render={( {history} ) => (
                <SearchBooks books={this.state.books} onChangeShelf={this.changeShelf}></SearchBooks>
            )}>
        </Route>    
      </div>
    )
  }
}

export default BooksApp
