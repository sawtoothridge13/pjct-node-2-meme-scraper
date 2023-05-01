// Import dependencies

import fs from 'node:fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const path = './memes';

fs.access(path, (err) => {
  // Check whether or not the directory exists
  if (err) {
    // If the directory doesn't exist, create it
    fs.mkdir(path, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('New Directory created successfully !!');
      }
    });
  } else {
    console.log('Given Directory already exists !!');
  }
});

// Send a request to website using fetch for html data
fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((res) => res.text())
  .then((body) => {
    const $ = cheerio.load(body);

    // Fetch first 10 meme images from img URL and save them:
    for (let i = 0; i < 10; i++) {
      const memeImage = $('img')[i].attribs.src;

      fetch(memeImage).then((res) => {
        // Save each image and rename to a destination path
        const filename = (i + 1).toString().padStart(2, '0') + '.jpg';
        const newFilePath = './memes/' + filename;

        const dest = fs.createWriteStream(newFilePath);
        res.body.pipe(dest);
      });
    }

    console.log('Download successful');
  });

//* ******************Trial and Error Code*********************/

/* const imgUrls = [];

const html = await axios.get(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const $ = cheerio.load(html.data); */

/*
const imgs = $('div');
imgs.each(function () {
  const image = $(this).find('img').attr('src');

  imgUrls.push(image);
}); */

/* import { promises as fs } from 'fs';

const downloadImage = async (url, path) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = buffer.from(arrayBuffer);
  await fs.writeFile(path, buffer);
};

await downloadImage('https://sabe.io/images/saturn.png', './saturn.png'); */
//* ************************************************************** */
