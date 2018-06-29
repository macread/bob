SELECT networks.id, cr_networks.id as connectionid, name, email FROM networks
JOIN cr_networks ON networks.id = cr_networks.networkid
WHERE cr_networks.contactid = $1