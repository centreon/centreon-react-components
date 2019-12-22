
#!/bin/bash
# from https://chromium.woolyss.com/
# and https://gist.github.com/addyosmani/5336747
# and https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:canonical-chromium-builds/stage
sudo apt-get update
sudo apt-get install chromium-browser 