let express = require('express')
let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let cors = require('cors')
let jwt = require('jsonwebtoken')
let User = require('./db/db.js')
let Order = require('./db/order.js')

let app = express()
let secret = process.env.JWT_SECRET || 'development-secret-change-me'

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/db')
  .then(function () {
    console.log('Database connected')
  })
  .catch(function (error) {
    console.log('Database connection failed', error.message)
  })

function userData(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

function auth(req, res, next) {
  let token = req.headers.authorization

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Login is required' })
  }

  token = token.split(' ')[1]

  try {
    req.user = jwt.verify(token, secret)
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can do this' })
  }
  next()
}

app.post('/signUp', async function (req, res) {
  try {
    let name = req.body.name
    let email = req.body.email
    let passWord = req.body.passWord

    if (!name || !email || !passWord) {
      return res.status(400).json({ message: 'Enter name, email and password' })
    }

    email = email.trim().toLowerCase()
    let oldUser = await User.findOne({ email: email })

    if (oldUser) {
      return res.status(409).json({ message: 'Email already exists' })
    }

    let passwordHash = await bcrypt.hash(passWord, 10)
    let user = await User.create({
      name: name,
      email: email,
      passWord: passwordHash,
    })

    res.status(201).json({ user: userData(user) })
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message })
  }
})

app.post('/login', async function (req, res) {
  try {
    let email = req.body.email
    let passWord = req.body.passWord

    if (!email || !passWord) {
      return res.status(400).json({ message: 'Enter email and password' })
    }

    email = email.trim().toLowerCase()
    let user = await User.findOne({ email: email }).select('+passWord')

    if (!user) {
      return res.status(401).json({ message: 'Wrong email or password' })
    }

    let passwordIsCorrect = await bcrypt.compare(passWord, user.passWord)
    if (!passwordIsCorrect) {
      return res.status(401).json({ message: 'Wrong email or password' })
    }

    let token = jwt.sign({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    }, secret, { expiresIn: '1d' })

    res.json({ token: token, user: userData(user) })
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
})

app.get('/me', auth, async function (req, res) {
  try {
    let user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user: userData(user) })
  } catch (error) {
    res.status(400).json({ message: 'Could not find user', error: error.message })
  }
})

app.put('/me', auth, async function (req, res) {
  try {
    let name = req.body.name

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Enter a valid name' })
    }

    let user = await User.findByIdAndUpdate(
      req.user.userId,
      { name: name.trim() },
      { new: true, runValidators: true },
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user: userData(user) })
  } catch (error) {
    res.status(400).json({ message: 'Name was not updated', error: error.message })
  }
})

app.patch('/users/:id/role', auth, adminOnly, async function (req, res) {
  try {
    let id = req.params.id
    let role = req.body.role

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user id' })
    }

    if (role !== 'user' && role !== 'admin') {
      return res.status(400).json({ message: 'Role must be user or admin' })
    }

    let user = await User.findByIdAndUpdate(
      id,
      { role: role },
      { new: true, runValidators: true },
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user: userData(user) })
  } catch (error) {
    res.status(500).json({ message: 'Role was not updated', error: error.message })
  }
})

app.post('/orders', auth, async function (req, res) {
  try {
    let order = await Order.create({
      productName: req.body.productName,
      amount: req.body.amount,
      userId: req.user.userId,
    })

    res.status(201).json({ order: order })
  } catch (error) {
    res.status(400).json({ message: 'Order was not created', error: error.message })
  }
})

app.get('/my-orders', auth, async function (req, res) {
  try {
    let orders = await Order.find({ userId: req.user.userId })
    res.json({ orders: orders })
  } catch (error) {
    res.status(400).json({ message: 'Orders could not be found', error: error.message })
  }
})

app.get('/users/:id', auth, adminOnly, async function (req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid user id' })
  }

  let user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json({ user: userData(user) })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is running')
})

module.exports = app
