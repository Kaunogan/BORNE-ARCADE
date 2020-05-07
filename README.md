<p align="center">
  <a href="https://example.com/">
    <img src="https://pbs.twimg.com/profile_images/979714483387092994/PMI-aUXp_400x400.jpg" alt="Logo" width=85 height=85>
  </a>

  <h3 align="center">Ynov - Ydays - LEMOINE Kaunogan | GELIN Alexandre | GUMBAU Elric</h3>
</p>

## ADAPTIVE SOFTWARE | B3 Info

-   [About us](#About-us)
-   [About this project](#About-this-project)
-   [Prerequisites](#Prerequisites)
-   [What's included](#whats-included)
-   [Which language used](#Which-language-used)
-   [How it works](#How-it-works)
-   [How to install it](#how-to-install-it)
-   [What remains to be done](#what-remains-to-be-done)
-   [Docs](#Docs)

## About us

About us

### Kaunogan

-   kaunogan.lemoine@ynov.com (mail)
-   [Kaunogan](https://github.com/Kaunogan) (github)
-   [LEMOINE Kaunogan](https://fr.linkedin.com/in/kaunogan-lemoine-7869a6189) (linkedIn)

### alexandre

-   alexandre.gelin@ynov.com (mail)
-   [AexandreGelin](https://github.com/AexandreGelin) (github)
-   [GELIN Alexandre](https://fr.linkedin.com/in/alexandre-gelin-12265b171) (linkedIn)

### Elric

-   elric.gumbau@ynov.com (mail)
-   [GUMBAUElric](https://github.com/GUMBAUElric) (github)
-   [GUMBAU Elric](https://fr.linkedin.com/in/elric-gumbau-30943417a/) (linkedIn)

## About this project

This project implements a menu of an arcade machine as well as a payment site in order to make a donation to recover a code.
The payments will go to an association.

## Prerequisites

Here are the prerequisites necessary for this project

   |      Prerequisites     |  
   \| ---------------------- \|
   |        Node.js (last version)     |  
   |        Apache     |  
   |        Php     |   

    > Ask google how to install these tools if you don't have them 😉

## What's included

```text
arcade/
  └── menu/
  └── site/
  └── .gitignore
  └── README
```

## Which language used

-   Framework : <a href="https://electronjs.org">Electron</a>

     |     Languages     |  
     \| ----------------- \|
     |        HTML       |  
     |        CSS        |
     |        JS         |

## How it works

-   Menu

        It allows selection of games with the joystick of the borne.

        A button opens a window to add tokens on the borne.

        Each game has its own high score

        Press enter to play.
        Once the player loses, the game closes and he returns to the menu

        Every 30 seconds of inactivity an old video is launched explaining the operation of adding tokens

-   Site

        The site allows you to choose the amount of the donation

        You choose the payment method (Hipay,Lydia,...)

        It then returns a code to enter on the borne

## How to install it

### Menu

1 - Download the repo

2 - Open a terminal and type (if you are on linux don't forget sudo before the commands !)

    cd path/to/the/repo/menu

    npm install (it may take time, be patient 😉)

    npm start (this launches the program, it can also take time)

3 - If all went well, you arrive on the menu

    You select the games by moving with the arrow keys
    Press enter to play

4 - If you want to add tokens

    Press the F key and move with the arrows and enter to validate.

    Once the code has been entered, press OK to confirm.

    If the code is correct, the tokens are added to the menu otherwise you must retype it

5 - That's all ! 👍

### Site

In order to facilitate the development the site works on the client side thereafter it must be implemented on the server side

1 - Place the site folder on apache server with PHP

2 - Change paths to php files in assets / js / index.crypt.js

3 - Choose your amount

4 - Choose your payment method (for the moment it does not work, it must be implemented.) Click on 'suivant'

5 - Your code is generate ! You can enter it on the borne

### Raspberry

1 - Flash a os image on the Raspberry SD card

2 - Insert the SD card into the Raspberry and follow the instructions for installing the os

3 - Install git 4 Retrieve the menu on GitHub using the command: git clone <https://github.com/Kaunogan/BORNE-ARCADE.git>

5 - Install dependencies with the command: npm install

6 - Launch the menu with the command: npm start

### Create a script to launch the menu when the Raspberry starts

1 - Open a command terminal on the rasberry

2 - Go to the init.d folder: cd /etc/init.d

3: Create a new script file : sudo nano script.sh

4: Fill the script as follows:

\#! / bin / sh

cd / home / pie / Documents / BORNE-ARCADE / menu

npm start

Save with Ctrl + X then Y (or O if the terminal is in French)

5 - Change the permissions of the script.sh file to make it executable at startup:

sudo chmod + x script.sh

6 - Execute the command:

sudo update-rc.d script.sh defaults

7 - Restart the Raspberry:

sudo reboot

## What remains to be done

-   Implement payment system
-   Put the site on nodejs server

## Docs

Node.js             : <https://nodejs.org/en/>

ElectronJS               : <https://www.electronjs.org/>

Enjoy ! 😉
