const jwt = require('jsonwebtoken')

const Patient = require('../../models/Patient.js');
const Doctor = require('../../models/Doctor.js');

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body
    Patient.findOne({ email }, function(err, patient) {
      if (err) {
        console.error(err)
        res.status(500).json({
          error: 'Internal error please try again'
        })
      } else if (!patient) {
        res.status(401).json({
          error: 'Incorrect email or password'
        })
      } else {
        patient.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500).json({   
              error: 'Internal error please try again'
            })
          } else if (!same) {
            res.status(401).json({
              error: 'Incorrect email or password'
            })
          } else {
            // Issue token
            const payload = { email }
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            })
            res.cookie('token', token, { httpOnly: true }).sendStatus(200)
          }
        })
      }
    })
  },
  register: (req, res) => {
    console.log('register is hit', req.body)
    const { email, password } = req.body
    const patient = new Patient({ email, password })
    patient.save(function(err) {
      if (err) {
        res.status(500).send('Error registering new patient please try again.')
      } else {
        res.status(200).send('Welcome to the club!')
      }
    })
  }
}
