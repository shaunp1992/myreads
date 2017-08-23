import React, { Component } from 'react'

class Book extends Component {
    
    state = {
        
    }
    
    render(){
        var { book, onChangeShelf } = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={this.props.book.shelf} onChange={(e) => onChangeShelf(book, e.target.value)}>
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
                <div>{this.props.book.shelf}</div>
            </div>
        )
    }
}

export default Book