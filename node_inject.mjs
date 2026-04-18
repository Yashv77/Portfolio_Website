import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ehrnakvepsutuobmtzcf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocm5ha3ZlcHN1dHVvYm10emNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNjI4MDgsImV4cCI6MjA5MDczODgwOH0.X8SpZvlC0aoE5GhUwl39YgwOgPx2RiT5YfNrxN8Woug'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function inject() {
    const { data, error } = await supabase.from('portfolio_data').select('content').eq('id', 1).single();
    if (error) {
        console.error("Error fetching", error);
        return;
    }
    
    let content = data.content;
    let personal = content.personalProjectsData || [];
    
    const new_projects = [
        {
            "id": "ml-1",
            "title": {
                "professional": "Stock Price Movement Prediction",
                "creative": "Wall Street Compass"
            },
            "description": {
                "professional": "- Live Data Fetching: Bypasses static CSVs to actively ping the yfinance API for real-time market data matching the NYSE timeline.\n- Rigorous Feature Engineering: Calculates leading algorithmic momentum indicators natively, including SMAs, RSI, and MACD crossovers.\n- Machine Learning Classification: Pits highly optimized Logistic Regression metrics against robust Support Vector Machines (SVM).\n- Interactive Dashboard: Streams historical traces dynamically into Plotly engines and provides an execution interface to request tomorrow's price direction.",
                "creative": "Stock Price Movement Prediction is a machine learning tool designed to act as a digital financial advisor compass. Instead of guessing what the stock market will do tomorrow, this application analyzes years of continuous financial data to estimate if a specific stock will close higher 🔼 or close lower 🔽 on the next trading day."
            },
            "category": "Data Science",
            "tags": ["Python", "yfinance", "Scikit-Learn", "SVM", "Logistic Regression", "Plotly"],
            "imageUrl": "",
            "github": "",
            "link": "",
            "detailBlocks": []
        },
        {
             "id": "ml-2",
             "title": {
                 "professional": "Sales Forecasting Dashboard",
                 "creative": "Retail Crystal Ball"
             },
             "description": {
                 "professional": "- Geometric Time-Series Mapping: Converts static dates into cyclic sine/cosine waves, entirely removing year-end discontinuity cliffs.\n- Polynomial Ridge Regression: Discovers deep associative relationships by throwing continuous arrays into an L2-regularized Scikit-Learn algorithm.\n- Dynamic Extrapolation: Renders multi-node visualizations outlining expected revenue ceilings and market bottoms for future weeks.\n- Deep Decomposition Tools: Includes built-in exploratory data analysis (EDA) highlighting explicit seasonal impacts and holiday correlations automatically.",
                 "creative": "The Sales Forecasting Dashboard acts as an intelligent crystal ball for inventory, logistics, and supply chain managers globally. Ordering too much inventory leads to wasted capital on storage, while ordering too little leads to empty shelves. This tool predicts exactly how much a retail department will sell weeks in advance."
             },
             "category": "Data Analysis",
             "tags": ["Python", "Ridge Regression", "Time-Series", "Scikit-Learn", "EDA"],
             "imageUrl": "",
             "github": "",
             "link": "",
             "detailBlocks": []
        },
        {
             "id": "ml-3",
             "title": {
                 "professional": "California House Price Prediction System",
                 "creative": "AI Real Estate Appraiser"
             },
             "description": {
                 "professional": "- Geospatial Processing: Breaks California data down into coordinates, tracking proximity grids mapped naturally into geographical clusters preserving rural/urban disparities.\n- Boosted Model Competition: Pitches three extremely fast and highly-advanced Gradient Boosting frameworks against each other natively: XGBoost, LightGBM, and CatBoost.\n- Interactive UI: A single-point matrix injection UI allows end-users to input custom coordinates, household ages, and ocean-proximity flags to extract immediate predictive dollar evaluations.",
                 "creative": "California House Price Prediction acts as an AI-powered real estate appraisal engine. This system ingests decades of historical census tracking data across the entire state of California to precisely calculate what a house *should* be worth."
             },
             "category": "Data Science",
             "tags": ["Python", "XGBoost", "LightGBM", "CatBoost", "Geospatial Data"],
             "imageUrl": "",
             "github": "",
             "link": "",
             "detailBlocks": []
        },
        {
             "id": "ml-4",
             "title": {
                 "professional": "Heart Disease Diagnosis Classifier",
                 "creative": "Clinical Triage Assistant"
             },
             "description": {
                 "professional": "- Rigorous Data Verification: Implements explicit Interquartile Range (IQR) bounding logic to remove extreme biological outliers natively.\n- Cross-Validation Modeling: Computes 3-Fold Cross Validations natively against distinct models (Decision Trees, Random Forests, and Hist Gradient Boosters).\n- Clinical Interface: Allows a practitioner to inject 13 simple test metrics into the active model, producing confidence probabilities and immediate lifestyle recommendations.",
                 "creative": "Heart Disease Prediction System acts as a data-driven clinical triage assistant. Cardiovascular diseases are the leading cause of death globally, but early detection is frequently mis-categorized due to overlapping symptoms. This application takes standard clinical testing vectors and computes statistical probability mappings through explicit Machine Learning."
             },
             "category": "Data Science",
             "tags": ["Python", "Random Forests", "Hist Gradient Boosters", "Decision Trees", "Cross-Validation"],
             "imageUrl": "",
             "github": "",
             "link": "",
             "detailBlocks": []
        },
        {
             "id": "ml-5",
             "title": {
                 "professional": "E-commerce Customer Segmentation",
                 "creative": "Strategic RFM Mapper"
             },
             "description": {
                 "professional": "- RFM Extraction Engine: Synthesizes hidden matrices: Recency (days since last purchase), Frequency (total lifetime transactions), and Monetary value.\n- Logarithmic Normalizations: Log-transforms behavioral boundaries natively countering high-value outliers (retail whales) from crushing algorithm spatial densities.\n- K-Means Formulations: Evaluates optimal grouping thresholds natively utilizing Silhouette Grading metrics alongside Elbow threshold trackers against scaled PCA dimensions.\n- Inference User-Interface: Features a 3D interface mapping segment geometries alongside a custom inference ingestion tool for brand new customers.",
                 "creative": "E-commerce Customer Segmentation is a strategic marketing tool designed to maximize customer lifetime value without wasting ad-spend. This app identifies entirely distinct 'types' of buyers using an algorithm called K-Means Clustering against their real purchase history records."
             },
             "category": "Data Analysis",
             "tags": ["Python", "K-Means Clustering", "RFM Metrics", "PCA", "Machine Learning"],
             "imageUrl": "",
             "github": "",
             "link": "",
             "detailBlocks": []
        }
    ];

    let titles = personal.map(p => p.title.professional);
    let finalNew = new_projects.filter(p => !titles.includes(p.title.professional));
    
    content.personalProjectsData = [...finalNew, ...personal];
    
    const { error: updateError } = await supabase.from('portfolio_data').update({ content }).eq('id', 1);
    if (updateError) {
        console.error("Update error", updateError);
    } else {
        console.log("Successfully appended new projects using Supabase JS client!");
    }
}
inject();
