from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from create_model import load_or_create_model
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Load the preprocessing pipeline and model
preprocessing_pipeline, model = load_or_create_model()

def analyze_key_factors(features, risk_score):
    """Analyze which factors contribute most to the risk score"""
    key_factors = []
    
    # Analyze funding
    if features['funding_total_usd'] < 1000000:
        key_factors.append({
            'factor': 'Funding',
            'impact': 'High Risk',
            'description': 'Total funding is below recommended threshold'
        })
    elif features['funding_total_usd'] > 5000000:
        key_factors.append({
            'factor': 'Funding',
            'impact': 'Low Risk',
            'description': 'Strong funding position'
        })
    
    # Analyze team size
    if features['team_size'] < 10:
        key_factors.append({
            'factor': 'Team Size',
            'impact': 'Medium Risk',
            'description': 'Small team might limit growth potential'
        })
    
    # Analyze revenue growth
    if features['revenue_growth'] > 1.0:
        key_factors.append({
            'factor': 'Revenue Growth',
            'impact': 'Low Risk',
            'description': 'Strong revenue growth indicates market validation'
        })
    
    return key_factors

def generate_recommendations(features, risk_score):
    """Generate recommendations based on the analysis"""
    recommendations = []
    
    if risk_score > 0.7:  # High risk
        recommendations.extend([
            "Consider increasing funding through additional investment rounds",
            "Focus on expanding the core team in key areas",
            "Develop stronger intellectual property protection"
        ])
    elif risk_score > 0.4:  # Medium risk
        recommendations.extend([
            "Look for strategic partnerships to accelerate growth",
            "Invest in technology development to strengthen competitive advantage",
            "Consider expanding into adjacent markets"
        ])
    else:  # Low risk
        recommendations.extend([
            "Focus on maintaining growth trajectory",
            "Consider international expansion opportunities",
            "Look for potential acquisition opportunities"
        ])
    
    return recommendations

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from request
        data = request.get_json()
        
        # Extract features into proper format
        features = {
            'funding_total_usd': float(data.get('funding_total_usd', 0)),
            'funding_rounds': int(data.get('funding_rounds', 0)),
            'time_since_founding': float(data.get('time_since_founding', 0)),
            'team_size': int(data.get('team_size', 0)),
            'revenue_growth': float(data.get('revenue_growth', 0)),
            'market_size': float(data.get('market_size', 0)),
            'competitive_advantage': float(data.get('competitive_advantage', 0)),
            'technology_score': float(data.get('technology_score', 0)),
            'management_experience': float(data.get('management_experience', 0)),
            'intellectual_property': float(data.get('intellectual_property', 0))
        }
        
        # Create a single sample for prediction
        X = np.array([list(features.values())])
        
        # Preprocess the features
        X_processed = preprocessing_pipeline.transform(X)
          # Make prediction
        prediction = model.predict_proba(X_processed)
        
        # Calculate risk score (inverse of acquisition probability)
        acquisition_probability = float(prediction[0][1])  # Class 1 probability
        risk_score = 1 - acquisition_probability
        
        # Generate detailed analysis
        analysis = {
            'risk_score': round(risk_score * 100, 2),  # Convert to percentage
            'acquisition_probability': round(acquisition_probability * 100, 2),  # Convert to percentage
            'key_factors': analyze_key_factors(features, risk_score),
            'recommendations': generate_recommendations(features, risk_score)
        }
        
        return jsonify({
            'success': True,
            'analysis': analysis
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
