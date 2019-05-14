import Header from '../components/header';

function Food(props) {
    return (
        <div>
            <Header href="/food"></Header>
            {
                props.data.map((d, index) => (
                    <p key={index}>
                        <span>{d.name}</span>
                        <span>{d.count}</span>
                    </p>
                ))
            }
            <style jsx>{`
                p {
                    width: 100%;
                    font-family: 'Kaiti'
                }

                p span:first-child {
                    display: inline-block;
                    width: 80%;
                }
            `}</style>
        </div>
    );
}

Food.getInitialProps = async function() {
    const res = await fetch('http://39.106.163.180:5002/api/records');
    const data = await res.json();
    const foodCounter = {};

    data.data.forEach(d => {
        d.orders.forEach(o => {
            if (!foodCounter[o.id]) {
                foodCounter[o.id] = {
                    name: o.name,
                    count: o.count
                }
            } else {
                foodCounter[o.id].count += o.count;
            }
        })
    });

    return {
        data: Object.values(foodCounter).sort((a, b) => b.count - a.count)
    };
}

export default Food;