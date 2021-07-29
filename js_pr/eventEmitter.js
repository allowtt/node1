const EvnetEmitter = require('events');

const custom_event = new EvnetEmitter();

custom_event.on('call', () => console.log('이벤트콜'));

custom_event.removeAllListeners();

custom_event.emit('call');