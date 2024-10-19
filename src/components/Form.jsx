import React, { useState } from 'react';

const Form = ({ onPageCreation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [cities, setCities] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const citiesArray = cities.split(',').map(city => city.trim());

        const response = await fetch(`${cmpApi.root}cmp/v1/create-pages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': cmpApi.nonce,
            },
            body: JSON.stringify({
                titles: title,
                description: description,
                excerpt: excerpt,
                cities: citiesArray,
            }),
        });

        if (response.ok) {
            const newPages = citiesArray.map(city => `${title} - ${city}`);
            onPageCreation(newPages);
            // Réinitialiser le formulaire
            setTitle('');
            setDescription('');
            setExcerpt('');
            setCities('');
        } else {
            console.error('Erreur lors de la création des pages');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Extrait"
                required
            />
            <input
                type="text"
                value={cities}
                onChange={(e) => setCities(e.target.value)}
                placeholder="Villes (séparées par des virgules)"
                required
            />
            <button type="submit">Créer Pages</button>
        </form>
    );
};

export default Form;
