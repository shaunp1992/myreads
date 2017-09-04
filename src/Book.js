import React, { Component } from 'react'

class Book extends Component {
    
    state = {
        
    }
    
    convertCamelCase = (shelf) => {
        return shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase();})
    }    
    
    render(){
        var { book, onChangeShelf, onChangeRating, getShelfText, showShelf, showRating, showBuyButton } = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 130, height: 190, backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:null})`}}></div>
                    <div className="book-shelf-changer">
                      <select value={this.props.book.shelf ? this.props.book.shelf : "move"}  onChange={(e) => onChangeShelf(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="reading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        { book.shelf ? <option value="none">Remove</option> : null}
                      </select>
                    </div>
                </div>
               
                <div className="book-bottom">
                    <div className="book-data">
                        <div className="book-title">{book.title}</div>
                          <ul className="book-authors">
                            {book.authors ? book.authors.map((author, index) => ( 
                                    <li key={index} className="book-author">{author}</li>
                            )) : null}
                          </ul> 
                    </div>
                     
                    <div className="user-book-data">
                        {showShelf && book.shelf ? <div className="book-shelf">{this.convertCamelCase(book.shelf)}</div>:null}
                        {showRating && book.shelf === "read" ? 
                            <div id={"book-rating-" + book.id} className="book-rating ">
                                <input type="radio" name={"book-star-" + book.id} 
                                    onChange={(e) => onChangeRating(book, e.target.value)} value="5" id={"star-5-" + book.id}  
                                    checked={this.props.book.rating === "5"? true : false}
                                />
                                <label htmlFor={"star-5-" + book.id}></label>

                                <input type="radio" name={"book-star-" + book.id} 
                                    onChange={(e) => onChangeRating(book, e.target.value)} value="4" id={"star-4-" + book.id} 
                                    checked={this.props.book.rating === "4"? true : false}
                                />
                                <label htmlFor={"star-4-" + book.id}></label>

                                <input type="radio" name={"book-star-" + book.id} 
                                    onChange={(e) => onChangeRating(book, e.target.value)} value="3" id={"star-3-" + book.id}  
                                    checked={this.props.book.rating === "3"? true : false}
                                />
                                <label htmlFor={"star-3-" + book.id}></label>

                                <input type="radio" name={"book-star-" + book.id} 
                                    onChange={(e) => onChangeRating(book, e.target.value)} value="2" id={"star-2-" + book.id} 
                                    checked={this.props.book.rating === "2"? true : false}
                                />
                                <label htmlFor={"star-2-" + book.id}></label>

                                <input type="radio" name={"book-star-" + book.id} 
                                    onChange={(e) => onChangeRating(book, e.target.value)} value="1" id={"star-1-" + book.id} 
                                    checked={this.props.book.rating === "1"? true : false}
                                />
                                <label htmlFor={"star-1-" + book.id}></label>
                            </div>: null}
                        {showBuyButton && 
                            <div className="book-buy-button-container">
                                <a className="book-buy-button" href={book.infoLink}>Buy</a>
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default Book