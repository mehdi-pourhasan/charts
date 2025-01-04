const express = require('express')
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

// Store JSON data in memory (for demo purposes)
let jsonData = null

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  const results = []

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Store the JSON data
      jsonData = results

      // Create JSON file
      const jsonFileName = `${path.parse(req.file.filename).name}.json`
      const jsonPath = path.join('uploads', jsonFileName)

      fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2))

      // Clean up CSV file
      fs.unlinkSync(req.file.path)

      res.json({
        message: 'File successfully processed',
        dataUrl: `/api/data`,
      })
    })
})

// Data retrieval endpoint
app.get('/api/data', (req, res) => {
  if (!jsonData) {
    return res.status(404).json({ error: 'No data available' })
  }
  res.json(jsonData)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
