const supabase = require('./supabase.js');


async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    // Verifikasi user dari token di Supabase
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return res.status(403).json({ message: 'Invalid token' });

    // Simpan info user ke req untuk akses role dan data lain
    req.user = data.user;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

function authorizeRoles(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized, user not found' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient role' });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles,
};
