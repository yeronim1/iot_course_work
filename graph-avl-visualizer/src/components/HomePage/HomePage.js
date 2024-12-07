import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <h1 className="homepage-title">Виберіть режим:</h1>
            <div className="homepage-container">
                <div className="homepage-card">
                    <h2>BFS</h2>
                    <Link to="/graph">
                        <button className="homepage-button">Start</button>
                    </Link>
                </div>
                <div className="homepage-card">
                    <h2>AVL Tree</h2>
                    <Link to="/avl-tree">
                        <button className="homepage-button">Start</button>
                    </Link>
                </div>
            </div>
            <footer className="homepage-footer">Internet of Things 2024</footer>
        </div>
    );
};

export default HomePage;
