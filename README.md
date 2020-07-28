# logfjs

Simple JavaScript logging library. 
A regular log message follow the pattern: [timestamp] [class_name] [level] : [message]. 
For example: 2020-06-28T10:00:00:00 Index.js [INFO]: Hello world! 
    
### Include functionality:
- Timestamps: 2020-06-28T10:00:00:00
- Class names: Index.js
- Logger notifications levels: [TRACE], [DEBUG], [INFO], [WARN], [ERROR]

## Installation
Simple import logfjs release in your html file:
``` 
    <script src="logfjs.prod.js"> </script>
```
And you can create  logger object: 
    In JS files:
```
    import {LogfjsFactory} from './LogfjsFactory.js';
    Import {Logfjs} from './Logfjs.js';
    
    class ANY_CLASS_NAME {
    ...
        static LOGGER = LogjfsFactory.getLogger("ANY_CLASS_NAME");
    ...
    }
```
   In .html files / browser console :
```   
    const LOGGER = LogfjsFactory.getLogger("Firefox console");
```

Simply use log methods: trace(), debug(), info(), warn(), error() to log your message in any logger notification levels.
For examle:
```
    LOGGER.info("Hello world!"); // Output: "Current timestamp ANY_CLASS_NAME [INFO]: Hello wordl!"
```

## Configuration
For any configuration purposes use [LogfjsCustomizer](src/LogfjsCustomizer.js) class.
### Minimum logger notifications level
You can set minimum logger notifications levels for cut debug output. Logger notifications levels hierarchy:
| Levels |
| ------ |
| ERROR |
| WARN |
| INFO |
| DEBUG |
| TRACE |
Available logger levels are in [LogfjsLoggerLevels](src/LogfjsLoggerLevels.js) enum class:
```
LogfjsCustomizer.setLoggerLevel(LogfjsLoggerLevels.DEBUG); // Logs with [TRACE] level do not prints;
```
To apply settings you must [apply custom settings](README.md#Apply-custom-settings).
### Timestamp mode 
You can set custom timestamp modes:
| Mode | Description | Print |
| ---- | ----------- | ----- |
| NONE | Do not print timestamp | "" |
| ONLY_TIME | Print only time  | 10:00:00:0 |
| ONLY_DATE | Print only date | 2020-06-28 |
| FULL | Print date and  time | 2020-06-28T10:00:00:00 |
Available timestamp modes are in [LogfjsTimestampMode](src/LogfjsTimestampMode.js) enum class.
```
    LogfjsCustomizer.setTimestampMode(LogfjsTimestampMode.FULL); // Print full timestamp;
```
To apply settings you must [apply custom settings](README.md#Apply-custom-settings).
### Apply custom settings
To apply custom settings you need initialize your custom config:
```
LogfjsCustomizer.initialize();
```