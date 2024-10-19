import React from 'react';

const PageList = ({ pages }) => {
    return (
        <div>
            <h2>Pages Créées</h2>
            <ul>
                {pages.length > 0 ? (
                    pages.map((page, index) => (
                        <li key={index}>{page}</li>
                    ))
                ) : (
                    <li>Aucune page créée.</li>
                )}
            </ul>
        </div>
    );
};

export default PageList;
