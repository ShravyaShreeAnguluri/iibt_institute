const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Register a new student
router.post('/', (req, res) => {
    const { fullname, email, phone, dob, education, institution, year, course, message, terms } = req.body;
    
    // Basic validation
    if (!fullname || !email || !phone || !dob || !education || !institution || !year || !course || !message || !terms) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const sql = `INSERT INTO students (full_name, email, phone, date_of_birth, education, institution, year, course, message, terms) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [fullname, email, phone, dob, education, institution, year, course, message, terms], 
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already registered' });
                }
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Registration successful', id: result.insertId });
        });
});

// Get all registrations (for admin purposes)
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM students ORDER BY created_at DESC';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

module.exports = router;