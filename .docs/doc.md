![Powder-Icon](./img/powder-icon-s.png)

# Dokumentation: Powder

FS 2024, Fortgeschrittene Web Technologien, Fabian Diemand <br>
Dozent: Christian Klauenbösch <br>
Repository: [Powder GitLab Repository](https://git.ffhs.ch/web-technologien/fwebt/fs24/infp-w-af004-fwebt_pibs-be-1-pva/studs/fwebt-fs24-powder)
--- 
## Inhalt
<!-- TOC -->
* [Dokumentation: Powder](#dokumentation-powder)
  * [Inhalt](#inhalt)
  * [1 Projektidee und Geschäftsregeln](#1-projektidee-und-geschäftsregeln)
    * [1.1 Kontext des Projekts](#11-kontext-des-projekts)
    * [1.2 Projektidee](#12-projektidee)
    * [1.3 Erklärung des Spiels](#13-erklärung-des-spiels)
    * [1.4 Abgrenzungen](#14-abgrenzungen)
  * [2 Technologie Stack](#2-technologie-stack)
    * [2.1 React + Typescript](#21-react--typescript)
    * [2.2 Node Package Manager (npm)](#22-node-package-manager-npm)
    * [2.3 Tailwind + DaisyUI](#23-tailwind--daisyui)
    * [2.4 MongoDB](#24-mongodb)
    * [2.5 Socket.io](#25-socketio)
    * [2.6 Docker](#26-docker)
    * [2.7 GitLab](#27-gitlab)
<!-- TOC -->

---

## 1 Projektidee und Geschäftsregeln

### 1.1 Kontext des Projekts
Das Projekt wird im Rahmen einer Semesterarbeit für das Modul "Fortgeschrittene Web Technologien" umgesetzt. 
Das Modul ist Bestandteil des praxisintegrierten Bachelorstudiums (PiBS) Informatik 
an der Fernfachhochschule Schweiz (FFHS) und wird doziert durch Christian Klauenbösch. 

### 1.2 Projektidee
Powder ist ein Spiel, das im Grundsatz Tetris ähnelt. 
Originale Tetris Blöcke (Tetrominos) wären für eine Semesterarbeit zu teuer gewesen. 
Daher wird auf die billige Import-Variante (Powdrominos) ausgewichen. 
Powdrominos zerfallen zwar beim Aufprall, aber was soll's...

Neben der Spiellogik werden ein Scoreboard und ein Lobby-Chat implementiert. 
Voraussetzung für das Scoreboard ist die Persistierung von Spielständen mit den zugehörigen Spielernamen. 
Auch die Chat-Nachrichten werden persistiert, damit die Historie nachvollziehbar ist.

Als Erweiterungen des Projekts wären lokale oder gar remote Multiplayer-Modi denkbar.
Beim lokalen Multiplayer würden beide Spieler am gleichen Gerät spielen. 
Beim remoten würden die Spieler an unterschiedlichen Geräten spielen und die Zustände der Spielfelder würden über Websockets synchronisiert.

### 1.3 Erklärung des Spiels
Grundlegend sind die Spielregeln von Tetris.
Von Tetris übernommen werden ausserdem die Blockformen und Blockfarben.

<img src="./img/color-blocks.png" alt="Powdromino Farben" width="50%"/>
<img src="./img/powdrominos.png" alt="Powdromino Formen" width="50%"/>


Powdrominos sind **nicht** entsprechend ihrer Form gefärbt. Jede Form kann jede Farbe haben.

<img src="./img/different-color-powdrominos.png" alt="Powdromino verschiedene Farben" width="50%"/>


Die Blöcke, aus denen Powdrominos gebaut sind bestehen aus Substrukturen, die 10x kleiner sind, als die Blöcke selbst.
Beim Aufprall auf den Boden des Spielfelds oder auf andere Blöcke, zerfallen sie in diese Substrukturen.
Die Substrukturen haben eine eigene Physik bzw. Schwerkraft und bilden in der Folge Haufen.

<img src="./img/powdromino-desintegration.png" alt="Zerfall von Powdrominos" width="50%"/>

Das Ziel des Spiels ist weiterhin, eine Reihe von Elementen vom linken zum rechten Spielfeldrand zu bilden.
Da die Powdrominos jedoch beim Aufprall zerfallen, spielt es keine Rolle, ob die verbindende Reihe von Elementen horizontal ist, oder nicht.
Wichtig ist lediglich, dass vom linken zum rechten Spielfeldrand eine durchgehende Verbindung mit Elementen der gleichen Farbe entsteht.
Ist diese Voraussetzung erfüllt, werden sämtliche Blöcke dieser Farbe, welche zum verbindenden Komplex gehören, entfernt.
Die Punktvergabe erfolgt aufgrund der sich im entfernten Komplex befindlichen Substrukturen, welche jeweils einen Punkt geben. 

Ferner gibt es einen Punktmultiplikator, entsprechend der Anzahl entfernter Substrukturen:
- Faktor 1.5: Wenn Substrukturen für zwei komplette Reihen entfernt werden (Spielfeldbreite x 10 x 2)
- Faktor 2.5: Wenn Substrukturen für drei komplette Reihen entfernt werden (Spielfeldbreite x 10 x 3)
- Faktor 4: Wenn Substrukturen für vier komplette Reihen entfernt werden (Spielfeldbreite x 10 x 4)

Damit wird die beim regulären Tetris ein höheres Risiko beim Stapeln der Elemente belohnt.


### 1.4 Abgrenzungen
Die Architekturvorgabe für die Semesterarbeit ist, dass die hauptsächliche Spiellogik clientseitig (heisst im Browser) stattfinden muss.
Das minimale Backend, welches dennoch implementiert wird, dient lediglich als Schnittstelle zur Persistierungsschicht und als zentrale Stelle für die
Kommunikation über die Websockets.

Da auch die Zustandsverwaltung somit im Browser stattfindet, sind sämtliche Massnahmen zur Sicherstellung der Integrität der Spielzustände (Unterbinden von Manipulationen der Spiellogik innerhalb der Session) hinfällig.

## 2 Technologie Stack

### 2.1 React + Typescript
[ReactJS](https://reactjs.org/) ist eine Bibliothek zur Erstellung von webbasierten UIs. Ein spezielles Merkmal der Library ist die komponentenbasierte Herangehensweise an
die Erstellung einer grafischen Benutzeroberfläche. So können repetitive Muster sehr effizient und effektiv umgesetzt und gewartet werden.
Für das Projekt wird React 18 verwendet.

### 2.2 Node Package Manager (npm)
Der [Node Package Manager (npm)](https://docs.npmjs.com/about-npm) wird für das Dependency Management eingesetzt. 
NPM bietet zum einen die CLI, welche die Interaktion mit npm erlaubt, zum anderen die Registry, welche die entsprechenden Packages beinhaltet.
Für das Projekt wird npm Version 10.4.0 eingesetzt.

### 2.3 Tailwind + DaisyUI
[Tailwind](https://tailwindcss.com/) und [DaisyUI](https://daisyui.com/) werden für das Styling des Spiels eingesetzt. Tailwind erlaubt das Styling ohne viel CSS und direkt durch HTML-Klassen bzw. JSX-Klassennamen.
Damit und mit einer bedachten Komponenten-Aufteilung des GUI können schnell optisch ansprechende Resultate erzielt werden.
Gleichzeitig bietet Tailwind dem Entwickler viele Möglichkeiten, eigene Styles mit CSS zu implementieren oder mit der Konfiguration das Verhalten von Tailwind zu beeinflussen.
Tailwind wird in der Version 3.4.1 verwendet.

DaisyUI integriert mit Tailwind und bietet vorgefertigte Komponenten für Standard-Elemente von GUIs an. Dadurch kann die Optik des Spiels mit überschaubarem Aufwand merklich aufgewertet werden.
Für DaisyUI kommt die Version 4.6.2 eingesetzt.


### 2.4 MongoDB
Die Persistenz im Projekt wird mit [MongoDB](https://www.mongodb.com/) umgesetzt. MongoDB ist eine NoSQL Dokumentdatenbank, die sehr oft für Web Development verwendet wird.
Datensätze werden als Dokumente (in unserem Fall in JSON) abgelegt. Sammlungen von Dokumenten werden Collections genannt (z.B. Score-Collection, mit einzelnen Spielstand-Documents, oder Chat-Collection mit Chat-Documents).
Aufgrund der hohen Flexibilität, Skalierbarkeit und Einfachheit in der Anwendung wird für das Projekt eine NoSQL Datenbank verwendet.

Da MongoDB mit [Mongo Atlas](https://www.mongodb.com/atlas/database) kostenfrei (begrenzt) eine Cloud-Datenbank zur Verfügung stellt
und der Autor bereits Erfahrung mit deren Verwendung hat, fällt die Wahl auf das Produkt für die finale Abgabe.

Während der Entwicklung wird ein Mongo-Container in Docker verwendet.

### 2.5 Socket.io
Für die Echtzeitkommunikation zwischen Server(n) und Webclients kommt [Socket.io](https://socket.io/) zum Einsatz. Socket.IO nutzt das [WebSocket Protokoll](https://en.wikipedia.org/wiki/WebSocket), um eine bidirektionale, nahezu verzögerungsfreie Verbindung
zwischen Server und Client aufzubauen. Zusätzliche Funktionalitäten wie HTTP long-polling (Server schickt Response erst, wenn Daten vorhanden sind) als Fallback zur regulären WebSocket-Verbindung, automatisches Wiederherstellen der Verbindung nach Unterbrüchen, Pufferung von
Datenpaketen und der Möglichkeit, Acknowledgments zu senden, eignet sich Socket.io bestens zur Verwendung im Projekt für die Chatfunktion und später eventuell für den remote Multiplayer.

Im Projekt wird die aktuellste Version von Socket.io gemäss [npmjs.com](https://www.npmjs.com/package/socket.io) verwendet (z.Z. 4.7.4)

### 2.6 Docker
[Docker](https://www.docker.com/) wird während der Entwicklung für Dev Containers eingesetzt, damit keine Dependencies und Services lokal installiert werden müssen.

Weiter erfolgt die Abgabe, sowohl des Backends als auch des Frontends, um die Installation zu vereinfachen und den Aufwand auf das clonen des Repositories und wenige Commands zu reduzieren.

### 2.7 GitLab
Für die Source-Code-Verwaltung und die Versionierung wird GitLab verwendet. Innerhalb von Gitlab werden insbesondere Issues verwendet,
um User Stories und Tasks zu erfassen. Zu Planungszwecken wird ausserdem ein Board mit den Phasen "Backlog", "Sprint Backlog", "Development",
"Verification" und "Done" erstellt. Die Branch-Strategie folgt grundsätzlich den Empfehlungen des Git-flow-Workflow.

## 3 Anforderungen

### 3.1 MUSS-Anforderungen

#### 3.1.1 Spieler-Name

#### 3.1.2 Spiel-Start

#### 3.1.3 Spiel-Pause

#### 3.1.4 Spiel-Ende

#### 3.1.5 Powdromino bewegen

#### 3.1.6 Powdromino drehen

#### 3.1.7 Powdromino beschleunigen

#### 3.1.8 Powdromino Zerfall

#### 3.1.9 Schwierigkeitsgrade

#### 3.1.10 Reihe entfernen

#### 3.1.11 Niederlage

#### 3.1.12 Score zählen einfach

#### 3.1.13 Score zählen mit Multiplikator

#### 3.1.14 Scoreboard

### 3.2 KANN-Anforderungen

#### 3.2.1 Lokaler Multiplayer-Modus

#### 3.2.2 Lobby-Chat

#### 3.2.3 Remote Multiplayer-Modus

### Template FA

<table>
  <tr>
    <th>ID</th>
    <td></td>
  </tr>
  <tr>
    <th>Name</th>
    <td></td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td></td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td></td>
  </tr>
  <tr>
    <th>Ereignis</th>
    <td></td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td></td>
  </tr>
  <tr>
    <th>Standardablauf</th>
    <td>
    </td>
  </tr>
  <tr>
    <th>Alternativablauf</th>
    <td>
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Erfolg</th>
      <td>
      </td>
  </tr>
  <tr>
    <th>Nachbedingung Fehler</th>
    <td>
    </td>
  </tr>
  <tr>
    <th>Klassifizierung</th>
    <td>
    </td>
  </tr>  <tr>
    <th>Aufwand</th>
    <td>
    </td>
  </tr>
</table>

### Template NFA

<table>
  <tr>
    <th>ID</th>
    <td></td>
  </tr>
  <tr>
    <th>Name</th>
    <td></td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td></td>
  </tr>
  <tr>
    <th>Klassifizierung</th>
    <td>
    </td>
  </tr>
</table>


