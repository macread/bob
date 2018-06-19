module.exports = {
    getUser: (req, res, next) => {
        const connection = req.app.get('db');
        connection.get_user(req.user.id)
            .then( (user)=> {
                res.status(200).send(user)})
            .catch( (err)=> res.status(500).send() );
    },

    updateUser: (req, res, next) => {
        const connection = req.app.get('db');
        const { email, resources, contacts, meetings} = req.body;
        connection.update_user([email, resources, contacts, meetings, req.user.id])
            .then( (user)=> {
                res.status(200).send(user)})
            .catch( (err)=> res.status(500).send() );
    },

    getResources: (req, res, next) => {
        const connection = req.app.get('db');
        connection.get_resources(req.user.id)
            .then ( (resources) => {
                res.status(200).send(resources)} )
            .catch ( (err) => res.status(500).send())
    },


    updateResource: (req, res, next) => {
        const connection = req.app.get('db');
        const { id, date, type, title, url, description} = req.body;
        connection.update_resource([date, type, title, url, description, id])
            .then ( (resources) => {
                res.status(200).send(resources)} )
            .catch ( (err) => res.status(500).send())
    },

}