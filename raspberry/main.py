#!/usr/bin/python3
# -*- coding:utf-8 -*-

import RPi.GPIO as GPIO                 #bibliothèque RPi.GPIO
import time                             #bibliothèque time
import requests 
API_ENDPOINT = "http://192.168.43.111:8080/pilulier"


GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BCM)

status = 0 
time_t = 0
begin_t = 0

pin_ledv = 5
pin_ledr = 13
pin_in = 6

GPIO.setup(pin_ledv, GPIO.OUT)
GPIO.setup(pin_ledr, GPIO.OUT)
GPIO.setup(pin_in, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
merlin = True
bool_requestr = False
bool_requestg = False
bool_requestb = False

def button_callback(channel):
    global status, merlin
    if (merlin==False):
        print("Button was pushed!")
        status+=1
        print(status)
        merlin=True


if __name__ == '__main__':
    print("Début du programme LED clignotante")

    GPIO.add_event_detect(pin_in,GPIO.RISING,callback=button_callback)

    GPIO.output(pin_ledv, GPIO.HIGH) 
    begin_t = time.time()     
    try:                         
        while True :     
            time_t = time.time()
            if GPIO.input(pin_in) == GPIO.LOW and merlin == True:
                merlin = False

            if status == 0:
                begin_t = time.time() 
                bool_request = False
                GPIO.output(pin_ledv, GPIO.LOW) 
                GPIO.output(pin_ledr, GPIO.LOW) 
                if bool_requestb == False:   
                    try:
                        r = requests.post(url = API_ENDPOINT, data = {'status':"blue"} ) 
                    except:
                        print("request failed")
                    bool_requestb = True
            elif status == 1 and (time_t - begin_t) > 5 and (time_t - begin_t) <= 10:
                GPIO.output(pin_ledv, GPIO.HIGH)
                GPIO.output(pin_ledr, GPIO.LOW) 
                if bool_requestg == False:   
                    try:
                        r = requests.post(url = API_ENDPOINT, data = {'status':"green"} ) 
                    except:
                        print("request failed")
                    bool_requestg = True
            elif status == 1 and (time_t - begin_t) > 10:
                GPIO.output(pin_ledv, GPIO.LOW)
                GPIO.output(pin_ledr, GPIO.HIGH)
                if bool_requestr == False:   
                    try:
                        r = requests.post(url = API_ENDPOINT, data = {'status':"red"} ) 
                    except:
                        print("request failed")
                    bool_requestr = True
            elif status == 2:
                GPIO.output(pin_ledv, GPIO.LOW)
                GPIO.output(pin_ledr, GPIO.LOW)  
                status = 0
                merlin = True                      
                 
    except KeyboardInterrupt:
        print('interrupted!')
        GPIO.cleanup() # Clean up             