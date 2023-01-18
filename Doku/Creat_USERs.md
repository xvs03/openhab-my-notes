20.11.2022
# openHAB 3.X
## Karaf Console
## Create USERs to admin the UI Pages  

Info: In openHAB the administration of users in the Web UI is not possible or not yet possible. Therefore, this must be done in the Console.

The challenge:

Create a new user to make a layout page visible only for role users

1.	Login to the openhab Karaf Console via SSH

2. Example: List current Users

```Karaf
openhab> openhab:users list
name1 (user)
admin (administrator)
```

3. Example: List create User

```Karaf
openhab> openhab:users add name2 mypassword2 user
name2 (user)
User created.
```

4. Example: remove User

```Karaf
openhab> openhab:users remove name2
User removed.
```



