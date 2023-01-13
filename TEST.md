20.11.2022
# openHAB 3.X
## Zeitstempel mit ECMAScript 262 Edition 11

1.	Einen -Java Time- Zeitstempel mit Methode now() in ein openHAB DateTime Item schreiben

Codebeispiel:

`var triggeringItem = items.getItem("Datum_als_DateTime_aus_now"); // DateTime Item (Ziel)`

`var ZDT = time.ZonedDateTime.now().plusDays(30);  // Java Time (optional mit Offset)`


`triggeringItem.sendCommand(ZDT.toLocalDateTime().toString()); // DateTime Item mit richtigem Stringformat updaten`

Infos zum Time Offset:

https://community.openhab.org/t/convert-zonedatetime-to-datetime/138560
