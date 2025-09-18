const db = require('../config/database');

class Registration {
    constructor(fullname, email, phone, dob, education, institution, year, course, message, terms) {
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.dob = dob;
        this.education = education;
        this.institution = institution;
        this.year = year;
        this.course = course;
        this.message = message;
        this.terms = terms;
    }
    
    // Save registration to database
    save(callback) {
        const sql = `INSERT INTO students (full_name, email, phone, date_of_birth, education, institution, year, course, message, terms) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        db.query(sql, [this.fullname, this.email, this.phone, this.dob, this.education, this.institution, this.year, this.course, this.message, this.terms], 
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
    }
    
    // Find by email
    static findByEmail(email, callback) {
        const sql = 'SELECT * FROM students WHERE email = ?';
        
        db.query(sql, [email], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            callback(null, results[0]);
        });
    }
    
    // Get all registrations
    static findAll(callback) {
        const sql = 'SELECT * FROM students ORDER BY created_at DESC';
        
        db.query(sql, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
}

module.exports = Registration;