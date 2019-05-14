import Link from 'next/link';

const Header = (props) => (
    <div className="header">
        <Link href="/">
            <a className={props.href === '/' ? 'link active' : 'link'}>访问记录</a>
        </Link>
        <Link href="/food">
            <a className={props.href === '/food' ? 'link active' : 'link'}>食物排行</a>
        </Link>
        <Link href="/song">
            <a className={props.href === '/song' ? 'link active' : 'link'}>歌曲排行 </a>
        </Link>
        <style jsx>{`
            .link {
                text-decoration: none;
                color: #000;
                font-weight: bold;
                margin-right: 20px;
                border-radius: 5px;
                background-color: #ccc;
                font-size: 14px;
                line-height: 1.5;
                padding: 5px;
            }    
            .active {
                color: #fff;
                background-color: skyblue;
            }

            .header {
                width: 100%;
                padding: 22px 0 10px;
            }
        `}</style>
    </div>
);

export default Header;