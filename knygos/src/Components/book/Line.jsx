import { useContext } from 'react';
import Book from '../../Contexts/Book';

function Line({ book }) {

    const { setDeleteData, setModalData } = useContext(Book);
console.log(book)
    return (
        <li className="list-group-item">
            <div className="line" style={{
                justifyContent: 'center'
            }}>
                <div className="line__content" style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <div className="line__content__info">
                        {book.images ? <div className='img-bin'>
                            <img src={book.images} alt={book.type}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                     Country:   {book.titl}
                    </div>
                    <div className="line__content__info">
                        {book.image ? <div className='img-bin'>
                            <img src={book.image} alt={book.type}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__info">
                     <b>Type:</b>   {book.type}
                    </div>
                    <div className="line__content__info">
                    <b> Years:</b>   {book.years}
                    </div>
                    {/* <div className="line__content__info">
                    <b> Color:</b>   {book.color}
                    </div>
                    <div className="line__content__info">
                    <b> Price:</b>   {book.price}
                    </div> */}
                </div>
                <div className="line__buttons" style={{
                    margin: '0px'
                }}>
                    <button onClick={() => setModalData(book)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(book)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;