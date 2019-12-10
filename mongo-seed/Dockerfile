FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db stream_db --collection users --type json --file /init.json --jsonArray