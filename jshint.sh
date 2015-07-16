[ ! -f node_modules/.bin/jshint ] && echo "Building npm modules: " && npm rebuild
node_modules/.bin/jshint $*
