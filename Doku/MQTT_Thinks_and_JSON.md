# MQTT Things, Channels and JSON use

## Create MQTT Thing and associated Channel

*(Prerequisites: MQTT Binding and MQTT Server are set up)*

1. Go to Things and click ![click](https://github.com/xvs03/openhab-my-notes/blob/main/images/plusbutton.png)

2. Click "MQTT Binding" and then ![generic](https://github.com/xvs03/openhab-my-notes/blob/main/images/generic_MQTT_Think.png)

3. Enter label name, unique ID, location (optional)

4. Select Bridge ![broker](https://github.com/xvs03/openhab-my-notes/blob/main/images/MQTT_Broker.png)

5. Klick: ![create](https://github.com/xvs03/openhab-my-notes/blob/main/images/create_think.png)

6. Thing then appears in the thinglist

7. Select created Thing, select Channels tab

8. Click add Channel

9. Label channel identifier

10. Select Channeltype (example: Number Value for Temperature)

11. Then the Configuration menu opens. ( click "Show advanced")

12. In **"MQTT State Topic"** now enter the topic, which sends the e.g. temperature, simply copy it from the **MQTT Explorer** *(is a little Tool to show MQTT Topics)* and enter
    it.

13. In **"State Transformation"** now enter the JSON State Path

14. For example Garagedoor status: Shelly switch http request >  http://IP_Adress_Shelly/status
    
    ```JSON
    {"wifi_sta":{"connected":true,"ssid":"RouterName","ip":"XXX.XXX.XXX.XX","rssi":-83},"cloud":{"enabled":true,"connected":true},"mqtt":{"connected":false},"time":"18:00","unixtime":1673545793,"serial":358,"has_update":true,"mac":"XXXXXXXXXX","cfg_changed_cnt":0,"actions_stats":{"skipped":0},"ext_switch":{"0":{"input":1}},"relays":[{"ison":false,"has_timer":false,"timer_started":0,"timer_duration":0,"timer_remaining":0,"source":"timer"}],"meters":[{"power":0.00,"is_valid":true}],"inputs":[{"input":0,"event":"","event_cnt":0}],"ext_sensors":{},"ext_temperature":{},"ext_humidity":{},"update":{"status":"pending","has_update":true,"new_version":"20221027-091427/v1.12.1-ga9117d3","old_version":"20220209-092750/v1.11.8-g8c7bb8d"},"ram_total":50864,"ram_free":38112,"fs_size":233681,"fs_free":150851,"uptime":5275505}
    ```
15. Then Extract **.ext_switch":{"0":{"input":1}}** from JSON requst

16. Write in  **"State Transformation"** > ```JSONPATH:$.ext_switch.0.input``` for ext switch state

17. Then click "create"

18. The new channel will be added to the Things channel list.

19. Now link the channel to a previously created item from the  OH model and you're done.