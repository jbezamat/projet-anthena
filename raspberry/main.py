#!/usr/bin/python3
# -*- coding:utf-8 -*-

import RPi.GPIO as GPIO                 #bibliothèque RPi.GPIO
import time                             #bibliothèque time

GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BCM)

pin_led = 21

GPIO.setup(pin_led, GPIO.OUT)
GPIO.setup(6, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

if __name__ == '__main__':
    print("Début du programme LED clignotante")

    GPIO.output(pin_led, GPIO.HIGH)                               
    while True :     
        if GPIO.input(10) == GPIO.HIGH:
            print("Button was pushed!")                                      
            GPIO.output(pin_led, GPIO.LOW)                   