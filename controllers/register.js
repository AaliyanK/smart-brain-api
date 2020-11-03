const handleRegister = (req, res, db, bcrypt) => {
    // Want to create a user from front end and add info to db

    const { email, name, password } = req.body;

    // Data Validation
    // If any of the passed in variables are empty:
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission')
    }

    // Store hash password:
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        }) 
        .into('login') // Insert into login table
        .returning('email') // Return the email column value
        .then(loginEmail => { // Use the email that we got back and put it into users table when registering
            return db('users').returning('*').insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                // SEND back response to frontend
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    // Insert the user data into DB - return ALL columns 
        
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}