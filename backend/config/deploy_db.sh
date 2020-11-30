#!/bin/sh

UP=$(pgrep postgres | wc -l);
path=$(cd $( dirname ${BASH_SOURCE[0]}) && pwd )/matcha.sql;

if [ "$UP" == 0 ]; then
     echo "postgres deamon is not running.";
else
    createdb matcha;
    psql matcha < $path;
    echo "Database has been deployed!";
fi