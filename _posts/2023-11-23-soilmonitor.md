---
layout: post
title: Soil Monitor 
description: Arduino based automated soil monitor 
image: soil_monitor/arduino.jpg 
header-image: monstera.jpg 
---
## What exactly is the "soil monitor"?

The plant monitor is a culmination of curiosity and being too stubborn 
to give up. I wrote all the code for both the arduino and the site 
backend. It went through a few iterations of design, but the current design 
is pretty stable. The setup is an ESP32 base station coded to receive the 
data from the arduino plant monitors via an nRF24 radio. The moisture data is 
collected by the arduino using a capacitive moisture sensor. 

I'm already working on how to fully automate the system so that the plants water 
themselves, but I'm not quite there yet. Currently, I am more focused on 
learning how to design custom PCBs in order to get all the components onto one 
circuit board, removing the need for so many wires and soldering. 

As of now, the monitor gets about 2 1/2 months of battery life off two 2800maH
Li-ion cells. I'd like to explore using only one cell and incorporating solar
charging as well, but I need some time to source the components.

<div class="image center" style="text-align:center;">
    <img src="/assets/images/soil_monitor/arduino.jpg" width="70%" style="transform:rotate(270deg); " alt="" />
</div>

# Update 6/2/2024:

After some research, I decided to order some RT9167 3.3v regulators as they
looked like they would be pretty efficient and would be a direct drop-in
replacement for the original regulator on the 3.3 Pro Mini. With the addition
of this regulator, I was able to swap over to using a single 21700 cell and 3d
printed an enclosure for it. I have yet to run a full battery out, but so far
it looks to be working well!

<div class="image center" style="text-align:center;">
    <img src="/assets/images/soil_monitor/arduino_v2_1.jpg" width="70%" style="transform:rotate(270deg); " alt="" />
    <img src="/assets/images/soil_monitor/arduino_v2_2.jpg" width="70%" style="transform:rotate(270deg); " alt="" />
</div>
_______________________________________________________________________________

<div markdown="1" style="text-align: center;">
See the soil monitor in action **[here](/soilmonitor.html)**  
or check out the source code **[on github](https://github.com/zuidec/soil_monitor)**
</div>
