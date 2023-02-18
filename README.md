#Chrome mute/unmute performance bug demo
To test locally, you'll need:
- Chrome
- Have Node.js installed ;grab here: https://nodejs.org/en/ 
- have npm in $PATH; How to: https://stackoverflow.com/a/55449052
    - verify it works by running `npm --version` in terminal

how to test:
1. Download this repo to a folder
2. Open terminal in this folder, type `npm run serve`
3. Go to http://localhost:3000 on your Chrome browser
4. click start button, observe

expected behavior:
> the audio visualizer would perform the same, regardless if the tab is muted or unmuted

Observed behavior:
> The audio visualizers performance tanks if the audio is playing. When the website
> gets muted, the performance ofthe visualiser picks up drastically, can be repeated.