#!/bin/sh

UP=$(pgrep mysql | wc -l);
path=$(cd $( dirname ${BASH_SOURCE[0]}) && pwd )/matcha.sql;

if [ "$UP" -ne 1 ]; then
     echo "mySQL deamon is not running.";
else
    cd /goinfre/ismelich/mamp/mysql/bin;
    ./mysql < $path -u root -p;
    echo "Database has been deployed!";
fi