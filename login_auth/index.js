const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const crypto = require('crypto')
let 