// Configuration Airtable
// Remplacez ces valeurs par vos propres identifiants Airtable

export const config = {
  // Votre API Key Airtable (à trouver dans Account Settings > API)
  apiKey: 'YOUR_AIRTABLE_API_KEY',
  
  // ID de votre base Airtable (visible dans l'URL de votre base)
  // Exemple: https://airtable.com/appXXXXXXXXXXXXXX/...
  baseId: 'YOUR_AIRTABLE_BASE_ID',
  
  // Nom de votre table dans Airtable
  tableName: 'Objects',
};

// Instructions pour obtenir vos identifiants:
// 
// 1. API Key:
//    - Allez sur https://airtable.com/api
//    - Sélectionnez votre base
//    - Cliquez sur "Generate API key"
//    - Copiez la clé générée
//
// 2. Base ID:
//    - Ouvrez votre base Airtable dans le navigateur
//    - L'URL ressemble à: https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYY/...
//    - Copiez le texte après "app" et avant le prochain "/"
//
// 3. Nom de la table:
//    - Créez une table dans Airtable avec les colonnes:
//      - Name (Single line text)
//      - Email (Email)
//      - City (Single line text)
//      - Phone (Phone number, optionnel)
//
// 4. Structure de la table Airtable:
//    - Name: Nom de l'objet/personne
//    - Email: Adresse email
//    - City: Ville
//    - Phone: Numéro de téléphone (optionnel)

export default config;
