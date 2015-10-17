var kafka = require('kafka-node');

var c_sender = new kafka.Client();
var c_receiver = new kafka.Client();
var c_offset = new kafka.Client();

var producer = new kafka.Producer(c_sender);
var consumer = new kafka.Consumer(c_receiver, [], {autoCommit: false, fromOffset: true});
var offset = new kafka.Offset(c_offset);

module.exports = {
	nick : '',
	messages : [],
	subscriptions : [],
	
	reg : function (nick){
		this.nick = nick;
		var messages = this.messages;
		consumer.on('message', function (message) {
			messages.push('[' + message.topic + '] \t' + message.value);
		});
		console.log("Nick changed to " + nick);
	},
	
	subscribe : function (channel){
		var subscriptions = this.subscriptions;
		
		if (subscriptions.indexOf(channel) != -1){
			console.log("You are already a member of " + channel);
			return;
		}
		
		producer.createTopics([channel], false, function (err, data) {
			offset.fetch([{ topic: channel, partition: 0, time: -1, maxNum: 1 }], function (err, data) {
				consumer.addTopics([{ topic: channel, offset: data[channel]['0'][0]}], function (err, added) {
					console.log("You have been subscribed to " + channel);
					subscriptions.push(channel);
				}, true);
			});
			
		});

	},
	
	unsubscribe : function (channel){
		var subscriptions = this.subscriptions;
		
		if (subscriptions.indexOf(channel) == -1){
			console.log("You are not a member of " + channel);
			return;
		}
		
		consumer.removeTopics([channel], function (err, removed) {
			console.log("You have been unsubscribed to " + channel);
			subscriptions.splice(subscriptions.indexOf(channel), 1);
		}, true);
		
	},
	
	sendto : function(channel, message){
		msg = this.nick + " : " + message;
		data_to_send = [{ topic: channel, messages: msg, partition: 0 }];
		producer.send(data_to_send, function (err, data) {
			console.log("Message sent to " + channel + "!");
		});
	},
	
	sendall : function(message){
		msg = this.nick + " : " + message;
		this.subscriptions.forEach(function (ch){
			data_to_send = [{ topic: ch, messages: msg, partition: 0 }];
			producer.send(data_to_send, function (err, data) {
				console.log("Message sent to " + ch + "!");
			});
		});
	}
	
};