import subprocess

link = 'https://videos.files.wordpress.com/4eD9bAAb/surpresa_mp4.adaptive_4.m3u8'

subprocess.run(['ffmpeg', '-i', link, 'track.mp4'])