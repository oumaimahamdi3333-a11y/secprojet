import React, { useRef, useState, useEffect } from "react";

// Use Material-UI (MUI) for a professional look
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Typography,
  Stack
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function Form() {
  const [formData, setFormData] = useState({ name: "", age: "", note: "" });
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const refItems = useRef([]);

  // Initialize table with refItems
  useEffect(() => {
    setItems([...refItems.current]);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add or update item
  const handleAddOrUpdate = () => {
    const { name, age, note } = formData;
    if (!name.trim() || !age.trim()) return;

    if (editingId) {
      refItems.current = refItems.current.map((item) =>
        item.id === editingId ? { ...item, name, age, note } : item
      );
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        name,
        age,
        note
      };
      refItems.current.push(newItem);
    }
    setItems([...refItems.current]);
    setFormData({ name: "", age: "", note: "" });
  };

  // Delete item
  const handleDelete = (id) => {
    refItems.current = refItems.current.filter((item) => item.id !== id);
    setItems([...refItems.current]);
    if (editingId === id) {
      setEditingId(null);
      setFormData({ name: "", age: "", note: "" });
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      age: String(item.age),
      note: item.note
    });
    setEditingId(item.id);
  };

  // Search items
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) {
      setItems([...refItems.current]);
      return;
    }
    const filtered = refItems.current.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setItems(filtered);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        People Table
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            variant="outlined"
            size="small"
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
          <Button
            variant={editingId ? "contained" : "outlined"}
            color={editingId ? "primary" : "success"}
            onClick={handleAddOrUpdate}
            sx={{ minWidth: 120, height: 40 }}
          >
            {editingId ? "Update" : "Add"}
          </Button>
        </Stack>
      </Paper>

      <Box mb={3} display="flex" justifyContent="center">
        <TextField
          label="Search by name"
          value={search}
          onChange={handleSearch}
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        {items.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EEF2F7" }}>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Note</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} selected={editingId === item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      startIcon={<Edit />}
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box textAlign="center" p={3}>
            <Typography variant="body1" color="textSecondary">
              No items found
            </Typography>
          </Box>
        )}
      </TableContainer>
    </Container>
  );
}

export default Form;