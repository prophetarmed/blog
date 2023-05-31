---
layout: post.njk
title: Newsboat + Readability + Lynx = The Perfect TUI Feed Reader
tags: ["post", "computers"]
---

To anyone who doesn't know, an RSS feed is pretty much a standardised format in which content on a website can be delivered to an RSS reader, collating all of the sites that a user is interested in into one place. Most websites made with well-established CMSes such as Wordpress or websites that were initially made before roughly 2015 have RSS feed capabilities. However, the content delivered by these RSS feeds can mixed. Some sites give the whole article as part of the RSS content, however some such as BBC News usually just have the first sentence. So, chances are you'll be spending a lot of time in the browser if you use an RSS reader. This point is crucial as I'm moving as much of my computing life over to the terminal as I possibly can, mainly to make my digital life more intentional and a proper RSS feed reader setup will allow me to get information I want without doomscrolling transphobic nonsense on Twitter.

My RSS reader of choice is [newsboat](https://github.com/newsboat/newsboat). The configuration is simple, the feeds are defined in a simple text file that I can push as part of my system config to GitHub and it looks great. You can also easily define a custom browser with an extremely flexible format, which is key to the next two parts in the chain.

TUI-based browsers have been around pretty much since the inception of the internet, with Lynx being the oldest web browser that is actively maintained. Its CSS capabilities are limited, but if you give it a fairly simple website then it actually looks pretty great - it just presents you with the information, no distractions. But most of the sites I want information from *do* have pretty complex DOMs that look awful on Lynx, so we need to somehow get a more simplistic version of each website I want to visit.

Anyone who has used Firefox in the past few years will likely know about its 'Reader Mode'. Safari I believe has something similar, but ultimately it's a button which presents to you a webpage with all of the BS removed - it gives you a title, the authors and other important information and then the actual content. What you might not know is that Firefox's implementation of this, Readability, is a fully free-standing NPM module that you can integrate into any JS application. This resulted in the creation of readability-cli - a command-line tool that takes in a web address and spits out the simple Readability DOM in stdout. Unforunately, in order to run the `readable.ts` file you have to be in the directory in which you cloned readability-cli, meaning I had to make this very simple shell script which changes directory and then passes the URL: 
```
#!/bin/bash
cd ~/.src/readability-cli
./readable.ts -q "$1"
cd - > /dev/null
```

And now if I run `./readable` in my terminal with a URL, I get its simple DOM in my terminal! This means I can do a test run with a Guardian article and pipe it into Lynx and see how it looks.

```
readable https://www.theguardian.com/commentisfree/2023/may/30/tories-disabled-people-benefits | lynx --stdin
```

And bleak content aside, it looks great!

Now, we can easily link newsboat with this simple setup with the config `browser "readable %u | lynx -stdin"`, and it all works perfectly!

And now we have a way of keeping up to date with Twitter accounts and news sources entirely with a TUI interface! An example of this workflow can be seen in this YouTube video: https://www.youtube.com/watch?v=zSfVD8hJSGA
