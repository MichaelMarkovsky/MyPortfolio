---
title: Linux Environment Setup
description: My Arch Linux + Hyprland setup journey.
date: 2025-09-01
updatedDate: 2026-05-19
---

## The Migration From Windows
I was normalized and used to Microslop just working out of the box with a lot of ads, but since i got into the world of security i had to learn Linux hands on.

So instead of creating a virtual machine like a normal person, I nuked my system and replaced it with Arch Linux.

At first I used the `archinstall` script which does the automation for installing Arch Linux, with all of the steps and options organized and automated.

I chose `KDE Plasma` as the desktop environment. Since it was similar to Windows I had no issue operating it until it died (Who expected).

---

NVIDIA apparently dropped the support for old cards which included mine:
```
GPU: NVIDIA GeForce GTX 1060 6GB [Discrete]
```
https://www.techpowerup.com/339479/nvidia-to-end-geforce-regular-driver-support-for-maxwell-volta-and-pascal-gpus-in-q4

I thought I did something wrong because one system update got my screen resolution weird (NVIDIA), I nuked the system to then manually install Arch Linux.

I then had to the driver for my GPU in which 1 person updates!

I strongly recommend watching [Bread on Penguins](https://www.youtube.com/watch?v=5DHz23VQJxk), for general Linux content as well.

## Linux Customization
After having the fun part of my system dying, I chose once again to go to the deep end by having a window manager `hyprland` instead of what i was used to.

Since using `hyprland` , which focuses on minimalism and key shortcuts , I felt that anything that I did via my computer got way faster.

Having a window manager is great and then starts the fun part.
If we want to look at more information at all times (like a bar), there are plenty of options to choose from and customize greatly.

I chose `waybar` - https://github.com/alexays/waybar

### Waybar Customization
Since `waybar` is very simple and minimal in their approach , I chose them.
I have created a YouTube video from start to the end of the progression, explaining all the details: https://youtu.be/BGz4XBW0zeY?si=180AO67cqbaWU7Zm

I have also used `pywal` to generate a color pallet every time I change the wallpaper and then apply the colors to `waybar`.

Example:
```css
window#waybar .modules-right {
    background: alpha(@background, 0.75);
    padding: 0 10px;
    border-radius: 10px;
    border: 2px solid alpha(@color4, 0.7);
    color: @foreground;
}
```

#### Waybar Custom Scripts
Since I wanted to customize `waybar` to the fullest, I created 3 bash scripts which work together:
```
waybar/scripts/mpd-heart-toggle.sh
waybar/scripts/is_in_playlist.sh
waybar/scripts/mpd-waybar.sh
```

In essence, they are a music control center that is always in view (In `waybar`) as a custom module:
- Via mouse scrolls on the module I can go to the next or previous song.
- Via the heart module I can add or remove a song to a specific playlist.
All via interaction of  `mpd` (Music Player Daemon).

The project's GitHub: https://github.com/MichaelMarkovsky/waybar-mpd-module


### Shell Scripts
Since I started using Arch Linux, I wanted to keep my music local and independent from paid streaming services.

I also wanted to experiment and learn more about *Shell Scripts*  , so i have written a shell script that utilizes `yt-dlp` to efficiently download music from YouTube Music.

You can check it out in my GitHub: https://github.com/MichaelMarkovsky/getmusic

---

I also had to run a full stack project and written a shell script which runs a cool animation , does initialization and lunches kitty sessions (like `tmux`) with 4 windows, 2 tabs to have quick access to code, database view, docker compose view and server logs.

You can check it out in my GitHub: https://github.com/MichaelMarkovsky/workflow-example
I also created a YouTube video explaining the code: https://youtu.be/ZGD9FBcYSb0?si=VpiNm1QnV5CM_0QK

Its those little things which make Linux so powerful, to know your system and exactly what you do with it. - Total Control



### Dot files
A lot of your packages that you install have configurations which you could edit and style applications to your taste.

Usually its path is : `/home/{USERNAME}/.config`

After you have made your PC yours, you can save all of your dot files and reuse them in another computer easily.

For example I installed Arch Linux on my laptop, downloaded or copied some of the files, edited some of the configs so that I could see battery and so on , and that is it.

<video
  src="/media/blogs/linux-setup/waybar-config-demo-noaudio-compressed.mp4"
  autoplay
  loop
  muted
  playsinline
  style="width:100%; border-radius:6px; border:1px solid #27272a; margin:1.5rem 0;"
/>

My dotfiles: https://github.com/MichaelMarkovsky/my-dotfiles


## Conclusion
Having total control of my system is awesome and making it look and feel exactly as I want reminds me of drawing or building a house in Minecraft, I love it.

I will create later on more configs to addition and will share them to the community,once more.

I am proud to also flex and share:
```
                  -`                     dragon@nexus
                 .o+`                    ------------
                `ooo/                    OS: Arch Linux x86_64
               `+oooo:                   Host: Z170X-Gaming 3
              `+oooooo:                  Kernel: Linux 7.0.9-arch1-1
              -+oooooo+:                 Uptime: 3 hours, 29 mins
            `/:-:++oooo+:                Packages: 1240 (pacman)
           `/++++/+++++++:               Shell: bash 5.3.9
          `/++++++++++++++:              Display (2460G5): 1920x1080 in 24",60hz 
         `/+++ooooooooooooo/`            WM: Hyprland 0.55.2 (Wayland)
        ./ooosssso++osssssso+`           Cursor: Adwaita
       .oossssso-````/ossssss+`          Terminal: kitty 0.46.2
      -osssssso.      :ssssssso.         Terminal Font: MononokiNF-Regular (11pt)
     :osssssss/        osssso+++.        CPU:Intel(R)Core(TM)i7-6700(8)@ 4.00 GHz
    /ossssssss/        +ssssooo/-        GPU: NVIDIA GeForce GTX 1060 6GB 
  `/ossssso+/:-        -:/+osssso+-      Memory: 4.45 GiB / 15.56 GiB (29%)
 `+sso+:-`                 `.-/+oso:     Swap: 0 B / 24.00 GiB (0%)
`++:.                           `-/+/    Disk (/): 39.01 GiB/48.91GiB(80%)-ext4
.`                                 `/    Disk (/home):345.05GiB/841.01GiB(41%)ex4
                                         Local IP (enp9s0): 192.168.1.180/24
                                         Locale: en_US.UTF-8
```

```
Archlinux@dragon 7.0.9-arch1-1 has been installed for 4m 9d 10h 29m 33s.
```

Thanks for reading!