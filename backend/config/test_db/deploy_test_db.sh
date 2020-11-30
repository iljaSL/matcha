#!/bin/sh

UP=$(pgrep postgres | wc -l);
path=$(cd $( dirname ${BASH_SOURCE[0]}) && pwd )/test_db.sql;

if [ "$UP" > 0 ]; then
     echo "postgres deamon is not running.";
else
    createdb matcha_test;
    psql matcha_test < $path;
    echo "Database has been deployed!";
fi