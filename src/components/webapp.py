from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Backend non-interactif
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import io
import base64
import requests
from bs4 import BeautifulSoup
import json
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'precipitation_maroc_2024'
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Créer le dossier uploads s'il n'existe pas
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

class PrecipitationAnalyzer:
    def __init__(self):
        self.data = None
        self.cities = [
            'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 
            'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan',
            'Salé', 'Nador', 'Settat', 'Khouribga', 'Beni Mellal',
            'Taza', 'El Jadida', 'Kénitra', 'Larache', 'Ksar El Kebir'
        ]
        
    def generate_sample_data(self, years=range(2015, 2024)):
        """Génère des données de précipitations simulées pour le Maroc"""
        np.random.seed(42)  # Pour des résultats reproductibles
        
        data = []
        for year in years:
            for month in range(1, 13):
                for city in self.cities:
                    # Simulation de données réalistes basées sur les patterns marocains
                    if month in [11, 12, 1, 2, 3]:  # Saison humide
                        base_precip = np.random.normal(60, 20)
                    elif month in [4, 5, 10]:  # Saisons intermédiaires
                        base_precip = np.random.normal(30, 15)
                    else:  # Saison sèche
                        base_precip = np.random.normal(5, 5)
                    
                    # Variation par ville
                    city_factors = {
                        'Casablanca': 1.2, 'Rabat': 1.1, 'Tanger': 1.3,
                        'Marrakech': 0.6, 'Agadir': 0.4, 'Fès': 0.8,
                        'Meknès': 0.7, 'Oujda': 0.5, 'Kenitra': 1.0
                    }
                    
                    factor = city_factors.get(city, 1.0)
                    precipitation = max(0, base_precip * factor + np.random.normal(0, 10))
                    
                    data.append({
                        'Année': year,
                        'Mois': month,
                        'Ville': city,
                        'Précipitations (mm)': round(precipitation, 2),
                        'Date': f"{year}-{month:02d}-01"
                    })
        
        self.data = pd.DataFrame(data)
        return self.data
    
    def get_yearly_precipitation(self):
        """Calcule les précipitations annuelles par ville"""
        if self.data is None:
            return None
        
        yearly = self.data.groupby(['Année', 'Ville'])['Précipitations (mm)'].sum().reset_index()
        return yearly
    
    def get_monthly_averages(self):
        """Calcule les moyennes mensuelles par ville"""
        if self.data is None:
            return None
        
        monthly = self.data.groupby(['Ville', 'Mois'])['Précipitations (mm)'].mean().reset_index()
        return monthly
    
    def create_precipitation_chart(self, chart_type='yearly', city=None):
        """Crée des graphiques de précipitations"""
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(12, 8))
        
        if chart_type == 'yearly':
            yearly_data = self.get_yearly_precipitation()
            if city:
                city_data = yearly_data[yearly_data['Ville'] == city]
                ax.plot(city_data['Année'], city_data['Précipitations (mm)'], 
                       marker='o', linewidth=2, markersize=8, label=city)
                ax.set_title(f'Évolution des Précipitations Annuelles - {city}', fontsize=16, fontweight='bold')
            else:
                for city_name in yearly_data['Ville'].unique()[:10]:  # Top 10 villes
                    city_data = yearly_data[yearly_data['Ville'] == city_name]
                    ax.plot(city_data['Année'], city_data['Précipitations (mm)'], 
                           marker='o', linewidth=1, label=city_name)
                ax.set_title('Évolution des Précipitations Annuelles par Ville', fontsize=16, fontweight='bold')
            
            ax.set_xlabel('Année', fontsize=12)
            ax.set_ylabel('Précipitations (mm)', fontsize=12)
            ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
            ax.grid(True, alpha=0.3)
            
        elif chart_type == 'monthly':
            monthly_data = self.get_monthly_averages()
            if city:
                city_data = monthly_data[monthly_data['Ville'] == city]
                ax.bar(city_data['Mois'], city_data['Précipitations (mm)'], 
                      color='skyblue', alpha=0.7)
                ax.set_title(f'Précipitations Mensuelles Moyennes - {city}', fontsize=16, fontweight='bold')
            else:
                pivot_data = monthly_data.pivot(index='Mois', columns='Ville', values='Précipitations (mm)')
                pivot_data.plot(kind='bar', ax=ax, width=0.8)
                ax.set_title('Précipitations Mensuelles Moyennes par Ville', fontsize=16, fontweight='bold')
            
            ax.set_xlabel('Mois', fontsize=12)
            ax.set_ylabel('Précipitations (mm)', fontsize=12)
            ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
            ax.set_xticks(range(1, 13))
            ax.set_xticklabels(['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
                               'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'])
            
        elif chart_type == 'comparison':
            yearly_data = self.get_yearly_precipitation()
            comparison_data = yearly_data.groupby('Année')['Précipitations (mm)'].mean().reset_index()
            ax.bar(comparison_data['Année'], comparison_data['Précipitations (mm)'], 
                  color='lightcoral', alpha=0.7)
            ax.set_title('Comparaison des Précipitations Annuelles Moyennes', fontsize=16, fontweight='bold')
            ax.set_xlabel('Année', fontsize=12)
            ax.set_ylabel('Précipitations Moyennes (mm)', fontsize=12)
            ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        
        # Convertir en base64
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', dpi=300, bbox_inches='tight')
        img_buffer.seek(0)
        img_base64 = base64.b64encode(img_buffer.getvalue()).decode()
        plt.close()
        
        return img_base64
    
    def get_statistics(self):
        """Calcule les statistiques des précipitations"""
        if self.data is None:
            return None
        
        stats = {
            'total_precipitation': self.data['Précipitations (mm)'].sum(),
            'average_precipitation': self.data['Précipitations (mm)'].mean(),
            'max_precipitation': self.data['Précipitations (mm)'].max(),
            'min_precipitation': self.data['Précipitations (mm)'].min(),
            'std_precipitation': self.data['Précipitations (mm)'].std(),
            'cities_count': self.data['Ville'].nunique(),
            'years_covered': sorted(self.data['Année'].unique()),
            'total_observations': len(self.data)
        }
        
        # Ville la plus humide et la plus sèche
        yearly_city = self.data.groupby('Ville')['Précipitations (mm)'].mean()
        stats['wettest_city'] = yearly_city.idxmax()
        stats['driest_city'] = yearly_city.idxmin()
        
        # Année la plus humide et la plus sèche
        yearly_avg = self.data.groupby('Année')['Précipitations (mm)'].mean()
        stats['wettest_year'] = yearly_avg.idxmax()
        stats['driest_year'] = yearly_avg.idxmin()
        
        return stats

