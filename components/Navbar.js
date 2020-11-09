import {useState, useEffect, Fragment} from 'react';
import Link from 'next/link';
import { useRouter, withRouter } from "next/router";

const Navbar = () =>{
    
    const [item, setItem] = useState('');
    const router = useRouter();

    useEffect(() => {
        if(router.query.search){
            setItem(String(router.query.search))
        }
    }, [])

    useEffect(() => {
    }, [router.query.search])

    return(
        <Fragment>
            <header role="banner" data-siteid="MLTest" className="nav-header">
                <nav className="navbar">
                    <Link href="/">
                        <a className="navbar-brand" />
                    </Link>
                    <div className="form-inline">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nunca dejes de buscar" aria-label="search" aria-describedby="search-addon"
                                onChange={(e) => setItem(e.target.value)} value={item}
                            />
                            <div className="input-group-prepend">
                                <Link href={`/items?search=${item}`}>
                                    <span className="input-group-text">
                                        <img src="../assets/images/ic_Search.png" className="d-inline-block align-top" alt="" loading="lazy" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </Fragment>
    )
}

export default Navbar;