import React, { Component } from 'react'

class Book extends Component {
    
    state = {
        shelf: this.props.book.shelf,
    }
    
    render(){
        
        var { book } = this.props
        
        return (
            <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={this.state.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none" selected>None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <ul className="book-authors">
                    {book.authors.map((author, index) => ( 
                            <li key={index} className="book-author">{author}</li>
                    ))}
                </ul> 
                <div>{book.shelf}</div>
            </div>
        )
    }
}

export default Book