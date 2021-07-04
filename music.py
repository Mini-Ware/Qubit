import discord
from discord.ext import commands
import os

client = commands.Bot(command_prefix="q!")

@client.command()
async def play(ctx):
    voiceChannel = ctx.author.voice.channel
    voice = discord.utils.get(client.voice_clients, guild=ctx.guild)
    if voice.is_connected():
        await ctx.send("Already connected to a voice channel")
    else:
        await voiceChannel.connect()
    if voice.is_playing():
      await ctx.send("Music is currently playing")
    else:
      voice.play(discord.FFmpegPCMAudio("radio/song.m4a"))
      await ctx.send("Playing music")

@client.command()
async def leave(ctx):
    voice = discord.utils.get(client.voice_clients, guild=ctx.guild)
    if voice.is_connected():
        await voice.disconnect()
    else:
        await ctx.send("Not connected to a voice channel")
    await ctx.send("Leaving")

client.run(os.getenv("APIKEY"))
from keep_alive import keep_alive
keep_alive()
