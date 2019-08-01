import React from 'react';
import './style.css';

import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import ReservePage from '../../pages/ReservePage';


const NavigationBar = () => {
    return(
        <div className='Navbar'>
            <Router>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/Reserve'>Reserve a Room</Link>
                            </li>
                        </ul>
                    </nav>
                </header> 

                <Route path='/' exact component={HomePage} />
                <Route path='/Reserve' component={ReservePage} />
            </Router>
        </div>
    );
}

export default NavigationBar;