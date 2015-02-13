# tiling-slate

Turn Slate into a tiling window manager for OSX. 

## Setup

If you are already using Slate, just run the following commands in your terminal:

    git clone git@github.com:mythological/tiling-slate;
    ls -la ~/ | grep -q .slate.js && cp ~/.slate.js ~/.slate.js.orig
    ls -la ~/ | grep -1 .slate && cp ~/.slate ~/.slate.orig
    cp tiling-slate/slate.js ~/.slate.js
    rm -rf tiling-slate

Otherwise, just copy the following command into your terminal:

    git clone git@github.com:mythological/tiling-slate && cp tiling-slate/slate.js ~/.slate.js && rm -rf tiling-slate

At that point just open up your Slate menu as shown in the following screen shot

![screenshot](http://media.tumblr.com/3cc906ea4abbd9fbd0c9906cd084de36/tumblr_inline_mkhtg8PLKk1qz4rgp.png)

and then select "Relaunch" and load config.

