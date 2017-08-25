import React, { Component } from 'react'

class Book extends Component {
    
    state = {
        
    }
    
    convertCamelCase = (shelf) => {
        return shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase();})
    }    
    
    render(){
        var { book, onChangeShelf, showShelf, getShelfText } = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:null})`}}></div>
                    <div className="book-shelf-changer">
                      <select value={this.props.book.shelf ? this.props.book.shelf : "move"}  onChange={(e) => onChangeShelf(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        { book.shelf ? <option value="">Remove</option> : null}
                      </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                  <ul className="book-authors">
                    {book.authors ? book.authors.map((author, index) => ( 
                            <li key={index} className="book-author">{author}</li>
                    )) : null}
                  </ul> 
                <div className="user-book-data">
                    {showShelf && book.shelf ? <div className="book-shelf">{this.convertCamelCase(book.shelf)}</div>:null}
                </div>
            </div>
        )
    }
}

export default Book