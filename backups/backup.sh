# take backup
sh -c 'echo "$PGPASS" > $HOME/.pgpass && chmod 600 $HOME/.pgpass && sleep 45 && pg_dump -U postgres -h endeavour.cs.vt.edu -p 30030 codekids > /var/backups/backup-$(date +"%m-%d-%Y-%H-%M").sql'

# delete older than month
find /backups -mtime +30 -exec rm -f {} \;