import React, { useState } from 'react';
import { Form as BootstrapForm, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported

const Form = ({ onPageCreation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [cities, setCities] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                cities: cities,
            }),
        });

        if (response.ok) {
            const newPages = cities.map(city => `${title} - ${city}`);
            onPageCreation(newPages);
            setTitle('');
            setDescription('');
            setExcerpt('');
            setCities([]);
            setShowSuccessModal(true);
        } else {
            console.error('Erreur lors de la création des pages');
        }
    };

    const handleCityChange = (event) => {
        const options = event.target.options;
        const selectedCities = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedCities.push(options[i].value);
            }
        }
        setCities(selectedCities);
    };

    return (
        <>
            <BootstrapForm onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
                <BootstrapForm.Group controlId="formTitle">
                    <BootstrapForm.Label style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Titre</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre"
                        required
                        style={{ fontSize: '1rem' }}
                    />
                </BootstrapForm.Group>
                <BootstrapForm.Group controlId="formDescription">
                    <BootstrapForm.Label style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Description</BootstrapForm.Label>
                    <BootstrapForm.Control
                        as="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                        style={{ fontSize: '1rem' }}
                    />
                </BootstrapForm.Group>
                <BootstrapForm.Group controlId="formExcerpt">
                    <BootstrapForm.Label style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Extrait</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="text"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Extrait"
                        required
                        style={{ fontSize: '1rem' }}
                    />
                </BootstrapForm.Group>
                <BootstrapForm.Group controlId="formCities">
                    <BootstrapForm.Label style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Villes</BootstrapForm.Label>
                    <BootstrapForm.Control
                        as="select"
                        multiple
                        value={cities}
                        onChange={handleCityChange}
                        required
                    >
                        <option value="Paris">Paris</option>
                        <option value="Lyon">Lyon</option>
                        <option value="Marseille">Marseille</option>
                        <option value="Toulouse">Toulouse</option>
                        {/* Add more cities as needed */}
                    </BootstrapForm.Control>
                </BootstrapForm.Group>
                <Button variant="primary" type="submit" className="mt-3" style={{ fontSize: '1.2rem' }}>Créer la Page</Button>
            </BootstrapForm>

            <Modal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
                centered // Center the modal vertically and horizontally
                style={{ zIndex: 1050 }} // Ensure it appears above other content
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Création Réussie</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '1.2rem' }}>
                    Votre page a été créée avec succès ! Vous pouvez maintenant l'afficher dans votre tableau de bord.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)} style={{ fontSize: '1.2rem' }}>
                        Retour au Formulaire
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Form;
