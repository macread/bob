module.exports = {
    getUser: (req, res, next)=> {
        const connection = req.app.get('db');
        connection.get_user(req.user.id)
            .then( (user)=> {
                res.status(200).send(user)})
            .catch( (err)=> res.status(500).send() );
    },

    updateUser: (req, res, next)=> {
        const connection = req.app.get('db');
        const { email, resources, contacts, meetings} = req.body;
        connection.update_user([email, resources, contacts, meetings, req.user.id])
            .then( (user)=> {
                req.session.userid = use[0].id
                res.status(200).send(user)})
            .catch( (err)=> res.status(500).send() );
    },

}