# Initialiser l'analyseur
analyzer = PrecipitationAnalyzer()

@app.route('/')
def index():
    """Page d'accueil"""
    return render_template('index.html')

@app.route('/generate_data')
def generate_data():
    """Génère les données de précipitations"""
    years = request.args.get('years', '2015,2023').split(',')
    start_year, end_year = int(years[0]), int(years[1])
    year_range = range(start_year, end_year + 1)
    
    data = analyzer.generate_sample_data(year_range)
    return jsonify({
        'message': f'Données générées pour {len(year_range)} années',
        'records': len(data),
        'cities': analyzer.cities
    })

@app.route('/chart/<chart_type>')
def get_chart(chart_type):
    """Génère les graphiques"""
    city = request.args.get('city', None)
    img_base64 = analyzer.create_precipitation_chart(chart_type, city)
    return jsonify({'chart': img_base64})

@app.route('/statistics')
def get_statistics():
    """Retourne les statistiques"""
    stats = analyzer.get_statistics()
    return jsonify(stats)

@app.route('/data/<data_type>')
def get_data(data_type):
    """Retourne les données selon le type demandé"""
    if data_type == 'yearly':
        data = analyzer.get_yearly_precipitation()
    elif data_type == 'monthly':
        data = analyzer.get_monthly_averages()
    else:
        data = analyzer.data
    
    if data is not None:
        return jsonify(data.to_dict('records'))
    return jsonify([])

if __name__ == '__main__':
    # Générer les données initiales
    analyzer.generate_sample_data()
    print("Données de précipitations générées!")
    print(f"Villes couvertes: {', '.join(analyzer.cities)}")
    print("L'application est prête à être lancée sur http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)


