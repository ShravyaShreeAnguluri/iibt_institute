const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        
        if (process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }
        
        // Add your Railway domain here once deployed
        const allowedOrigins = [
            'https://your-app-name.up.railway.app',
            'https://yourdomain.com'
        ];
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Database configuration - UPDATED for Railway
const dbConfig = {
    host: process.env.MYSQLHOST || 'localhost',
    port: process.env.MYSQLPORT || 3306,
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'Shravya@05',
    database: process.env.MYSQLDATABASE || 'institute_registration'
};

console.log('Database config:', {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    database: dbConfig.database
    // Don't log password
});

// Create database connection
const db = mysql.createConnection(dbConfig);

// Connect to database with Railway-compatible error handling
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        
        // For Railway, we don't need to create database manually
        // Railway MySQL service comes pre-configured
        if (process.env.NODE_ENV === 'production') {
            console.error('Production database connection failed. Check your Railway MySQL service.');
            return;
        }
        
        // Local development database creation logic (keep for local testing)
        const createDbConnection = mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });
        
        createDbConnection.connect((err) => {
            if (err) {
                console.error('MySQL server connection failed: ' + err.stack);
                return;
            }
            
            console.log('Connected to MySQL server');
            
            createDbConnection.query('CREATE DATABASE IF NOT EXISTS institute_registration', (err) => {
                if (err) {
                    console.error('Database creation failed: ' + err.stack);
                    createDbConnection.end();
                    return;
                }
                
                console.log('Database created or already exists');
                createDbConnection.query('USE institute_registration', (err) => {
                    if (err) {
                        console.error('Database switch failed: ' + err.stack);
                        createDbConnection.end();
                        return;
                    }
                    
                    createTable(createDbConnection);
                });
            });
        });
        return;
    }
    
    console.log('Connected to database:', dbConfig.database);
    
    // Create table after successful connection
    createTable(db);
});

// Function to create table
function createTable(connection) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            phone VARCHAR(20) NOT NULL,
            date_of_birth DATE NOT NULL,
            education VARCHAR(50) NOT NULL,
            institution VARCHAR(100) NOT NULL,
            year INT NOT NULL,
            course VARCHAR(50) NOT NULL,
            message TEXT NOT NULL,
            terms TINYINT(1) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Table creation failed: ' + err.stack);
        } else {
            console.log('Table created or already exists');
        }
        
        if (connection !== db) {
            connection.end();
            // Reconnect to the specific database
            db.connect((err) => {
                if (err) {
                    console.error('Final database connection failed: ' + err.stack);
                } else {
                    console.log('Connected to institute_registration database');
                }
            });
        }
    });
}

// Registration endpoint
app.post('/register', (req, res) => {
    console.log('=== NEW REGISTRATION REQUEST RECEIVED ===');
    console.log('Request received at:', new Date().toISOString());
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { fullname, email, phone, dob, education, institution, year, course, message, terms } = req.body;
    
    const requiredFields = [
        { name: 'fullname', value: fullname },
        { name: 'email', value: email },
        { name: 'phone', value: phone },
        { name: 'dob', value: dob },
        { name: 'education', value: education },
        { name: 'institution', value: institution },
        { name: 'year', value: year },
        { name: 'course', value: course },
        { name: 'message', value: message },
        { name: 'terms', value: terms }
    ];
    
    const missingFields = requiredFields.filter(field => !field.value);
    
    if (missingFields.length > 0) {
        const missingFieldNames = missingFields.map(field => field.name).join(', ');
        console.error('Validation failed. Missing fields:', missingFieldNames);
        return res.status(400).json({ 
            error: 'All fields are required', 
            missingFields: missingFieldNames 
        });
    }
    
    console.log('All fields validated successfully');
    
    const sql = `INSERT INTO students (full_name, email, phone, date_of_birth, education, institution, year, course, message, terms) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [fullname, email, phone, dob, education, institution, year, course, message, terms];
    console.log('Preparing to execute SQL with values:', values);
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('DATABASE INSERT ERROR:', err);
            console.error('Error code:', err.code);
            console.error('Error message:', err.message);
            
            if (err.code === 'ER_DUP_ENTRY') {
                console.error('Duplicate email attempted:', email);
                return res.status(400).json({ 
                    error: 'Email already registered',
                    details: 'This email address is already registered in our system'
                });
            }
            
            return res.status(500).json({ 
                error: 'Database operation failed',
                details: err.message
            });
        }
        
        console.log('SUCCESS: Data inserted into database');
        console.log('Insert ID:', result.insertId);
        console.log('Affected rows:', result.affectedRows);
        
        res.json({ 
            message: 'Registration successful', 
            id: result.insertId,
            success: true
        });
    });
});

// Test endpoint
app.get('/test-db', (req, res) => {
    db.query('SELECT COUNT(*) as count FROM students', (err, results) => {
        if (err) {
            console.error('Test query failed:', err);
            return res.status(500).json({ 
                error: 'Database test failed',
                details: err.message
            });
        }
        
        res.json({ 
            message: 'Database connection successful',
            totalRegistrations: results[0].count
        });
    });
});

// View registrations endpoint
app.get('/registrations', (req, res) => {
    db.query('SELECT * FROM students ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Query failed:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        
        res.json(results);
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Institute Registration API',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`=== SERVER STARTED ===`);
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n=== SERVER SHUTTING DOWN ===');
    db.end((err) => {
        if (err) {
            console.error('Error closing database connection:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});