import React, { useState } from 'react';
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

const ObjectManagerLocal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
  });

  const [objects, setObjects] = useState([
    // Données d'exemple
    { id: 1, Name: 'Ahmed Benali', Email: 'ahmed@example.com', City: 'Casablanca', Phone: '+212 612345678' },
    { id: 2, Name: 'Fatima Alaoui', Email: 'fatima@example.com', City: 'Rabat', Phone: '+212 623456789' },
    { id: 3, Name: 'Mohammed Idriss', Email: 'mohammed@example.com', City: 'Marrakech', Phone: '+212 634567890' },
  ]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = () => {
    // Validation
    if (!formData.name || !formData.email || !formData.city) {
      setError('Veuillez remplir au moins le nom, email et ville');
      return;
    }

    setError('');
    setSuccess('');

    // Ajouter au tableau local
    const newObject = {
      id: Date.now(), // ID temporaire
      Name: formData.name,
      Email: formData.email,
      City: formData.city,
      Phone: formData.phone || '',
      createdTime: new Date().toISOString(),
    };
    
    setObjects(prev => [...prev, newObject]);
    setFormData({ name: '', email: '', city: '', phone: '' });
    setSuccess(`Objet "${formData.name}" ajouté avec succès!`);
    setOpenDialog(false);
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}"?`)) {
      return;
    }

    setObjects(prev => prev.filter(obj => obj.id !== id));
    setSuccess(`Objet "${name}" supprimé avec succès!`);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        <AddIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Gestion des Objets (Stockage Local)
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
            startIcon={<SaveIcon />}
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

          {objects.length === 0 ? (
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
        </CardContent>
      </Card>

      {/* Note sur le stockage */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <strong>Version Locale:</strong> Cette version stocke les données en mémoire locale.
        Les données seront perdues au rafraîchissement de la page.
        Pour la version avec Airtable, utilisez <code>ObjectManager.jsx</code> et configurez Airtable.
      </Alert>
    </Box>
  );
};

export default ObjectManagerLocal;
