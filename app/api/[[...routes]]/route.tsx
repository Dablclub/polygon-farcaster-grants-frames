/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Polygon - Farcaster Frames Grants',
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

const baseUrl = process.env.VERCEL_URL
  ? 'https://polygon-farcaster-grants-frames.vercel.app'
  : 'http://localhost:3000';

app.frame('/', (c) => {
  return c.res({
    image: `${baseUrl}/images/frame-0.png`,
    intents: [
      <Button action="/not-building">no</Button>,
      <Button action="/building">yes</Button>,
    ],
  });
});

app.frame('/building', (c) => {
  return c.res({
    image: `${baseUrl}/images/yes-path/frame-1-yes.png`,
    intents: [
      <Button action="/not-tried-frames">not yet</Button>,
      <Button action="/has-tried-frames">yes</Button>,
    ],
  });
});

app.frame('/has-tried-frames', (c) => {
  return c.res({
    image: `${baseUrl}/images/yes-path/frame-2-yes.png`,
    intents: [
      <Button action="/polygon-frames-grants">1) what</Button>,
      <Button action="/polygon-frames-grants">i love cows</Button>,
    ],
  });
});

app.frame('/not-tried-frames', (c) => {
  return c.res({
    image: `${baseUrl}/images/yes-path/frame-2-no.png`,
    intents: [
      <Button action="/polygon-frames-grants">1) what</Button>,
      <Button action="/polygon-frames-grants">i love monkeys</Button>,
    ],
  });
});

app.frame('/polygon-frames-grants', (c) => {
  return c.res({
    image: `${baseUrl}/images/yes-path/frame-3.png`,
    intents: [
      <Button action="/applications">i didn't know this!</Button>,
      <Button action="/applications">tell me more</Button>,
    ],
  });
});

app.frame('/applications', (c) => {
  return c.res({
    image: `${baseUrl}/images/yes-path/frame-4.png`,
    intents: [
      <Button.Link href="https://forum.polygon.technology/t/announcing-the-farcaster-frame-innovators-program/19655">
        gimme more info
      </Button.Link>,
      <Button.Link href="https://explorer.gitcoin.co/#/round/137/25">
        click to apply
      </Button.Link>,
    ],
  });
});

app.frame('/not-building', (c) => {
  return c.res({
    image: `${baseUrl}/images/no-path/frame-1.png`,
    intents: [
      <Button action="/no-builder-fren">no</Button>,
      <Button action="/yes-builder-fren">yes</Button>,
    ],
  });
});

app.frame('/yes-builder-fren', (c) => {
  return c.res({
    image: `${baseUrl}/images/no-path/frame-2-yes.png`,
    intents: [
      <Button action="/polygon-frames-grants">i love turtles</Button>,
      <Button action="/polygon-frames-grants">tell me more</Button>,
    ],
  });
});

app.frame('/no-builder-fren', (c) => {
  return c.res({
    image: `${baseUrl}/images/no-path/frame-2-no.png`,
    intents: [
      <Button action="/fake-bye-1">i love sloths</Button>,
      <Button action="/fake-bye-1">1) what</Button>,
    ],
  });
});

app.frame('/fake-bye-1', (c) => {
  return c.res({
    image: `${baseUrl}/images/no-path/frame-3-no.png`,
    intents: [<Button action="/fake-bye-2">thanks!</Button>],
  });
});

app.frame('/fake-bye-2', (c) => {
  return c.res({
    image: `${baseUrl}/images/no-path/frame-4-no.png`,
    intents: [<Button action="/real-bye">idk!</Button>],
  });
});

app.frame('/real-bye', (c) => {
  return c.res({
    image: `${baseUrl}/images/no-path/frame-5-no.png`,
    intents: [
      <Button.Link href="https://warpcast.com/0xpolygon">lfg!</Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
