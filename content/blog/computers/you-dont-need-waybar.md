---
layout: post.njk
title: You Don't Need Waybar
tags: ["post", "computers"]
---

## Introduction

Perhaps the most powerful thing about choosing Free and Open Source Software to be your hobby/obsession/ocassional social life killer is that you get an awful lot of power and choice over how you use your computer. You can install the latest Ubuntu and get a great out of the box experience, or you can install Arch, Void or any number of enthusiast distributions and build your own dream system from the ground up.

I've been an Arch Linux fan for roughly 6 years by this point, and have been constantly in search of my "end game" configuration ever since. I adore the experience of XFCE and MATE, but they aren't on Wayland (yet!); KDE is fantastic but I find Breeze a bit too flat; GNOME is great but its reliance on JavaScript extensions which can break through upgrades & many features being hidden behind manual gsettings commands is perhaps the worst piece of UX I've ever experienced, and so we're left with tiling WMs. Well, I could choose a stacking WM but I'm not a thicko.

The first thing you do when you get into the tiling WM scene is that you end up taking inspiration from areas of the internet such as r/unixporn. Aside from being an awful tarnish on your work laptop's internet history, it's a great resource to get inspiration towards that "end game" configuration with great tips on terminal colour schemes and software recommendations. However, it's easy to get into the cycle of installing extra software to do a particular task rather than asking the software you already have if it's capable. I believe the worst offender of this that people often just accept are the tiling WM panel applications such as Polybar and its Wayland equivalent Waybar.

This is not shade towards those projects. They are fantastic, well maintained and offer insane amounts of customisation and features. But you don't need them. If you're boring like me and actually quite like how sway or i3 look out of the box, it's actually possible (and fairly easy) to script exactly the features you want into i3 or sway's status bar.

## How to script your own bar status

This will be very sway focused, as I haven't used i3 for a good 3 years or so. In your sway config, there is already a hint at the power of shell scripting to make your own bar status with the line `status_command while date +'%Y-%m-%d %I:%M:%S %p'; do sleep 1; done`. This shows us that all sway wants in `status_command` is something that outputs to stdout. So, if you make a shell script file and tell it to `echo "Hello"`, replace the status command with `status_command while ~/script.sh; do sleep 1; done` and reload sway, we see "Hello" in the top right instead of the standard date... This is the basis of this whole post. Once a second, sway will run that script and you can put anything you want in it.

In the interest of making sure this post is a promotion of 'tinkering', I'm not going to explain one by one exactly how my [current setup](https://github.com/inalone/dotfiles/blob/c24274f37ee952e198c373d88f269ef03208bde1/.config/sway/status_command.sh) came together, but as an example I will explain how to add a battery indicator instead of just text saying "Hello". I've often seen people online hugely overengineer this, including myself for a while. One such way is to use `upower`, a simple command line utility to display a ton of information about your laptop battery. It's a great piece of software, but I think using it for this purpose alongside some clever `grep` commands is utterly overkill when /sys/class exists.

You may have heard that in UNIX, everything is a file. For a lot of end-users, the true power of this doesn't really pop up often, but in situations like this it's ideal. Instead of asking upower to display every piece of information about the battery and then extract the desired information, Linux directly exposes files for the battery capacity and the status (charging or discharging) in `/sys/class/power_supply/BAT0/capacity` and `/sys/class/power_supply/BAT0/status`. The exact location may vary based on machine, but both of these files contain the exact information we need in plaintext. So in a simple setup, in the previously created script.sh file, we can add the following lines to make a status command to display the battery status.

```
battery_charge=$(cat /sys/class/power_supply/BAT0/capacity)
battery_status=$(cat /sys/class/power_supply/BAT0/status)
echo "$battery_charge% ($battery_status)"
```

And now in our status bar, we'll see something along the lines of "90% (Discharging)". The true power of using shell scripting in this way isn't just with cat calls (the non-sexist kind) however. You can get really fancy, such as displaying certain emoji when the battery is charging vs when it's discharging, or displaying what audio device is currently being used. You can even fetch the weather or use any other API if you want, which is why I find this topic so fascinating - instead of being at the behest of whatever modules Polybar or Waybar supply you, you can script your own functionality and get your computer to display to you exactly what you want.

## Conclusion

I may not stick with sway forever (in fact, I have a laptop arriving next week and the new Plasma looks very nice...), but the lessons that tiling WMs teach you stick with you wherever you end up on the Linux journey. You can clone a dotfiles repo, install some dependencies and call it a day, or you can create your own desktop experience from the ground up, learning about Polkit, GTK/QT theme configurations, shell scripting and whatever else you want your computer to do.
