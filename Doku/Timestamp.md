20.11.2022
# openHAB 3.X
## Rules
## Timestamp with ECMAScript 262 Edition 11  

The challenge:

How to write date and time in readable format for DateTime item. Optionally with time offset

1.	Writing a -Java Time- timestamp with method now() into an openHAB DateTime item

Example:

```JavaScript
var VarName_1 = items.getItem("ItemName_1"); // DateTime Item (Target)

var ZDT = time.ZonedDateTime.now().plusDays(30);  // Java Time (optional with Offset)


VarName_1.sendCommand(ZDT.toLocalDateTime().toString()); // DateTime Item with right Stringformat updaten
```

Info Source:

https://community.openhab.org/t/convert-zonedatetime-to-datetime/138560
