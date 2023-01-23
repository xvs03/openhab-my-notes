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

11. Then the Configuration menu opens. ("Show advanced" is not required)

12. In **"MQTT State Topic"** now enter the topic, which sends the e.g. temperature, simply copy it from the **MQTT Explorer** *(is a little Tool to show MQTT Topics)* and enter it.

13. Then click "create"

14. The new channel will be added to the Things channel list.

15. Now link the channel to a previously created item from the  OH model and you're done.