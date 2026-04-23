import { Button, Container } from 'react-bootstrap';
import { uploadDataIndex } from '../utils/uploadData';
import { useState } from 'react';

const AdminDashboard = () => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (confirm('Are you sure you want to upload/overwrite data in Firestore?')) {
            setUploading(true);
            try {
                await uploadDataIndex();
                alert('Data uploaded successfully!');
            } catch (error) {
                alert('Error uploading data. Check console.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <Container className="py-5">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin area.</p>

            <div className="my-4">
                <h3>Data Management</h3>
                <p>Use this button to upload initial data (Products, Services, Solutions) to Firestore.</p>
                <Button onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Initial Data'}
                </Button>
            </div>
        </Container>
    );
};

export default AdminDashboard;
