module.exports = {
    getUser: (req, res, next) => {
        const connection = req.app.get('db');
        connection.user_get(req.user.id)
            .then( (user)=> {
                res.status(200).send(user)})
            .catch( (err)=> res.status(500).send() );
    },

    updateUser: (req, res, next) => {
        const connection = req.app.get('db');
        const { email, resources, contacts, meetings} = req.body;
        connection.user_update([email, resources, contacts, meetings, req.user.id])
            .then( (user)=> {
                res.status(200).send(user)})
            .catch( (err)=> res.status(500).send() );
    },

    addResource: (req, res, next) => {
        const connection = req.app.get('db');
        const { date, type, title, url, description} = req.body;
        connection.resource_add([req.user.id, date, type, title, url, description])
            .then ( (resources) => {
                res.status(200).send(resources)} )
            .catch ( (err) => res.status(500).send())
    },

    getResources: (req, res, next) => {
        const connection = req.app.get('db');
        connection.resources_get(req.user.id)
            .then ( (resources) => {
                res.status(200).send(resources)} )
            .catch ( (err) => res.status(500).send())
    },

    deleteResource: (req, res, next) => {
        const connection = req.app.get('db');
        const { id } = req.params;
        connection.resource_delete([id])
            .then ( (resources) => {
                res.status(200).send(resources)} )
            .catch ( (err) => res.status(500).send())
    },


    updateResource: (req, res, next) => {
        const connection = req.app.get('db');
        const { id, date, type, title, url, description} = req.body;
        connection.resource_update([date, type, title, url, description, id])
            .then ( (resources) => {
                res.status(200).send(resources)} )
            .catch ( (err) => res.status(500).send())
    },

}