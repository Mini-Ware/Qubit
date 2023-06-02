/**
 * The core server that runs on a Cloudflare worker.
 */

import { Router } from 'itty-router';
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import { NEWS_COMMAND, HELP_COMMAND } from './commands.js';
import { getArticles } from './news.js';
/* import { InteractionResponseFlags } from 'discord-interactions'; */

class JsonResponse extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    super(jsonBody, init);
  }
}

const router = Router();

/**
 * A simple :wave: hello page to verify the worker is working.
 */
router.get('/', (request, env) => {
  return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

/**
 * Main route for all requests sent from Discord.  All incoming messages will
 * include a JSON payload described here:
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
router.post('/', async (request, env) => {
  const { isValid, interaction } = await verifyDiscordRequest(request, env);
  if (!isValid || !interaction) {
    return new Response('Bad request signature.', { status: 401 });
  }

  console.log(JSON.stringify(interaction, null, 2));

  if (interaction.type === InteractionType.PING) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    console.log('Handling Ping request');
    return new JsonResponse({
      type: InteractionResponseType.PONG,
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    // Most user commands will come as `APPLICATION_COMMAND`.
    switch (interaction.data.name.toLowerCase()) {
      case NEWS_COMMAND.name.toLowerCase(): {
        console.log('handling news request');
        const articles = await getArticles();
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            enbeds: [articles]
          },
        });
      }
      case HELP_COMMAND.name.toLowerCase(): {
/*         const applicationId = env.DISCORD_APPLICATION_ID; */
/*         const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${applicationId}&scope=applications.commands`; */

        //creating embed
        const helpEmbed = {
          color: 0x221c35,
          title: 'Qubit',
/*           url: 'https://discord.js.org',
          author: {
            name: 'Some name',
            icon_url: 'https://i.imgur.com/AfFp7pu.png',
            url: 'https://discord.js.org',
          }, */
          description: 'A simple yet powerful space themed discord utility bot',
          thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/826031374766440459/37a324d853cade9ee8fdd5b2b8e40ce7.webp?size=1024',
          },
          fields: [
            {
              name: 'Important Notice',
              value: '> This project is no longer actively maintained, but it will still continue to support a limited set of features. Stay updated about the latest changes on GitHub.',
            },
            {
              name: 'Commands',
              value: '`/help` - list of commands\n`/news` - fetch some articles',
            },
            {
              name: 'Source Code',
              value: 'https://github.com/mini-ware/qubit',
            }
          ],
/*           image: {
            url: 'https://i.imgur.com/AfFp7pu.png',
          }, */
/*           timestamp: new Date().toISOString(),
          footer: {
            text: 'Some footer text here',
            icon_url: 'https://i.imgur.com/AfFp7pu.png',
          }, */
        };

        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [helpEmbed]
/*             content: INVITE_URL,
            flags: InteractionResponseFlags.EPHEMERAL, */
          },
        });
      }
      default:
        console.error('Unknown Command');
        return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
    }
  }

  console.error('Unknown Type');
  return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
});
router.all('*', () => new Response('Not Found.', { status: 404 }));

async function verifyDiscordRequest(request, env) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.text();
  const isValidRequest =
    signature &&
    timestamp &&
    verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
  if (!isValidRequest) {
    return { isValid: false };
  }

  return { interaction: JSON.parse(body), isValid: true };
}

export default {
  /**
   * Every request to a worker will start in the `fetch` method.
   * Verify the signature with the request, and dispatch to the router.
   * @param {*} request A Fetch Request object
   * @param {*} env A map of key/value pairs with env vars and secrets from the cloudflare env.
   * @returns
   */
  async fetch(request, env) {
    return router.handle(request, env);
  },
};
