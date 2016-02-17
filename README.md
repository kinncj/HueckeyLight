## Philips Hue Goal Light

Use at your own risk.

#### Requirements
 - NodeJS 5
 - mplayer
 - Hue (may change in the future, keep reading the README)

#### Installation


```
bash$: git clone https://github.com/kinncj/HueckeyLight.git
bash$: cd HueckeyLight
bash$: npm install
bash$: apt-get install mplayer (or brew install mplayer, or whatever you use to install mplayer)
```

Run to your Hue Bridge, click on the Link button (the gigantic button), and:

```
bash$: node src/index.js
```

Now, answer all the questions as fast as The Flash.


#### Issues

There's a known issue when you run it for the first time:
 - It may crash the first time when creating config files... ok, just run node src/index.js again... or fix it and send a pr.


#### Future features (Feel free to send PRs)

 - Make it even more configurable...
   - Add a `silent` flag, so we don't play the music (easy one, feel free to send a PR)
   - Decouple so it can work for those who have Hue or not (eg: play sound only).
     - Add middlewares... eg: When score, the app can sends an email (or whatever you desire, like: fetch an API to poke your cat).


#### LICENSE

The MIT License (MIT)
Copyright (c) 2016 Kinn Coelho Juliao

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
