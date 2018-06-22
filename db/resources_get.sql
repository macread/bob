SELECT 
    resources.id, 
    username, 
    resources.date AS resourcedate,
    resources.type,
    resources.title AS resourcetitle, 
    url, 
    resources.description, 
    contacts.id AS contactid, 
    contacts.title AS contacttitle, 
    contacts.date AS contactdate, 
    contacts.description AS contactdescription
FROM resources
    JOIN users ON resources.userid = users.id
    LEFT JOIN contacts ON contacts.resourceid = resources.id
WHERE users.id = $1
ORDER BY resources.date, resources.type, resources.title, contacts.date, contacts.type, contacts.title