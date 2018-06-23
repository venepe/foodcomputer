# Food computer

This is the [food computer project](https://forum.openag.media.mit.edu/t/300-food-computer/2343) for the Raspberry Pi rewritten in node from the [python project](https://github.com/webbhm/OpenAg-MVP-II/tree/master/MVP).

## Getting started
1.) ```[sudo] npm install forever -g```

2.) ```git clone https://github.com/venepe/foodcomputer```

3.) ```cd foodcomputer```

4.) ```npm install```

5.) ```forever start -c node_modules/.bin/babel-node index.js ```

***Note: forever starts a process which will continuously run in the background.***
