import fetch from 'isomorphic-unfetch'
import Header from '../components/header';

// const data = [
//     {"orders":[{"name":"咖喱饭","price":32,"songs":["09","20","0F","34","55"],"mainMaterials":"鸡肉，咖喱","materials":"胡萝卜，土豆，洋葱，鸡肉，咖喱","desc":"精选大块香嫩鸡肉与新鲜配菜，配以滑顺浓郁的地道黄咖喱，吃完唇齿留香，意犹未尽。","count":1,"id":"zhushi_0","imageUrl":"https://greatwhole90.com/overcook/reflection/assets/zhushi/im_01@3x.png","type":"zhushi"},{"name":"腊味煲仔饭","price":35,"songs":["0C","1Z","56"],"mainMaterials":"广式腊肠","materials":"广式腊肠，大米，油菜，姜，葱，老抽，盐，糖，生抽","desc":"色泽金黄，干香脆口，滋味悠长，回味无穷","count":1,"id":"zhushi_1","imageUrl":"https://greatwhole90.com/overcook/reflection/assets/zhushi/im_02@3x.png","type":"zhushi"},{"name":"牛肉面","price":28,"songs":["12","3B"],"mainMaterials":"牛腩，面条","materials":"牛腩，白萝卜，面条，桂皮，三奈，肉蔻，生姜，沙姜，香叶，花椒，葱，蒜苗","desc":"牛肉口感滋润，面条筋道顺滑，四十年品质如一。","count":1,"id":"zhushi_2","imageUrl":"https://greatwhole90.com/overcook/reflection/assets/zhushi/im_03@3x.png","type":"zhushi"}],"songs":[{"0F":"0015-福原希己江 - あさりの酒蒸し"},{"0C":"0012-阿鲲 - 才下舌尖 又上心间"},{"3B":"0119-Mader - Banquet"}],"_id":"5ccebe0f3265a83c8731bc8e","time":"2019-05-05 18:42:23","__v":0}
// ];

function Home(props) {
    return (
        <div>
            <Header href="/"></Header>
            <div className="record-container">
                {props.data.map((r, index) => (
                    <div className="each-record" key={r._id}>
                        <span className="record-index">{props.data.length - index}</span>
                        <p>时间：{r.time}</p>
                        <div className="orders">
                        <span>菜单：</span>
                            {
                                r.orders.map((o, i) => <span className="each-food" key={i}>{o.name}</span>)
                            }      
                        </div>
                        <div className="songs">
                            <span>歌单：</span>
                            {
                                r.songs.map((s, i) => <span className="each-song" key={i}>{concatSong(s)}</span>)
                            }
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .record-container {
                    font-family: 'Kaiti';
                    font-size: 14px;
                }
                .each-record {
                    position: relative;
                    border: 1px solid #ccc;
                    margin-top: 16px;
                    padding: 12px;
                    box-sizing: border-box;
                    border-radius: 10px;
                }

                .record-index {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #eee;
                    text-align: center;
                    line-height: 20px;
                    font-size: 14px;
                }

                p {
                    margin: 4px 0 6px;
                    font-weight: bold;
                }

                .each-food {
                    background-color: #eee;
                    color: #000;
                    border-radius: 8px;
                    font-size: 12px;
                    padding: 4px;
                    margin-right: 16px;
                }

                .each-song {
                    display: inline-block;
                    border: 1px solid #eee;
                    color: #000;
                    border-radius: 8px;
                    font-size: 10px;
                    padding: 4px;
                    margin-right: 16px;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    )
}

export function concatSong(song) {
    const key = Object.keys(song)[0];
    const name = song[key];

    return `${key} - ${name}`;
}

Home.getInitialProps = async function() {
    const res = await fetch('http://39.106.163.180:5002/api/records');
    const data = await res.json();
    // console.log(data)
    return {
        data: data.data.reverse()
    };
}

export default Home