import math
import os
from typing import Dict


class PasswordAnalyzer:
    """Analyze password strength and estimate crack time"""
    
    def __init__(self):
        self.common_passwords = [
            'password', '123456', '12345678', 'qwerty', 'abc123', 'password1',
            'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'dragon',
            'master', 'shadow', 'superman', 'michael', 'jennifer', 'sunshine',
            'football', 'iloveyou', '123123', 'hello', 'freedom', 'whatever',
            'ninja', 'mustang', 'maggie', 'jordan', 'purple', 'jesus', 'joshua', 
            '2004' , 'jerry' , '2003'
        ]
    
    def analyze_password(self, password: str) -> Dict:
        """Comprehensive password analysis"""
        analysis = {
            'length': len(password),
            'has_lowercase': any(c.islower() for c in password),
            'has_uppercase': any(c.isupper() for c in password),
            'has_digits': any(c.isdigit() for c in password),
            'has_special': any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in password),
            'is_common': self.is_common_password(password),
            'character_set_size': self.calculate_charset_size(password),
            'entropy': self.calculate_entropy(password),
            'strength_score': 0,
            'strength_level': 'Very Weak',
            'crack_time_estimates': {}
        }
        
        # Calculate strength score
        analysis['strength_score'] = self.calculate_strength_score(analysis)
        analysis['strength_level'] = self.get_strength_level(analysis['strength_score'])
        
        # Calculate crack time estimates
        analysis['crack_time_estimates'] = self.estimate_crack_time(password)
        
        return analysis
    
    def is_common_password(self, password: str) -> bool:
        """Check if password is in common passwords list"""
        return password.lower() in self.common_passwords
    
    def calculate_charset_size(self, password: str) -> int:
        """Calculate the character set size"""
        charset_size = 0
        if any(c.islower() for c in password):
            charset_size += 26
        if any(c.isupper() for c in password):
            charset_size += 26
        if any(c.isdigit() for c in password):
            charset_size += 10
        if any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in password):
            charset_size += 32
        return charset_size
    
    def calculate_entropy(self, password: str) -> float:
        """Calculate password entropy in bits"""
        charset_size = self.calculate_charset_size(password)
        if charset_size == 0:
            return 0
        return len(password) * math.log2(charset_size)
    
    def calculate_strength_score(self, analysis: Dict) -> int:
        """Calculate overall strength score (0-100)"""
        score = 0
        
        # Length scoring
        if analysis['length'] >= 12:
            score += 25
        elif analysis['length'] >= 8:
            score += 15
        elif analysis['length'] >= 6:
            score += 10
        else:
            score += 5
        
        # Character variety
        if analysis['has_lowercase']:
            score += 10
        if analysis['has_uppercase']:
            score += 10
        if analysis['has_digits']:
            score += 10
        if analysis['has_special']:
            score += 15
        
        # Entropy bonus
        if analysis['entropy'] >= 60:
            score += 20
        elif analysis['entropy'] >= 40:
            score += 15
        elif analysis['entropy'] >= 20:
            score += 10
        
        # Common password penalty
        if analysis['is_common']:
            score = max(0, score - 40)
        
        return min(100, score)
    
    def get_strength_level(self, score: int) -> str:
        """Get human-readable strength level"""
        if score >= 80:
            return 'Very Strong'
        elif score >= 60:
            return 'Strong'
        elif score >= 40:
            return 'Medium'
        elif score >= 20:
            return 'Weak'
        else:
            return 'Very Weak'
    
    def estimate_crack_time(self, password: str) -> Dict:
        """Estimate time to crack password with different methods"""
        charset_size = self.calculate_charset_size(password)
        password_length = len(password)
        
        
        total_combinations = charset_size ** password_length
        avg_combinations = total_combinations / 2
        
        
        attack_speeds = {
            'online_attack': 1000,  
            'offline_md5': 8000000000,  
            'offline_sha256': 2000000000,  
            'offline_bcrypt': 50000,  
            'offline_argon2': 5000,  
        }
        
        estimates = {}
        for attack_type, speed in attack_speeds.items():
            seconds = avg_combinations / speed
            estimates[attack_type] = self.format_time_estimate(seconds)
        
        return estimates
    
    def format_time_estimate(self, seconds: float) -> str:
        """Format time estimate in human-readable format"""
        if seconds < 1:
            return "Instant"
        elif seconds < 60:
            return f"{seconds:.1f} seconds"
        elif seconds < 3600:
            return f"{seconds/60:.1f} minutes"
        elif seconds < 86400:
            return f"{seconds/3600:.1f} hours"
        elif seconds < 31536000:
            return f"{seconds/86400:.1f} days"
        elif seconds < 31536000000:
            return f"{seconds/31536000:.1f} years"
        else:
            return "Millions of years"