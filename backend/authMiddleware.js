const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token manquant' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey'); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = verifyToken;
