#
# Copyright 2011 Josh Perez <josh@goatslacker.com>
#

.PHONY: all install clean uninstall 

all: install

install:
	@npm install -g && \
		echo 'Arcane installed.'

clean:
	@true

uninstall:
	@npm uninstall forge -g && \
		echo 'Arcane uninstalled.'
