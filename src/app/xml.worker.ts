import xml2js from 'xml2js';
/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  xml2js.parseString(data, (err, result) => {
    if (err) {
      postMessage({ error: err });
    } else {
      postMessage(result);
    }
  });
});
