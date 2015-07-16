[ ! -f node_modules/.bin/bower ] && echo "Building npm modules: " && npm rebuild
node_modules/.bin/bower $*
