#!/bin/sh

DIR=$1

count=$(find "$DIR" -mindepth 1 -type d | wc -l)

echo "Number of folders: $count"