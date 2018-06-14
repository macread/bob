SELECT resources.id, username, date, title, url, description FROM resources
JOIN users ON resources.userid = users.id
WHERE users.id =  $1