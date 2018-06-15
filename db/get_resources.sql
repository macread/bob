SELECT 
    resources.id, 
    username, 
    resources.date AS resourcedate,
    resources.title AS resourcetitle, 
    url, 
    resources.description, 
    contacts.title AS contacttitle, 
    contacts.date AS contactdate, 
    contacts.description AS contactdescription
FROM resources
    JOIN users ON resources.userid = users.id
    JOIN contacts ON contacts.resourceid = resources.id
WHERE users.id =  $1