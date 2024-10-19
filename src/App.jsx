import React, { useState } from 'react';
import Form from './components/Form';
import PageList from './components/PageList';

const App = () => {
    const [pages, setPages] = useState([]);

    const handlePageCreation = (newPages) => {
        setPages((prevPages) => [...prevPages, ...newPages]);
    };

    return (
        <div>
            <h1>Créer des Pages</h1>
            <Form onPageCreation={handlePageCreation} />
            <PageList pages={pages} />
        </div>
    );
};

export default App;
