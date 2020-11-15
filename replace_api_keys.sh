#! /usr/bin/env bash

error(){
    echo "ERREUR : invalid parameters !" >&2
    echo "see $0 -h" >&2
    exit 1
}

usage(){
    echo "Usage: $0 [options]"
    echo "-h : display this help menu"
    echo "-a <n2yo_api_key> -g <google_maps_api_key> : sets the N2YO API an GOOGLE MAPS API keys for the project"
}

SET_N2YO_API_KEY() {
  echo "set n2yo api key: $1"
  N2YO_API_KEY=$1
}

SET_GOOGLE_MAPS_API_KEY() {
  echo "set google maps api key: $1"
  GOOGLE_MAP_API_KEY=$1
}

processing(){
 sed -i "s/<N2YO_API_KEY>/${N2YO_API_KEY}/g" docker-compose.yml
 sed -i "s/<GOOGLE_MAP_API_KEY>/${GOOGLE_MAP_API_KEY}/g" packages/frontend/package.json
 sed -i "s/<N2YO_API_KEY>/${N2YO_API_KEY}/g" pm2.json
 sed -i "s/<GOOGLE_MAP_API_KEY>/${GOOGLE_MAP_API_KEY}/g" pm2.json
}

# No parameters
[[ $# -lt 1 ]] && error

while getopts ":a:g:h" option; do
  case "$option" in
      a) SET_N2YO_API_KEY $OPTARG ;;
      g) SET_GOOGLE_MAPS_API_KEY $OPTARG ;;
      :) error ;;
      h) usage ;;
      *) error ;;
  esac
done

processing
