import {
    Button,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Box,
    Typography,
    Paper,
    Rating
} from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    email: string;
    rating: number; // Add rating field
}

const AdminDoctorsManagement: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([
        { id: 1, name: 'Dr. John Doe', specialization: 'Cardiology', email: 'john.doe@example.com', rating: 4 },
        { id: 2, name: 'Dr. Jane Smith', specialization: 'Neurology', email: 'jane.smith@example.com', rating: 5 },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
    const [formValues, setFormValues] = useState<Omit<Doctor, 'id'>>({ name: '', specialization: '', email: '', rating: 3 });

    const handleDelete = (id: number) => {
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
        toast.success('Doctor deleted successfully');
    };

    const handleEdit = (doctor: Doctor) => {
        setEditingDoctor(doctor);
        setFormValues({ name: doctor.name, specialization: doctor.specialization, email: doctor.email, rating: doctor.rating });
        setIsModalVisible(true);
    };

    const handleAdd = () => {
        setEditingDoctor(null);
        setFormValues({ name: '', specialization: '', email: '', rating: 3 });
        setIsModalVisible(true);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (event: React.ChangeEvent<unknown>, newValue: number | null) => {
        setFormValues((prev) => ({ ...prev, rating: newValue as number }));
    };

    const handleModalSubmit = () => {
        if (!formValues.name || !formValues.specialization || !formValues.email) {
            toast.error('Please fill out all fields correctly');
            return;
        }

        if (editingDoctor) {
            setDoctors(doctors.map((doc) =>
                doc.id === editingDoctor.id ? { ...editingDoctor, ...formValues } : doc
            ));
            toast.success('Doctor updated successfully');
        } else {
            const newDoctor = { ...formValues, id: Date.now() };
            setDoctors([...doctors, newDoctor]);
            toast.success('Doctor added successfully');
        }
        setIsModalVisible(false);
    };

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Admin Doctors Management</Typography>
            <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
                Add Doctor
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Specialization</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.map((doctor) => (
                            <TableRow key={doctor.id}>
                                <TableCell>{doctor.name}</TableCell>
                                <TableCell>{doctor.specialization}</TableCell>
                                <TableCell>{doctor.email}</TableCell>
                                <TableCell>
                                    <Rating
                                        value={doctor.rating}
                                        readOnly
                                        precision={0.5} // Allows half-star ratings
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(doctor)} color="primary">Edit</Button>
                                    <Button onClick={() => handleDelete(doctor.id)} color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Specialization"
                            name="specialization"
                            value={formValues.specialization}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                        <Typography>Rating</Typography>
                        <Rating
                            value={formValues.rating}
                            onChange={handleRatingChange}
                            precision={0.5} // Allows half-star ratings
                        />
                        <Button variant="contained" onClick={handleModalSubmit}>
                            {editingDoctor ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default AdminDoctorsManagement;
