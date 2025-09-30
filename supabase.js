const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = "https://deyapfmewmrjvqopwhuh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleWFwZm1ld21yanZxb3B3aHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODAwMTEsImV4cCI6MjA3NDY1NjAxMX0.6HafmrlF3annT2GMBtn8yZU6FOPAEm7WmbQLunLx09s";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
