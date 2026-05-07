// ==================== FULL INDEX.JS WITH JWT AUTH ====================
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()

// JWT secret (set in Vercel environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-change-this'

// CORS config
const allowedOrigins = [
  'https://goabroadadmissions.vercel.app',
  'https://goabroadadmissions-git-main.vercel.app',
  /\.vercel\.app$/,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000'
]

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    const ok = allowedOrigins.some(a => a instanceof RegExp ? a.test(origin) : a === origin)
    ok ? cb(null, true) : cb(new Error('CORS blocked'))
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With']
}))
app.use(express.json())

// ==================== LAZY DATABASE POOL (unchanged) ====================
let poolPromise = null

async function getDb() {
  if (!poolPromise) {
    const cfg = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      idleTimeout: 60000,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    }
    const pool = mysql.createPool(cfg)
    poolPromise = pool.promise()
  }
  return poolPromise
}

async function executeWithRetry(db, sql, params) {
  try {
    return await db.execute(sql, params)
  } catch (err) {
    if (err.message && err.message.includes('closed state')) {
      console.warn('Connection closed, reconnecting...')
      poolPromise = null
      const newDb = await getDb()
      return await newDb.execute(sql, params)
    }
    throw err
  }
}

let tablesReady = false
async function ensureTables(db) {
  if (tablesReady) return
  console.log('📋 Initializing tables...')
  await db.execute(`CREATE TABLE IF NOT EXISTS admins (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)
  const [admins] = await db.execute('SELECT * FROM admins WHERE username = ?', ['admin'])
  if (admins.length === 0) {
    const hashed = await bcrypt.hash('admin123', 10)
    await db.execute('INSERT INTO admins (username, password, email) VALUES (?,?,?)', ['admin', hashed, 'admin@goabroad.com'])
  }
  await db.execute(`CREATE TABLE IF NOT EXISTS subscribers (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)
  await db.execute(`CREATE TABLE IF NOT EXISTS contacts (id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(50), subject VARCHAR(255) NOT NULL, message TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)
  await db.execute(`CREATE TABLE IF NOT EXISTS scholarship_inquiries (id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(50), scholarship_title VARCHAR(500) NOT NULL, message TEXT NOT NULL, status ENUM('pending','contacted','completed') DEFAULT 'pending', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`)
  await db.execute(`CREATE TABLE IF NOT EXISTS scholarships (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(500) NOT NULL, country VARCHAR(255) NOT NULL, degree VARCHAR(100) NOT NULL, description TEXT NOT NULL, eligibility TEXT, benefits TEXT, deadline DATE, link VARCHAR(500), image_url VARCHAR(500), status ENUM('active','inactive') DEFAULT 'active', featured BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`)
  const [cnt] = await db.execute('SELECT COUNT(*) as c FROM scholarships')
  if (cnt[0].c === 0) {
    const samples = [
      {
        title: 'Fulbright Scholarship 2025', country: 'USA', degree: "Master's & PhD",
        description: 'The Fulbright Scholarship provides funding for international students to study in the United States.',
        eligibility: 'Open to all nationalities. Bachelor\'s degree required. Minimum GPA 3.0.',
        benefits: 'Full tuition coverage, monthly stipend of $2,000, health insurance, round-trip airfare.',
        deadline: '2025-10-15', link: 'https://foreign.fulbrightonline.org',
        image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&auto=format&fit=crop',
        status: 'active', featured: true
      },
      {
        title: 'Chevening Scholarship', country: 'UK', degree: "Master's",
        description: 'Chevening is the UK government\'s international awards program aimed at developing global leaders.',
        eligibility: 'Citizens of Chevening-eligible countries. 2+ years of work experience. Undergraduate degree.',
        benefits: 'Full tuition fees, living allowance, return flights to UK, additional grants.',
        deadline: '2025-11-07', link: 'https://www.chevening.org',
        image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop',
        status: 'active', featured: true
      },
      {
        title: 'DAAD Scholarship Germany', country: 'Germany', degree: "Master's & PhD",
        description: 'DAAD offers scholarships for international students to study in Germany.',
        eligibility: 'Bachelor\'s degree in relevant field. Good academic record.',
        benefits: 'Monthly stipend of €934, health insurance, travel allowance, study allowance.',
        deadline: '2025-09-30', link: 'https://www.daad.de',
        image_url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&auto=format&fit=crop',
        status: 'active', featured: false
      }
    ]
    for (const s of samples) {
      await db.execute(`INSERT INTO scholarships (title,country,degree,description,eligibility,benefits,deadline,link,image_url,status,featured) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [s.title, s.country, s.degree, s.description, s.eligibility, s.benefits, s.deadline, s.link, s.image_url, s.status, s.featured])
    }
  }
  tablesReady = true
  console.log('✅ Tables ready')
}

// Middleware to attach db
app.use(async (req, res, next) => {
  try {
    const db = await getDb()
    req.db = db
    await ensureTables(db)
    next()
  } catch (err) {
    console.error('DB middleware error:', err)
    res.status(500).json({ error: 'Database unavailable' })
  }
})

// ==================== JWT MIDDLEWARE ====================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.admin = decoded
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' })
    }
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

