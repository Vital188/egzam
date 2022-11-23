import { useContext } from 'react';
import Category from '../../Contexts/Category';
import Line from './Line';

function List() {

    const { category } = useContext(Category);

    return (
        <div className="card m-4">
            <h5 className="card-header">Categories List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        category?.map(c => <Line key={c.id} category={c} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;