var util = require('util');
var tools = require('./client-tools.js');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (_text) {
	var command = _text.trim();
	
	if (command.substring(0, 5) == '/exit')
		process.exit(0);
	
	
	if (tools.nick == ''){
		if (command.substring(0, 5) == '/nick'){
			var param = command.substring(5, command.length).trim();
			
			tools.reg(param);
		}else{
			console.log('You must choose your nick first!');
		}
	}else{
		
		if (command.substring(0, 5) == '/join'){
			console.log('Sending join request, please wait ...');
			var param = command.substring(5, command.length).trim();
			
			tools.subscribe(param);
			
		}else if (command.substring(0, 6) == '/leave'){
			console.log('Sending leave request, please wait ...');
			var param = command.substring(6, command.length).trim();
			
			tools.unsubscribe(param);
			
		}else if (command.substring(0, 1) == '@'){
			var msg_format = /@(\w+) ([\w\W]+)/;
			var msg_intent = msg_format.exec(command);
			
			console.log('Sending message to #' + msg_intent[1] + ', please wait ...');
			
			tools.sendto(msg_intent[1], msg_intent[2]);
			
		}else if (command.substring(0, 5) == '/read'){
			if (tools.messages.length > 0){
				console.log("  -- NEW MESSAGES --");
				tools.messages.forEach(function(element){
					console.log(element);
				});
				console.log("  -- END MESSAGES --");
				tools.messages.splice(0,tools.messages.length);
			}else{
				console.log("  -- No new message --");
			}
		}else{ // broadcast message
			console.log('Sending message to all #channel, please wait ...');
			
			tools.sendall(command);
		}
	}
});

console.log('Kafka IRC - (C) 2015 by 13512028 - Andre Susanto');
console.log('IF4031 - Pengembangan Aplikasi Terdistribusi');
console.log('--------------------------------------------------');
