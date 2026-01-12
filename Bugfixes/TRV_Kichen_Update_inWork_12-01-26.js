// Ventilregelungsdurchlauf des BLU TRV Küche + Fensterkontaktverarbeitung | 30.11.24
// Senden nur bei Stellwertänderung | 28.10.25
// Zähler für Senden Stellwertänderung | 28.10.25
// Lokale Variable: >preStoreSetTrvPos< aus Case: Fenster "ZU" als globale Variable angelegt. Probleme mit storeing der 0% V-Öffnung bei Fenster auf | 17.1.25

// Item für Bugfix: ID: BLU_TRV_Vpos_mqtt | Name: Ventilstellung IST [%] | MQTT Subscribe


var Solltemp = 0; // Solltemperatur Wohnzimmer (parsen in Float)
var OffsetSolltempConst = 0.2; // Offset zur Solltemperatur um Regelsolltemperaturdurchnschnittswert an Sollwert anzunähern
var Isttemp = 0; // Isttemperatur Woohnzimmer (parsen in Float)
var DiffTemp = 0; // Differenz zwischen Soll-Ist Temperatur
var Grundwert = 0.5; // 100 % Wert der Differenz (Constante Float)
var VentiloeffnungInProzent = 0; // Prozentwert der Ventilöffnung 100 % = heizen ; 0 % = Heizung aus in Float
var VentiloeffnungInProzentInt = 0; // Geparster Wert in Int
var VentilSetCounter = cache.private.get('ventilSetCounter'); // Zähler zur Erfassung der Stellbefehle (Cache)
var preStoreSetTrvPos; // Storevariable alter Ventilstellwert int




// Meldung im Logbuch

console.log("BLU TRV | Ventilregelung getriggert");


// Schalterstellung auslesen


swState = items.getItem("IoT_IP50_Winstate").state; // ZU = false | AUF = true
//swState = items.getItem("FensterKontaktDummy").state;
console.log("Schalterstellung ist: " , swState); // ON=ZU oder OFF=AUF


// Entscheidung normaler Regelungsdurchlauf oder Fenster offen = Ventil 0%

