FROM postgres:latest

# set cronjob
COPY cronjob /etc/cron.d/cronjob

# give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/cronjob