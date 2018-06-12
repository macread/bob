module.exports = {
    getUser: (req, res, next)=> {
        const connection = req.app.get('db');
        connection.get_user(req.user.id)
            .then( (user)=> {
                res.status(200).send(user)})
            .catch( (err)=> res.status(500).send() );
    },

}