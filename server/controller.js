module.exports = {
    // Contact Callbacks

    addContact: (req, res, next) => {
        const connection = req.app.get('db');
        const { resourceid, date, type, title, description, inperson } = req.body;
        connection.contact_add([resourceid, date, type, title, description, inperson])
            .then ( (contacts) => {
                res.status(200).send(contacts)} )
            .catch ( (err) => res.status(500).send())
    },

    deleteContact: (req, res, next) => {
        const connection = req.app.get('db');
        connection.contact_delete([req.params.id])
            .then ( (resources) => {
                res.status(200).send(resources)} )
            .catch ( (err) => res.status(500).send())
    },
    
    getContact: (req, res, next) => {
        const connection = req.app.get('db');
        connection.contact_get([req.params.id])
            .then ( (contacts) => {
                res.status(200).send(contacts)} )
            .catch ( (err) => res.status(500).send())
    },
    
    getContactCount: (req, res, next) => {
        const connection = req.app.get('db');
        connection.contacts_getCount([req.query.from, req.query.to])
            .then ( (contacts) => {
                res.status(200).send(contacts[0])} )
            .catch ( (err) => res.status(500).send())
    },

    getContacts: (req, res, next) => {
        const connection = req.app.get('db');
        connection.contacts_get([req.params.id])
            .then ( (contacts) => {
                res.status(200).send(contacts)} )
            .catch ( (err) => res.status(500).send())
    },

    updateContact: (req, res, next) => {
        const connection = req.app.get('db');
        const { id, date, type, title, description, inperson} = req.body;
        connection.contact_update([date, type, title, description, inperson, id])
            .then ( (contacts) => {
                res.status(200).send(contacts)} )
            .catch ( (err) => res.status(500).send())
    },

    getMeetingCount: (req, res, next) => {
        const connection = req.app.get('db');
        connection.contacts_getMeetingCount([req.query.from, req.query.to])
            .then ( (contacts) => {
                res.status(200).send(contacts[0])} )
            .catch ( (err) => res.status(500).send())
    },

    // Network Callbacks

    addNetwork: (req, res, next) => {
        const connection = req.app.get('db');
        const { contactid, name, address, mobile, office, notes } = req.body;
        connection.network_add([contactid, name, address, mobile, office, notes])
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send(err))
    },

    addUnrelatedNetwork: (req, res, next) => {
        const connection = req.app.get('db');
        const { name, address, mobile, office, notes } = req.body;
        connection.network_add_unrelated([name, address, mobile, office, notes])
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send(err))
    },

    addNetworkConnection: (req, res, next) => {
        const connection = req.app.get('db');
        const { contactid, networkid } = req.body;
        connection.network_add_connection([contactid, networkid])
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send(err))
    },

    deleteNetwork: (req, res, next) => {
        const connection = req.app.get('db');
        connection.network_delete([req.params.id])
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send(err))
    },

    deleteNetworkConnection: (req, res, next) => {
        const connection = req.app.get('db');
        connection.network_delete_connection([req.params.id])
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send(err))
    },
    

        // gets all networks
    getAllNetworks: (req, res, next) => {
        const connection = req.app.get('db');
        connection.network_get_all()
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send(err))
    },

    updateNetwork: (req, res, next) => {
        const connection = req.app.get('db');
        const { id, name, address, mobile, work, email, notes } = req.body;
        connection.network_update([name, address, mobile, work, email, notes, id ])
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send())
    },

        // gets one network using network id
    getNetwork: (req, res, next) => {
        const connection = req.app.get('db');
        connection.network_get([req.params.id])
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send(err))
    },

        // gets all networks related to the contact id
    getNetworks: (req, res, next) => {
        const connection = req.app.get('db');
        connection.networks_get([req.params.id])
            .then ( (networks) => {
                res.status(200).send(networks)} )
            .catch ( (err) => res.status(500).send(err))
    },

    // Resource Callbacks

    addResource: (req, res, next) => {
        const connection = req.app.get('db');
        const { date, type, title, url, description} = req.body;
        connection.resource_add([req.user.id, date, type, title, url, description])
            .then ( (resources) => {
                res.status(200).send(resources)} )
            .catch ( (err) => res.status(500).send())
    },

    getResourceCount: (req, res, next) => {
        const connection = req.app.get('db');
        connection.resources_getCount([req.query.from, req.query.to])
        .then ( (resources) => {
            res.status(200).send(resources[0])} )
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
        connection.resource_delete([req.params.id])
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

    // USER Callbacks

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

    sendEmail: (req, res, next) => {
        const { email, subject, text, html } = req.body;

        const { 
            NODEMAILER_USER, 
            NODEMAILER_CLIENTID, 
            NODEMAILER_CLIENTSECRET, 
            NODEMAILER_REFRESHTOKEN 
        } = process.env;
        
        const nodemailer = require('nodemailer');
        const xoauth2 = require ('xoauth2');
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: NODEMAILER_USER,
                clientId: NODEMAILER_CLIENTID,
                clientSecret: NODEMAILER_CLIENTSECRET,
                refreshToken: NODEMAILER_REFRESHTOKEN
            }
        })
        
        var mail = {
            from: 'Mac <devjmacread@gmail.com>',
            to: email,
            subject: subject,
            text: text,
            html: html
          }
        
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log('Email Send Error:',err)
            } else {
                res.json({msg: 'success'})
            }
        })
    },

}