// Case Fenster =ZU =false
if (swState == "false"){
    console.log("CASE: Fenster ZU erkannt!"); // Logbucheintrag
    // Daten zur Berechnung holen und in Form bringen (parsen in Int)

    Solltemp = parseFloat(items.getItem("KuecheSolltempBluTrv").state); // Solltemperatur Wohnzimmer holen
    console.log("Solltemperatur Küche >>> ", Solltemp ); // Logbucheintrag

    Isttemp = parseFloat(items.getItem("IoT_IP50_Temp").state); // Solltemperatur Wohnzimmer holen
    console.log("Isttemperatur Küche >>> ", Isttemp ); // Logbucheintrag


    // Berechnung der Differenz Soll-Ist Temperatur mit Solltemperaturoffset

    DiffTemp = (Solltemp + OffsetSolltempConst)  - Isttemp ; // Berechnung des Differenzwertes

    console.log("Difftemperatur mit Offsetwert Küche >>> ", DiffTemp ); // Logbucheintrag


    // Berechnung der Ventilöffnung in Prozent

    VentiloeffnungInProzent = ( DiffTemp * 100 ) / Grundwert ;

    console.log("Ventilöffnung nach Berechnung Küche >>> ", VentiloeffnungInProzent ); // Logbucheintrag


    // Wertaufbereitung parsen von Float zu Int

    VentiloeffnungInProzentInt = parseInt(VentiloeffnungInProzent)



    // Wertbegrenzung 0-100

    if (VentiloeffnungInProzentInt > 100){
        console.log("Ventilöffnung wird auf 100% begrenzt, weil errechneter Wert größer 100 nämlich >>> ", VentiloeffnungInProzentInt); // Logbucheintrag
        VentiloeffnungInProzentInt = 100;
    }

    if (VentiloeffnungInProzentInt < 0){
        console.log("Ventilöffnung wird auf 0% begrenzt, weil errechneter Wert kleiner 0 nämlich >>> ", VentiloeffnungInProzentInt); // Logbucheintrag
        VentiloeffnungInProzentInt = 0;
    }

    /*
    // Senden des Ventil % Wertes an TRV (sendCommand nicht postUpdate)

    items.getItem("BLU_TRV_Ventilstellung_SET").sendCommand(VentiloeffnungInProzentInt); // Poste die neue Ventilöffnungsvariable

    console.log("Ventilöffnung in % wird an das TRV gesendet >>> ", VentiloeffnungInProzentInt ); // Logbucheintrag
    */

    // MQTT
    // Item ID Ventil Set : "BLU_TRV_Ventilstellung_SET"

    //var setTrvPos = items.getItem("BLU_TRV_Ventilstellung_SET").state;
    //console.log("Hole Wert aus Item  >>> ++++++++++++++++++++++++++++++++++++++++++++   Ventilstellung SOLL", setTrvPos ); // Logbucheintrag

    // Wertaufbereitung parsen von Float zu Int

    // Variable Moven
    var setTrvPosInt = VentiloeffnungInProzentInt;
  
    // Holen der letzten Ventilöffnungsvariablen
    preStoreSetTrvPos = cache.private.get('StoreSetTrvPos');
    console.log('Vorherige Ventilstellung war: >>>', preStoreSetTrvPos);
  
  
    // Nur senden wenn alter und neuer Wert ungleich  
    if (preStoreSetTrvPos != setTrvPosInt){
      
      console.log("Vorheriger und aktueller Ventil Setwert unterscheiden sich, sende aktuellen Wert an TRV Küche: >>>", preStoreSetTrvPos);
  
      // Speichern der letzten Ventilöffnungsvariablen
      var storeSetTrvPos = setTrvPosInt;  // Neue Speichervariable
      cache.private.put('StoreSetTrvPos', storeSetTrvPos); // Wert speichern in Variablenstore
      console.log('StoreSetTrvPos', preStoreSetTrvPos);

      // var setTrvPosInt = parseInt(setTrvPos);

      console.log("Wert von Prozent in Number Int  >>>  Ventilstellung SOLL", setTrvPosInt ); // Logbucheintrag
  
      // Wert im Item Ventilposition SET publish updaten
      items.getItem("BLU_TRV_Ventilstellung_SET").postUpdate(setTrvPosInt); // Poste die von OH gesendete Ventilstellung an Item

      // var posi = 0; // Varaible für Ventilposition



      var JsonTrvObj = {
          id: 0,
          src: "Valve-SET",
          method: "BluTRV.Call",
          params: {
            id: 200,
            method: "TRV.SetPosition",
            params: {
              id: 0,
              pos: setTrvPosInt // Variable für Ventilposition
            }
          }
      };

      console.log("Inhalt von JsonTrvObj >>>", JsonTrvObj); // Ausgabe von JsonTrvObj




      var JsonTrvObjStringify = JSON.stringify(JsonTrvObj); // Umwandlung von JsonTrvObj in JsonTrvObjStringify 

      console.log("Inhalt von JsonTrvObj nach Stringify >>>", JsonTrvObjStringify); // Ausgabe von JsonTrvObjStringify


      // Senden von Variable JsonTrvObjStringify an TRV
      actions.get("mqtt", "mqtt:broker:MQTT_Broker").publishMQTT("shellyblugwg3-34cdb075c2a8/rpc", JsonTrvObjStringify );
      console.log("Inhalt von JsonTrvObj via MQTT gesendet >>>", JsonTrvObjStringify); // Ausgabe von JsonTrvObjStringify
      
      // Zähler für Stellbefehl senden (Cache)
      VentilSetCounter++;
      console.log("Rulezähler für Stellbefehl getriggert" + VentilSetCounter);
      items.getItem("VentilSetCounterEndless").postUpdate(VentilSetCounter); // Poste die von OH gesendete Ventilstellung an Item
      cache.private.put('ventilSetCounter', VentilSetCounter );


      /*
      // Kleines Päuschen
      console.log("STOPPE Rule für 6 Sekunden");
      java.lang.Thread.sleep(6000); // Bremse an            
      console.log("Arbeite Rule weiter ab");
      // Weiter gehts...
      */

      // Ventilstatus abfragen via Mqtt


      // TRV Status nach Ventilstellungsänderung

          JsonTrvObjStatus = {
          id: 0,
          src: "BLU-TRV-Status/Vpos",
          method: "BluTrv.call", // "BluTRV.Call"
          params: {
            id: 200,
            method: "Shelly.GetStatus",  // "TRV.GetStatus" 
            params: {
              id: 0
            }
          }
      };

      console.log("Inhalt von JsonTrvObj >>>", JsonTrvObjStatus); // Ausgabe von JsonTrvObj




      JsonTrvObjStringifyStatus = JSON.stringify(JsonTrvObjStatus); // Umwandlung von JsonTrvObj in JsonTrvObjStringify 

      console.log("Inhalt von JsonTrvObj nach Stringify >>>", JsonTrvObjStringifyStatus); // Ausgabe von JsonTrvObjStringify


      // Senden von Variable JsonTrvObjStringifyStatus an TRV
      actions.get("mqtt", "mqtt:broker:MQTT_Broker").publishMQTT("shellyblugwg3-34cdb075c2a8/rpc", JsonTrvObjStringifyStatus );
      console.log("Inhalt von JsonTrvObjStatus via MQTT gesendent >>>", JsonTrvObjStringifyStatus); // Ausgabe von JsonTrvObjStringify; 
    
      
    } // Stellwertvergleich
  
    console.log("Alter und neuer Ventilöffnungswert sind gleich. Keine Wertsendung an TRV !!!  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  
    // Case Fenster = OFFEN
} else {
    console.log("CASE: Fenster OFFEN erkannt"); // Logbucheintrag
    // Setze Ventil auf 0%
  
      var setTrvPosInt = 0;

    // var setTrvPosInt = parseInt(setTrvPos);

    console.log("Wert von Prozent in Number Int  >>>  Ventilstellung SOLL", setTrvPosInt ); // Logbucheintrag

    // var posi = 0; // Varaible für Ventilposition



    var JsonTrvObj = {
        id: 0,
        src: "Valve-SET",
        method: "BluTRV.Call",
        params: {
          id: 200,
          method: "TRV.SetPosition",
          params: {
            id: 0,
            pos: setTrvPosInt // Variable für Ventilposition
          }
        }
    };

    console.log("Inhalt von JsonTrvObj >>>", JsonTrvObj); // Ausgabe von JsonTrvObj




    var JsonTrvObjStringify = JSON.stringify(JsonTrvObj); // Umwandlung von JsonTrvObj in JsonTrvObjStringify 

    console.log("Inhalt von JsonTrvObj nach Stringify >>>", JsonTrvObjStringify); // Ausgabe von JsonTrvObjStringify


    // Senden von Variable JsonTrvObjStringify an TRV
    actions.get("mqtt", "mqtt:broker:MQTT_Broker").publishMQTT("shellyblugwg3-34cdb075c2a8/rpc", JsonTrvObjStringify );
    console.log("Inhalt von JsonTrvObj via MQTT gesendet >>>", JsonTrvObjStringify); // Ausgabe von JsonTrvObjStringify

    // Speichern der letzten Ventilöffnungsvariablen
    var storeSetTrvPos = setTrvPosInt;  // Neue Speichervariable
    cache.private.put('StoreSetTrvPos', storeSetTrvPos); // Wert speichern in Variablenstore
    console.log('Ventilwert in PreStore abgelegt!: >>>', preStoreSetTrvPos);
  
    // Zähler für Stellbefehl senden (Cache)
    VentilSetCounter++;
    console.log("Rulezähler für Stellbefehl getriggert" + VentilSetCounter);
    items.getItem("VentilSetCounterEndless").postUpdate(VentilSetCounter); // Poste die von OH gesendete Ventilstellung an Item
    cache.private.put('ventilSetCounter', VentilSetCounter );
  
    // Wert im Item Ventilposition SET publish updaten
    items.getItem("BLU_TRV_Ventilstellung_SET").postUpdate(setTrvPosInt); // Poste die von OH gesendete Ventilstellung an Item


    /*
    // Kleines Päuschen
    console.log("STOPPE Rule für 6 Sekunden");
    java.lang.Thread.sleep(6000); // Bremse an            
    console.log("Arbeite Rule weiter ab");
    // Weiter gehts...
    */

    // Ventilstatus abfragen via Mqtt


    // TRV Status nach Ventilstellungsänderung

        JsonTrvObjStatus = {
        id: 0,
        src: "BLU-TRV-Status/Vpos",
        method: "BluTrv.call", // "BluTRV.Call"
        params: {
          id: 200,
          method: "Shelly.GetStatus",  // "TRV.GetStatus" 
          params: {
            id: 0
          }
        }
    };

    console.log("Inhalt von JsonTrvObj >>>", JsonTrvObjStatus); // Ausgabe von JsonTrvObj




    JsonTrvObjStringifyStatus = JSON.stringify(JsonTrvObjStatus); // Umwandlung von JsonTrvObj in JsonTrvObjStringify 

    console.log("Inhalt von JsonTrvObj nach Stringify >>>", JsonTrvObjStringifyStatus); // Ausgabe von JsonTrvObjStringify


    // Senden von Variable JsonTrvObjStringifyStatus an TRV
    actions.get("mqtt", "mqtt:broker:MQTT_Broker").publishMQTT("shellyblugwg3-34cdb075c2a8/rpc", JsonTrvObjStringifyStatus );
    console.log("Inhalt von JsonTrvObjStatus via MQTT gesendent >>>", JsonTrvObjStringifyStatus); // Ausgabe von JsonTrvObjStringify;
}