import { useState, useEffect, useContext } from 'react';
import Orders from "../../Contexts/Orders";
import Line from './Line';



function List() {

    const { book } = useContext(Orders);
    const [stats, setStats] = useState({ rubsCount: null });

// useEffect(() => {
//     if (null === rubs) {
//         return;
//     }
//     setStats(s => ({ ...s, rubsCount: rubs.length }));
// }, [rubs]);

    useEffect(() => {
        if (null === book) {
            return;
        }
        setStats(s => ({ ...s, rubsCount: book.length }));
    }, [book]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Orders list ({stats.rubsCount})</h5>
            <div className="card-body">
                <ul className="list-group">
                     {
                        book?.map(r => <Line key={r.id} book={r}  />)
                    } 
                </ul>
            </div>
        </div>
    );
}

export default List;