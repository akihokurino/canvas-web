MAKEFLAGS=--no-builtin-rules --no-builtin-variables --always-make
ROOT := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))

vendor:
	yarn install

gen:
	rm -fr ./src/generated
	# ./node_modules/.bin/apollo client:download-schema ./schema.graphql
	npm run graphql:codegen

run-local:
	npm start