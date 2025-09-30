const supabase = require('../config/supabase');

exports.register = async (req, res) => {
  const { email, password, fullName, phone, birthdate, avatar } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password minimal 6 karakter" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName, phone, birthdate, avatar }
      }
    });
    if (error) return res.status(400).json({ message: error.message });

    res.json({ message: "User berhasil dibuat", user: data.user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) return res.status(400).json({ message: error.message });

    res.json({ message: "Login berhasil", token: data.session.access_token, user: data.user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};
