const got = require('got');
const util = require('util');
const mm = require('music-metadata'); // music-metadata

const audioUrl = 'https://github.com/Borewit/music-metadata/raw/master/test/samples/MusicBrainz%20-%20Beth%20Hart%20-%20Sinner\'s%20Prayer%20%5Bid3v2.3%5D.V2.mp3';

(async () => {
  try {
    // Stream MP3 sample file from GitHub via HTTP
    const stream = await got.stream(audioUrl).on('response', async response => {
      console.log(response);
      const metadata = await mm.parseStream(stream, {size: parseInt(response.headers['content-length'])})
      stream.destroy();
      console.log(util.inspect(metadata, { showHidden: false, depth: null }));
    });
  } catch(error) {
    // Oops, something went wrong
    console.error(error.message);
  }
})();
