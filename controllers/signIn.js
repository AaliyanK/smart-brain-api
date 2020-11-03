const handleSignin = (req,res,db,bcrypt)=>{

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Incorrect form submission')
    }

    db.select('email','hash').from('login')
    .where('email', '=', email)
    .then(data => {
        // When user signs in, make sure his input is the same as the hash
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid) {
            db.select('*').from('users').where('email', '=', email)
            .then(user => {
                res.json(user[0])
            }) 
            .catch(err => res.status(400).json('Unable to get user'))
        } else {
            res.status(400).json('Wrong Credentials')
        }
    })
}

module.exports = {
    handleSignin: handleSignin
}