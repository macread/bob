SELECT COUNT(*) FROM contacts
WHERE date >= $1 AND date <= $2 AND inperson = true 