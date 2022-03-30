import React from "react";

import { BrowserRouter as Router,
         Routes,
         Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        <Routes>
            <Route 
                path="/"
                element={<Join/>}
            ></Route>
            <Route
                path="/chat"
                element={<Chat/>}
            ></Route>
        </Routes>
    </Router>
);

export default App;