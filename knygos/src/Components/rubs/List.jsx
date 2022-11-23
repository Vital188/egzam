import { useContext } from 'react';
import Rubs from "../../Contexts/Rubs";
import Line from './Line';

function List() {

    const { rubs } = useContext(Rubs);

    return (
        <div className="card m-4">
            <h5 className="card-header">Book List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        rubs?.map(r => <Line key={r.id} rubs={r} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;