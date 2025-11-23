import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { config } from '../config/airtable';

const ObjectManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
  });

  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Charger les données depuis Airtable au montage du composant
  useEffect(() => {
    loadFromAirtable();
  }, []);

  const loadFromAirtable = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.airtable.com/v0/${config.baseId}/${config.tableName}`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const records = data.records.map(record => ({
          id: record.id,
          ...record.fields,
          createdTime: record.createdTime,
        }));
        setObjects(records);
      } else {
        setError('Erreur lors du chargement des données');
      }
    } catch (err) {
      console.error('Erreur Airtable:', err);
      setError('Impossible de charger les données depuis Airtable');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.city) {
      setError('Veuillez remplir au moins le nom, email et ville');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Ajouter à Airtable
      const response = await fetch(`https://api.airtable.com/v0/${config.baseId}/${config.tableName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: formData.name,
            Email: formData.email,
            City: formData.city,
            Phone: formData.phone || '',
          }
        }),
      });

      if (response.ok) {
        const newRecord = await response.json();
        const newObject = {
          id: newRecord.id,
          ...newRecord.fields,
          createdTime: newRecord.createdTime,
        };
        
        setObjects(prev => [...prev, newObject]);
        setFormData({ name: '', email: '', city: '', phone: '' });
        setSuccess(`Objet "${formData.name}" ajouté avec succès!`);
        setOpenDialog(false);
      } else {
        const errorData = await response.json();
        setError(`Erreur Airtable: ${errorData.error?.message || 'Erreur inconnue'}`);
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible d\'ajouter l\'objet à Airtable');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}"?`)) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`https://api.airtable.com/v0/${config.baseId}/${config.tableName}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
        },
      });

      if (response.ok) {
        setObjects(prev => prev.filter(obj => obj.id !== id));
        setSuccess(`Objet "${name}" supprimé avec succès!`);
      } else {
        const errorData = await response.json();
        setError(`Erreur Airtable: ${errorData.error?.message || 'Erreur inconnue'}`);
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de supprimer l\'objet depuis Airtable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        <AddIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Gestion des Objets
      </Typography>

      {/* Messages d'alerte */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Bouton Ajouter */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 3 }}
      >
        Ajouter un Objet
      </Button>

      {/* Formulaire Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter un Nouvel Objet</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ville *"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Téléphone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={loading}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tableau des objets */}
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            Liste des Objets ({objects.length})
          </Typography>

          {loading && objects.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : objects.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
              Aucun objet pour le moment. Cliquez sur "Ajouter un Objet" pour commencer.
            </Typography>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nom</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ville</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Téléphone</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date de Création</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {objects.map((obj) => (
                    <TableRow key={obj.id} hover>
                      <TableCell>{obj.Name || obj.name}</TableCell>
                      <TableCell>{obj.Email || obj.email}</TableCell>
                      <TableCell>{obj.City || obj.city}</TableCell>
                      <TableCell>{obj.Phone || obj.phone || '-'}</TableCell>
                      <TableCell>
                        {obj.createdTime
                          ? new Date(obj.createdTime).toLocaleDateString('fr-FR')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(obj.id, obj.Name || obj.name)}
                          disabled={loading}
                          title="Supprimer"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Bouton Actualiser */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={loadFromAirtable}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              Actualiser
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ObjectManager;
