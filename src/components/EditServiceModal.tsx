import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Service } from '../types';

interface EditServiceModalProps {
    show: boolean;
    onHide: () => void;
    service: Service | null;
    onUpdate: () => void;
}

const EditServiceModal = ({ show, onHide, service, onUpdate }: EditServiceModalProps) => {
    const [formData, setFormData] = useState<Partial<Service>>({});
    const [offeringsText, setOfferingsText] = useState('');
    const [benefitsText, setBenefitsText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (service) {
            setFormData(service);
            setOfferingsText(service.offerings?.join('\n') || '');
            setBenefitsText(service.benefits?.join('\n') || '');
        }
    }, [service]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!service?.firestoreId) return;

        setLoading(true);
        try {
            const serviceRef = doc(db, 'services', service.firestoreId);
            const updatedData = {
                ...formData,
                offerings: offeringsText.split('\n').filter(item => item.trim() !== ''),
                benefits: benefitsText.split('\n').filter(item => item.trim() !== '')
            };

            await updateDoc(serviceRef, updatedData);
            onUpdate();
            onHide();
        } catch (error) {
            console.error("Error updating service:", error);
            alert("Failed to update service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Icon Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="icon"
                            value={typeof formData.icon === 'string' ? formData.icon : ''}
                            onChange={handleChange}
                            placeholder="e.g. FaCode"
                            required
                        />
                        <Form.Text className="text-muted">Available icons: FaCode, FaCloud, FaShieldAlt, FaChartLine</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Offerings (One per line)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={offeringsText}
                            onChange={(e) => setOfferingsText(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Benefits (One per line)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={benefitsText}
                            onChange={(e) => setBenefitsText(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditServiceModal;
