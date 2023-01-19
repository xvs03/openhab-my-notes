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

3. Example: create User

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

5. Example: Add User with specific "role"

```karaf 
openhab> openhab:users add
Usage: openhab:users add <userId> <password> <role> - adds a new user with the specified role
```

6. Display all commands for user administration

```karaf
openhab> openhab:users help
```


## Advanced configuration of the website visible only to diverse users

1. Open the page that should be visible only for various users
   
2. Then go to the tab "Code" and search
   

**Here you can enter your previously created "roles"**: 
```YAML
config:
...
  visibleTo:
    - role:administrator
    - role:user
    - role:dog_or_cat
```




Info Source:

https://community.openhab.org

