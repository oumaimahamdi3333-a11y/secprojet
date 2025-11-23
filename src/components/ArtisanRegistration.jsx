import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';

const ArtisanRegistration = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Business Information
    businessName: '',
    businessType: '',
    yearsOfExperience: '',
    specialties: [],
    description: '',
    
    // Location Information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Additional Information
    website: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: ''
    },
    portfolio: [],
    certifications: [],
    languages: [],
    availability: '',
    pricingRange: '',
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const businessTypes = [
    'Carpenter',
    'Electrician',
    'Plumber',
    'Painter',
    'Welder',
    'Mason',
    'Roofer',
    'Flooring Specialist',
    'HVAC Technician',
    'Landscaper',
    'Interior Designer',
    'Jewelry Maker',
    'Potter',
    'Blacksmith',
    'Woodworker',
    'Other'
  ];

  const specialtyOptions = [
    'Residential',
    'Commercial',
    'Industrial',
    'Restoration',
    'Custom Work',
    'Emergency Services',
    'Green Building',
    'Historic Preservation',
    'Modern Design',
    'Traditional Craft'
  ];

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Arabic',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNestedInputChange = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setSnackbarMessage('Registration successful! Welcome to our artisan community.');
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        businessName: '',
        businessType: '',
        yearsOfExperience: '',
        specialties: [],
        description: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        website: '',
        socialMedia: { instagram: '', facebook: '', twitter: '' },
        portfolio: [],
        certifications: [],
        languages: [],
        availability: '',
        pricingRange: '',
        agreeToTerms: false,
        agreeToMarketing: false
      });
    } else {
      setSnackbarMessage('Please fix the errors and try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          <WorkIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Artisan Registration
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Join our community of skilled artisans and showcase your craftsmanship
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    required
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Business Information Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                <BusinessIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Business Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    error={!!errors.businessName}
                    helperText={errors.businessName}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.businessType}>
                    <InputLabel>Business Type</InputLabel>
                    <Select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      label="Business Type"
                    >
                      {businessTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                    inputProps={{ min: 0, max: 50 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pricing Range (per hour)"
                    value={formData.pricingRange}
                    onChange={(e) => handleInputChange('pricingRange', e.target.value)}
                    placeholder="e.g., $25-50"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Specialties</InputLabel>
                    <Select
                      multiple
                      value={formData.specialties}
                      onChange={(e) => handleArrayChange('specialties', e.target.value)}
                      label="Specialties"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {specialtyOptions.map((specialty) => (
                        <MenuItem key={specialty} value={specialty}>
                          {specialty}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us about your business, skills, and what makes you unique..."
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'action.active', alignSelf: 'flex-start', mt: 1 }} />
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Location Information Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                <LocationIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Location Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    error={!!errors.address}
                    helperText={errors.address}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    error={!!errors.state}
                    helperText={errors.state}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    error={!!errors.zipCode}
                    helperText={errors.zipCode}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    defaultValue="United States"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Additional Information Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Additional Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'instagram', e.target.value)}
                    placeholder="@yourusername"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    value={formData.socialMedia.facebook}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'facebook', e.target.value)}
                    placeholder="Your Facebook page"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Twitter"
                    value={formData.socialMedia.twitter}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'twitter', e.target.value)}
                    placeholder="@yourusername"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Languages Spoken</InputLabel>
                    <Select
                      multiple
                      value={formData.languages}
                      onChange={(e) => handleArrayChange('languages', e.target.value)}
                      label="Languages Spoken"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {languageOptions.map((language) => (
                        <MenuItem key={language} value={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Availability</InputLabel>
                    <Select
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      label="Availability"
                    >
                      <MenuItem value="full-time">Full Time</MenuItem>
                      <MenuItem value="part-time">Part Time</MenuItem>
                      <MenuItem value="weekends-only">Weekends Only</MenuItem>
                      <MenuItem value="evenings-only">Evenings Only</MenuItem>
                      <MenuItem value="on-demand">On Demand</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Terms and Conditions
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    />
                  }
                  label="I agree to the Terms and Conditions and Privacy Policy"
                  required
                />
                {errors.agreeToTerms && (
                  <Alert severity="error">{errors.agreeToTerms}</Alert>
                )}
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToMarketing}
                      onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                    />
                  }
                  label="I would like to receive marketing communications and updates"
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ minWidth: 200, py: 1.5 }}
            >
              Register as Artisan
            </Button>
          </Box>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ArtisanRegistration;