// ==================== ROUTES ====================

// ---- Admin login (returns JWT) ----
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ success: false, message: 'Missing fields' })
  try {
    const [rows] = await executeWithRetry(req.db, 'SELECT id, username, email, password FROM admins WHERE username = ?', [username])
    if (rows.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' })
    const admin = rows[0]
    const match = await bcrypt.compare(password, admin.password)
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' })
    
    // Generate JWT (expires in 8 hours – good for a student dashboard)
    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email },
      JWT_SECRET,
      { expiresIn: '8h' }
    )
    res.json({ success: true, token, admin: { id: admin.id, username: admin.username, email: admin.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// ---- Verify token (protected) ----
app.get('/api/admin/verify', verifyToken, (req, res) => {
  res.json({ success: true, message: 'Token valid', admin: req.admin })
})

// ---- Change password (protected) ----
app.post('/api/admin/change-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Missing fields' })
  }
  if (newPassword.length < 4) {
    return res.status(400).json({ success: false, message: 'Password must be at least 4 characters' })
  }
  try {
    const [rows] = await executeWithRetry(req.db, 'SELECT password FROM admins WHERE id = ?', [req.admin.id])
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Admin not found' })
    const valid = await bcrypt.compare(currentPassword, rows[0].password)
    if (!valid) return res.status(401).json({ success: false, message: 'Current password incorrect' })
    const hashed = await bcrypt.hash(newPassword, 10)
    await executeWithRetry(req.db, 'UPDATE admins SET password = ? WHERE id = ?', [hashed, req.admin.id])
    res.json({ success: true, message: 'Password changed successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// usernames changes route
// ---- Change username (protected) ----
app.post('/api/admin/change-username', verifyToken, async (req, res) => {
  const { newUsername, currentPassword } = req.body
  if (!newUsername || !currentPassword) {
    return res.status(400).json({ success: false, message: 'New username and current password are required' })
  }
  if (newUsername.length < 3) {
    return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' })
  }
  try {
    // First verify the password
    const [rows] = await executeWithRetry(req.db, 'SELECT password FROM admins WHERE id = ?', [req.admin.id])
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Admin not found' })
    const valid = await bcrypt.compare(currentPassword, rows[0].password)
    if (!valid) return res.status(401).json({ success: false, message: 'Current password is incorrect' })
    
    // Check if username already exists
    const [existing] = await executeWithRetry(req.db, 'SELECT id FROM admins WHERE username = ? AND id != ?', [newUsername, req.admin.id])
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already taken' })
    }
    
    // Update username
    await executeWithRetry(req.db, 'UPDATE admins SET username = ? WHERE id = ?', [newUsername, req.admin.id])
    res.json({ success: true, message: 'Username changed successfully. Please log in again.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})
// ---- All other routes (same as before, but replace `checkToken` with `verifyToken` where needed) ----

// Newsletter subscription (public)
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email required' })
  }
  try {
    const [existing] = await executeWithRetry(req.db, 'SELECT * FROM subscribers WHERE email = ?', [email])
    if (existing.length) return res.status(400).json({ success: false, message: 'Already subscribed' })
    await executeWithRetry(req.db, 'INSERT INTO subscribers (email) VALUES (?)', [email])
    res.json({ success: true, message: 'Subscribed!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Subscription failed' })
  }
})

// Contact form (public)
app.post('/api/contact', async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body
  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields required' })
  }
  try {
    await executeWithRetry(req.db, 'INSERT INTO contacts (full_name, email, phone, subject, message) VALUES (?,?,?,?,?)',
      [fullName, email, phone || null, subject, message])
    res.json({ success: true, message: 'Message sent!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Failed to send' })
  }
})

// Scholarship inquiry (public)
app.post('/api/scholarship/inquiry', async (req, res) => {
  const { fullName, email, phone, scholarshipTitle, message } = req.body
  if (!fullName || !email || !scholarshipTitle || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' })
  }
  try {
    const [result] = await executeWithRetry(req.db,
      'INSERT INTO scholarship_inquiries (full_name, email, phone, scholarship_title, message) VALUES (?,?,?,?,?)',
      [fullName, email, phone || null, scholarshipTitle, message])
    res.json({ success: true, message: 'Inquiry submitted', inquiryId: result.insertId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Failed to submit' })
  }
})

// Public scholarships
app.get('/api/scholarships', async (req, res) => {
  const { featured, status } = req.query
  let sql = 'SELECT * FROM scholarships WHERE 1=1'
  const params = []
  if (featured === 'true') { sql += ' AND featured = ?'; params.push(true) }
  if (status) { sql += ' AND status = ?'; params.push(status) }
  sql += ' ORDER BY featured DESC, created_at DESC'
  try {
    const [rows] = await executeWithRetry(req.db, sql, params)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/scholarships/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await executeWithRetry(req.db, 'SELECT * FROM scholarships WHERE id = ?', [id])
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ----- PROTECTED ROUTES (require JWT) -----
app.get('/api/subscribers', verifyToken, async (req, res) => {
  try {
    const [rows] = await executeWithRetry(req.db, 'SELECT * FROM subscribers ORDER BY subscribed_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/subscriber/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  try {
    await executeWithRetry(req.db, 'DELETE FROM subscribers WHERE id = ?', [id])
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed' })
  }
})

app.get('/api/contacts', verifyToken, async (req, res) => {
  try {
    const [rows] = await executeWithRetry(req.db, 'SELECT * FROM contacts ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/contact/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  try {
    await executeWithRetry(req.db, 'DELETE FROM contacts WHERE id = ?', [id])
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed' })
  }
})

app.get('/api/scholarship/inquiries', verifyToken, async (req, res) => {
  try {
    const [rows] = await executeWithRetry(req.db, 'SELECT * FROM scholarship_inquiries ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/scholarship/inquiry/:id/status', verifyToken, async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  if (!['pending','contacted','completed'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' })
  try {
    await executeWithRetry(req.db, 'UPDATE scholarship_inquiries SET status = ? WHERE id = ?', [status, id])
    res.json({ success: true, message: 'Status updated' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' })
  }
})

app.delete('/api/scholarship/inquiry/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  try {
    await executeWithRetry(req.db, 'DELETE FROM scholarship_inquiries WHERE id = ?', [id])
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed' })
  }
})

// Scholarship CRUD
app.post('/api/admin/scholarships', verifyToken, async (req, res) => {
  const { title, country, degree, description, eligibility, benefits, deadline, link, image_url, status, featured } = req.body
  if (!title || !country || !degree || !description) return res.status(400).json({ success: false, message: 'Missing required fields' })
  try {
    const [result] = await executeWithRetry(req.db,
      `INSERT INTO scholarships (title,country,degree,description,eligibility,benefits,deadline,link,image_url,status,featured)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [title, country, degree, description, eligibility||null, benefits||null, deadline||null, link||null, image_url||null, status||'active', featured||false])
    res.json({ success: true, message: 'Created', id: result.insertId })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Creation failed' })
  }
})

app.put('/api/admin/scholarships/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const { title, country, degree, description, eligibility, benefits, deadline, link, image_url, status, featured } = req.body
  try {
    await executeWithRetry(req.db,
      `UPDATE scholarships SET title=?, country=?, degree=?, description=?, eligibility=?, benefits=?, deadline=?, link=?, image_url=?, status=?, featured=? WHERE id=?`,
      [title, country, degree, description, eligibility||null, benefits||null, deadline||null, link||null, image_url||null, status||'active', featured||false, id])
    res.json({ success: true, message: 'Updated' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' })
  }
})

app.delete('/api/admin/scholarships/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  try {
    await executeWithRetry(req.db, 'DELETE FROM scholarships WHERE id = ?', [id])
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed' })
  }
})

app.patch('/api/admin/scholarships/:id/feature', verifyToken, async (req, res) => {
  const { id } = req.params
  const { featured } = req.body
  try {
    await executeWithRetry(req.db, 'UPDATE scholarships SET featured = ? WHERE id = ?', [featured, id])
    res.json({ success: true, message: featured ? 'Featured' : 'Unfeatured' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' })
  }
})

app.patch('/api/admin/scholarships/:id/status', verifyToken, async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  if (!['active','inactive'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' })
  try {
    await executeWithRetry(req.db, 'UPDATE scholarships SET status = ? WHERE id = ?', [status, id])
    res.json({ success: true, message: `Status updated to ${status}` })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' })
  }
})

app.get('/api/scholarship/admin/stats', verifyToken, async (req, res) => {
  try {
    const [sub] = await executeWithRetry(req.db, 'SELECT COUNT(*) as count FROM subscribers')
    const [cont] = await executeWithRetry(req.db, 'SELECT COUNT(*) as count FROM contacts')
    const [inq] = await executeWithRetry(req.db, 'SELECT COUNT(*) as count FROM scholarship_inquiries')
    const [schol] = await executeWithRetry(req.db, 'SELECT COUNT(*) as count FROM scholarships')
    const [feat] = await executeWithRetry(req.db, 'SELECT COUNT(*) as count FROM scholarships WHERE featured = true')
    const [act] = await executeWithRetry(req.db, 'SELECT COUNT(*) as count FROM scholarships WHERE status = "active"')
    res.json({
      total_subscribers: sub[0].count,
      total_contacts: cont[0].count,
      total_inquiries: inq[0].count,
      total_scholarships: schol[0].count,
      featured_scholarships: feat[0].count,
      active_scholarships: act[0].count
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/scholarship/stats', async (req, res) => {
  try {
    const [inq] = await executeWithRetry(req.db,
      `SELECT COUNT(*) as total_inquiries,
              SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) as pending_inquiries,
              SUM(CASE WHEN status='contacted' THEN 1 ELSE 0 END) as contacted_inquiries,
              SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed_inquiries
       FROM scholarship_inquiries`)
    res.json(inq[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/scholarship/popular', async (req, res) => {
  try {
    const [rows] = await executeWithRetry(req.db,
      `SELECT scholarship_title, COUNT(*) as inquiry_count
       FROM scholarship_inquiries
       GROUP BY scholarship_title
       ORDER BY inquiry_count DESC
       LIMIT 10`)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'GoAbroad Admissions API', version: '8.0.0', status: 'running' })
})

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

module.exports = app