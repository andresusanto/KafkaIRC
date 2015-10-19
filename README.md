# Kafka IRC
![Kafka IRC](/../screenshoot/screenshoots/twoclients.JPG?raw=true "Kafka IRC")

A simple IRC chat like application that is implemented using NodeJS and Apache Kafka.

## Introduction
1. [What is Apache Kafka?] (http://kafka.apache.org/documentation.html#introduction)
2. [Installing Apache Kafka] (http://kafka.apache.org/documentation.html#quickstart)

This project is a simple IRC Chat-like application that is programmed by using NodeJS and Apache Kafka as a messaging broker. In order to work, this project requires Apache Kafka installed in your system. Please refer to installation manual for kafka installation. Unfortunately, both Apache Kafka and this project might not run on Micrososft Windows. I used RHEL Based Linux to run and test this project. I haven't tested it on Mac though.

## Architecture
Because the usage of sockets is replaced by using a message broker (in this case I used Kafka), the architecture of this project isn't quite like normal client-server chat program. Furthermore, in this project we won't need a server-side program as the client side program could do its job without it. So, the following is the architecture of this project:

![Architecture](/../screenshoot/screenshoots/arch.png?raw=true "Architecture")

**Explanation:**

1. Each client connects directly to Kafka Server.
2. Channels are represented as topics.
3. Each client send or receive messages through kafka servers.

## Requirement
In order to install and run this project, you will need:

1. RHEL Based Linux x64 (might work on other types of linux, haven't tested it in Mac).
2. Apache Kafka 0.8.2+
3. NodeJS 0.9x+
4. kafka-node 0.2+

## Usage
This project requires kafka-node 0.2+. To install it, issue this command: (make sure you have node and npmjs installed in your machine):
```
npm install kafka-node
```
Then, you can run kafkairc by issuing following command:
```
node kafkairc
```

## Test and Execution Results
There are some tests that I've performed to this project. Followings are the results:

### Two Client Test
![Two Clients](/../screenshoot/screenshoots/twoclients.JPG?raw=true "Two Clients")

**Scenario:**

1. First client connected to server and picked a nickname.
2. Second client then joined to the server and picked a nickname.
3. First client joined #IFITB.
4. Both client then joined #Crowd.
5. First client sent a message to all channel that he joined.
6. First client sent a message to #IFITB
7. First cleint sent a message to #Crowd
8. Second client received two messages from Client 1 because he had joined #Crowd and not joined #IFITB.


### Leave Test
![Leave Test](/../screenshoot/screenshoots/leavetest.JPG?raw=true "Leave Test")

**Scenario:**

1. First client leaved #Crowd
2. First client sent messages to all channel
3. Second client didn't receive the message as first client had left #Crowd

### Three Client Test
![Three Clients](/../screenshoot/screenshoots/threeclients.JPG?raw=true "Three Clients")

**Scenario:**

1. Third client joined and pick a nick name
2. Third were members of #IFITB and #EXCLUSIVE. First client was a member of #IFITB. Second client was a member of #EXCLUSIVE. 
3. Third client sent a message to all channel.
4. All client could read the messages as third client was a member of both #IFITB and #EXCLUSIVE.
5. Second client sent a message to #EXCLUSIVE. First client sent a message to #IFITB.
6. Only third client that received BOTH messages as it was a member of #IFITB and #EXCLUSIVE.
7. First and Second client only reads message that they've sent only as they didn't share similar channels.
