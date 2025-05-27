import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.neural_network import MLPClassifier
import joblib
import pandas as pd

def create_preprocessing_pipeline():
    """Create and return a preprocessing pipeline with StandardScaler"""
    return Pipeline([
        ('scaler', StandardScaler()),
    ])

def create_model(input_shape):
    """Create a deep learning model for startup acquisition prediction"""
    model = MLPClassifier(
        hidden_layer_sizes=(64, 32, 16),
        activation='relu',
        solver='adam',
        max_iter=1000,
        random_state=42
    )
    return model

def preprocess_and_train(data):
    """Preprocess data and train both the pipeline and model"""
    # For demonstration, creating some example features that might predict acquisition
    features = [
        'funding_total_usd',
        'funding_rounds',
        'time_since_founding',
        'team_size',
        'revenue_growth',
        'market_size',
        'competitive_advantage',
        'technology_score',
        'management_experience',
        'intellectual_property'
    ]
    
    X = data[features]
    y = data['was_acquired']  # Target variable
    
    # Create and fit preprocessing pipeline
    preprocessing_pipeline = create_preprocessing_pipeline()
    X_processed = preprocessing_pipeline.fit_transform(X)
    
    # Create and train the model
    model = create_model(input_shape=len(features))
    model.fit(X_processed, y)
    
    # Save both pipeline and model
    joblib.dump(preprocessing_pipeline, 'preprocessing_pipeline.joblib')
    joblib.dump(model, 'acquisition_model.joblib')
    
    return preprocessing_pipeline, model, None

def load_or_create_model():
    """Load or create preprocessing pipeline and model"""
    try:
        # Try to load existing pipeline and model
        pipeline = joblib.load('preprocessing_pipeline.joblib')
        model = tf.keras.models.load_model('acquisition_model')
        print("✅ Loaded existing model and pipeline")
    except:
        print("Creating new model and pipeline...")
        # Create sample data for initial training
        # In production, this would be your real historical data
        sample_size = 1000
        np.random.seed(42)
        
        sample_data = {
            'funding_total_usd': np.random.uniform(100000, 10000000, sample_size),
            'funding_rounds': np.random.randint(1, 8, sample_size),
            'time_since_founding': np.random.uniform(1, 10, sample_size),
            'team_size': np.random.randint(5, 100, sample_size),
            'revenue_growth': np.random.uniform(0, 2, sample_size),
            'market_size': np.random.uniform(1000000, 1000000000, sample_size),
            'competitive_advantage': np.random.uniform(0, 1, sample_size),
            'technology_score': np.random.uniform(0, 1, sample_size),
            'management_experience': np.random.uniform(0, 1, sample_size),
            'intellectual_property': np.random.uniform(0, 1, sample_size),
            'was_acquired': np.random.binomial(1, 0.3, sample_size)  # 30% acquisition rate
        }
        
        data = pd.DataFrame(sample_data)
        pipeline, model, _ = preprocess_and_train(data)
        print("✅ Created and trained new model")
    
    return pipeline, model

if __name__ == "__main__":
    pipeline, model = load_or_create_model()
