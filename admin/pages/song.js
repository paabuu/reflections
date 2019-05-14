import Header from '../components/header';

function Food(props) {
    return (
        <div>
            <Header href="/song"></Header>
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
    const songCounter = {};

    data.data.forEach(d => {
        d.songs.forEach(s => {
            const [key, name] = Object.entries(s)[0];
            if (!songCounter[key]) {
                songCounter[key] = {
                    name: `${key} - ${name}`,
                    count: 1
                }
            } else {
                songCounter[key].count += 1;
            }
        })
    });

    return {
        data: Object.values(songCounter).sort((a, b) => b.count - a.count)
    };
}

export default Food;