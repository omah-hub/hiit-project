const User = require('../model/userModel')

exports.getProfile = async (req, res) => {

    try {
        const user_id = req.user_id
        const user = await User.getProfile(user_id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getBooks = async (req, res) => {

    try {
        const user_id = req.user_id
        const books = await User.getBooks(user_id)
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getName = async (req, res) => {
    try {
        const user_id = req.user_id
        const name = await User.getName(user_id)
        res.status(200).json(name)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}