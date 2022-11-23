import { useState, useEffect, useContext } from 'react';
import Orders from "../../Contexts/Orders";
import Lines from './Lines'


function Listas() {

    const { rubs } = useContext(Orders);
    const [stats, setStats] = useState({ rubsCount: null });
    const [total, setTotal] = useState({ totalPrice: null});

    useEffect(() => {
        if (null === rubs) {
            return;
        }
        setStats(s => ({ ...s, rubsCount: rubs.length }));
    }, [rubs]);

    useEffect(() => {
        if (null === rubs) {
            return;
        }
        setTotal(o => ({ ...o, totalPrice: rubs.reduce((a, b) => (a + b.price), 0) }));
    }, [rubs]);


    return (
        <div className="card m-4">
            <h5 className="card-header">
                Your orders list:
                cloths number: {stats.rubsCount}, 
                total price: {total.totalPrice}
                </h5>
            <div className="card-body">

                <ul className="list-group">
                    {
                        rubs?.map(r => <Lines key={r.id} rubs={r}   />)
                    }
                </ul>  
            </div>
        </div>
        
    );
}

export default Listas;