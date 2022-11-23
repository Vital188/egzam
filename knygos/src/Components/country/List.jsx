import { useContext } from 'react';
import Country from '../../Contexts/Country';
import Line from './Line';

function List() {

    const { country } = useContext(Country);

    return (
        <div className="card m-4">
            <h5 className="card-header">Country List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        country?.map(c => <Line key={c.id} country={c} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;