from flask import Flask, request, jsonify
from flask_cors import CORS
from password_cracker import PasswordAnalyzer

app = Flask(__name__)
CORS(app, origins="*")


analyzer = PasswordAnalyzer()


@app.route('/')
def index():
    """Health check endpoint"""
    return jsonify({
        'status': 'CipherX API is running',
        'version': '2.0.0',
        'endpoints': [
            '/analyze_password'
        ]
    })


@app.route('/analyze_password', methods=['POST'])
def analyze_password():
    """Analyze password strength and security"""
    try:
        data = request.get_json()
        password = data.get('password', '')
        
        if not password:
            return jsonify({'error': 'Password is required'}), 400
        
        analysis = analyzer.analyze_password(password)
        return jsonify(analysis)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("=== CipherX Security Analysis Platform ===")
    print("Backend API Server v2.0.0")
    print("\nAPI Endpoints:")
    print("  GET  /                       - Health check")
    print("  POST /analyze_password       - Analyze password strength") 
    print(f"\nServer running on http://localhost:8000")
    print("==========================================")
    
    app.run(host='0.0.0.0', port=8000, debug=True)