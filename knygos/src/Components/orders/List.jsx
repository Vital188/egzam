import { useState, useEffect, useContext } from 'react';
import Orders from "../../Contexts/Orders";
import Line from './Line';



function List() {

    const { rubis } = useContext(Orders);
    const [stats, setStats] = useState({ rubsCount: null });

// useEffect(() => {
//     if (null === rubs) {
//         return;
//     }
//     setStats(s => ({ ...s, rubsCount: rubs.length }));
// }, [rubs]);

    useEffect(() => {
        if (null === rubis) {
            return;
        }
        setStats(s => ({ ...s, rubsCount: rubis.length }));
    }, [rubis]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Orders list ({stats.rubsCount})</h5>
            <div className="card-body">
                <ul className="list-group">
                     {
                        rubis?.map(r => <Line key={r.id} rubis={r}  />)
                    } 
                </ul>
            </div>
        </div>
    );
}

export default List;