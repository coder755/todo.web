#!/bin/bash
set -e # exit on error

# this file is expected to be run from the code folder
# ./../scripts/deployS3.sh
# can take a -mode or --mode parameter. Possible values are 'prod' or 'dev'.
# 'dev' is intended for debugging in production. Defaults to 'prod' 
MODE=prod

# read the options
TEMP=`getopt -o m: --long mode: -- "$@"`
eval set -- "$TEMP"

# extract options and their arguments into variables.
while true ; do
    case "$1" in
        -m|--mode)
            MODE=$2 ; shift 2 ;;
        --) shift ; break ;;
        *) echo "Internal error!" ; exit 1 ;;
    esac
done

source $NVM_DIR/nvm.sh
nvm use
npm install
rm -rf dist

if [ "$MODE" = "prod" ]
then
  npm run build
elif [ "$MODE" = "dev" ]
then
  npm run dev:build
else
   echo "Error. $MODE not a valide mode parameter"
   exit 123
fi

cd dist
export AWS_DEFAULT_PROFILE=coderPark
aws s3 cp . s3://todo.web.bucket --recursive
aws cloudfront create-invalidation --distribution-id E3IUEM4CUC7N9O --paths "/*"