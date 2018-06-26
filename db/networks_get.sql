SELECT networks.id, name FROM networks
JOIN cr_networks ON networks.id = cr_networks.networkid
WHERE cr_networks.contactid = $1