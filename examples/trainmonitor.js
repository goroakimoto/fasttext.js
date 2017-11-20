/**
 * FastText.js
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 * @copyright Copyright (c) 2017 Loreto Parisi
*/

"use strict";

(function() {

var DATA_ROOT='./data';
var FastText = require('../lib/index');

var trainCallback = data => {
    console.log(JSON.stringify( data ) )
    if(data.progress % 20 == 0) { // every 10%
        console.log(JSON.stringify( data ) )
    }
};

var fastText = new FastText({
    debug: false,
    trainCallback: trainCallback,
    train: {
        // number of concurrent threads
        thread: 8,
        // verbosity level [2]
        verbose: 4,
        // number of negatives sampled [5]
        neg: 5,
        // loss function {ns, hs, softmax} [ns]
        loss: 'ns',
        // learning rate [0.05]
        lr: process.env.TRAIN_LR || 0.05,
        // change the rate of updates for the learning rate [100]
        lrUpdateRate: 100,
        // max length of word ngram [1]
        wordNgrams: process.env.TRAIN_NGRAM || 1,
        // minimal number of word occurences
        minCount: 1,
        // minimal number of word occurences
        minCountLabel: 1,
        // size of word vectors [100]
        dim: process.env.TRAIN_DIM || 100,
        // size of the context window [5]
        ws: process.env.TRAIN_WS || 5,
        //  number of epochs [5]
        epoch: process.env.TRAIN_EPOCH || 20,
        // number of buckets [2000000]
        bucket: process.env.TRAIN_BUCKET || 2000000,
        // min length of char ngram [3]
        minn: 3,
        // max length of char ngram [6]
        maxn: 6,
        // sampling threshold [0.0001]
        t: 0.0001
    },
    serializeTo: DATA_ROOT + '/band_model', // do not specify ext: 'bin' will be added
    trainFile: DATA_ROOT + '/band_train.txt'
});

fastText.train()
.then(done=> {
    console.log("train done.");
})
.catch(error => {
    console.error("train error",error);
})

}).call(this);