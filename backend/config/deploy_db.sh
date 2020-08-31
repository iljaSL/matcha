#!/bin/sh

path=$(cd $( dirname ${BASH_SOURCE[0]}) && pwd )/matcha.sql;

cd /goinfre/ismelich/mamp/mysql/bin;

./mysql < $path -u root -p;

echo "Database has been deployed!"