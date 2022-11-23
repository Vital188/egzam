import { useContext } from 'react';
import Book from '../../Contexts/Book';
import Line from './Line';

function List() {

    const { book } = useContext(Book);

    return (
        <div className="card m-4">
            <h5 className="card-header">Book List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        book?.map(r => <Line key={r.id} book={r} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;