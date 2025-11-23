# Application d'Analyse des Précipitations au Maroc

Une application web Python développée avec Flask pour analyser les données de précipitations au Maroc entre différentes années.

## 🚀 Fonctionnalités

- **Analyse des précipitations** par ville et par année
- **Visualisations interactives** avec graphiques dynamiques
- **Statistiques détaillées** sur les patterns climatiques
- **Comparaisons temporelles** entre différentes périodes
- **Interface moderne** et responsive

## 📊 Données Incluses

L'application couvre **20 villes principales** du Maroc :
- Casablanca, Rabat, Marrakech, Fès, Tanger
- Agadir, Meknès, Oujda, Kenitra, Tétouan
- Salé, Nador, Settat, Khouribga, Beni Mellal
- Taza, El Jadida, Larache, Ksar El Kebir

## 🛠️ Installation

### Prérequis
- Python 3.8 ou supérieur
- pip (gestionnaire de packages Python)

### Étapes d'installation

1. **Cloner ou télécharger le projet**
```bash
cd c:\Users\hamdi\Desktop\react\my-app\src\components
```

2. **Installer les dépendances**
```bash
pip install -r requirements.txt
```

3. **Lancer l'application**
```bash
python webapp.py
```

4. **Accéder à l'application**
Ouvrez votre navigateur et allez à : `http://localhost:5000`

## 📈 Utilisation

### Interface Principale
1. **Sélection de ville** : Choisissez une ville spécifique ou analysez toutes les villes
2. **Période d'analyse** : Sélectionnez la période d'analyse (2015-2023 par défaut)
3. **Actualisation** : Cliquez sur "Actualiser les Données" pour générer de nouvelles données

### Types d'Analyses
- **Évolution Annuelle** : Tendances des précipitations par année
- **Moyennes Mensuelles** : Patterns saisonniers des précipitations
- **Comparaisons** : Analyse comparative entre différentes années

### Statistiques Disponibles
- Total des précipitations
- Moyennes, maximums et minimums
- Villes les plus humides/sèches
- Années les plus pluvieuses/sèches
- Nombre de villes et années couvertes

## 🔧 Structure du Projet

```
components/
├── webapp.py              # Application Flask principale
├── requirements.txt       # Dépendances Python
├── README.md             # Documentation
└── templates/
    ├── base.html         # Template de base
    └── index.html        # Page principale
```

## 🌍 Données Climatiques

Les données sont générées de manière réaliste en tenant compte des caractéristiques climatiques du Maroc :

- **Saison humide** : Novembre à Mars (précipitations élevées)
- **Saison sèche** : Juin à Août (précipitations faibles)
- **Saisons intermédiaires** : Avril-Mai et Octobre
- **Variations régionales** : Côtes plus humides, intérieur plus sec

## 🎨 Fonctionnalités Techniques

- **Backend** : Flask (Python)
- **Frontend** : HTML5, CSS3, Bootstrap 5
- **Visualisations** : Matplotlib, Seaborn
- **Traitement de données** : Pandas, NumPy
- **Interface responsive** : Compatible mobile et desktop

## 🔮 Améliorations Futures

- Intégration de données météorologiques réelles
- Prédictions climatiques
- Export des données en CSV/Excel
- Cartes interactives du Maroc
- Alertes météorologiques
- API REST pour intégration externe

## 📝 Notes Techniques

- L'application utilise des données simulées pour la démonstration
- Les graphiques sont générés dynamiquement en base64
- Interface responsive avec Bootstrap 5
- Code optimisé pour la performance

## 🤝 Contribution

Pour contribuer au projet :
1. Fork le repository
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**Développé avec ❤️ pour l'analyse climatique du Maroc**


