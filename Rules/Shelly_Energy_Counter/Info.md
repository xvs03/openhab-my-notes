# Shelly Energy Counter non-volatile in OpenHAB V4.2.X
#### Das Shellybinding bietet bei den neuen Shelly Plug plus einen Channel Namens "Gesamtverbrauch" an. Dieser Wert ist aber flüchig d.h., wenn man den Shelly stromlos macht und wieder anschließt wird der Wert auf 0 gesetzt. Wie bekomme ich einen Endloszähler für diesen Shelly ins OpenHAB.
#### Ich habe die Rule Shelly_Energy_Counter.js als EMCA Script Edition 11 programmiert, damit ihr einen Energiezähler habt, der sich bei Shellyreset nicht zurücksetzt und immer weiterzählt.
#### Ihr müsst euch 3 Items erstellen.

#### Alle werden als Number Energy [kWh] konfiguriert und die Dimension auf 1000stel als State Descrition %.3f %unit%
1.  Ein Item was den flüchtigen Zählerstand abbildet also mit dem Channel verlinkt
2.  Ein Item was ihr als Hilfs oder Cache Item verwendet (speichert für die Zeit des Ruledurchlaufs den alten Wert)
3.  Ein Item was als Endloszähler dient.

#### Ihr müsst im Code nur eure Items IDs eintragen
[Link zu Shelly_Energy_Count.js](https://github.com/xvs03/openhab-my-notes/blob/d0668de90db670eca377cedf29200aa70c0964c1/Rules/Shelly_Energy_Counter/Shelly_Engergy_Count.js)
