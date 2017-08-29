import React, { Component } from 'react'

class Book extends Component {
    
    state = {
        
    }
    
    convertCamelCase = (shelf) => {
        return shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase();})
    }    
    
    
    
    render(){
        var { book, onChangeShelf, onChangeRating, showShelf, getShelfText } = this.props

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
                    {book.shelf === "read" ? <div className="book-rating">
                        <fieldset id={"book-rating-" + book.id}>
                            <input type="radio" name={"book-star-" + book.id} 
                                onChange={(e) => onChangeRating(book, e.target.value)} value="1" 
                                checked={this.props.book.rating === "1"? true : false}
                            />
                            <input type="radio" name={"book-star-" + book.id} 
                                onChange={(e) => onChangeRating(book, e.target.value)} value="2" 
                                checked={this.props.book.rating === "2"? true : false}
                            />
                            <input type="radio" name={"book-star-" + book.id} 
                                onChange={(e) => onChangeRating(book, e.target.value)} value="3" 
                                checked={this.props.book.rating === "3"? true : false}
                            />
                            <input type="radio" name={"book-star-" + book.id} 
                                onChange={(e) => onChangeRating(book, e.target.value)} value="4" 
                                checked={this.props.book.rating === "4"? true : false}
                            />
                            <input type="radio" name={"book-star-" + book.id} 
                                onChange={(e) => onChangeRating(book, e.target.value)} value="5" 
                                checked={this.props.book.rating === "5"? true : false}
                            />
                        </fieldset>
                    </div>: null}
                    
                </div>
            </div>
        )
    }
}

export default Book