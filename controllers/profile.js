const handleProfileGet = (req, res, db) => {
    const { id } = req.params;

    // Return specific user object from given id
    db.select('*').from('users').where('id',id).then(user => {
        // If user array that is returned has some length, and isnt empty, return first entry
        if (user.length){
            res.json(user[0])
        } else {
            res.status(400).json('error getting user')
        }
        
    })
}

module.exports = {
    handleProfileGet
}