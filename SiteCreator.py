"""Program to read out database into site file.
"""
import json
from pymongo import MongoClient
from bson.objectid import ObjectId
import pprint
import os


TEXT = """import {Artist} from './artist';
import {ArtPiece} from './art-piece';
export var ARTISTS: Artist[] =
"""

def generate_new_info():
    client = MongoClient()
    artists = client.artDb.artists
    works = client.artDb.works
    pp = pprint.PrettyPrinter(indent = 4)
    ans = []
    for artist in artists.find():
        artist_id = str(artist['_id'])
        out_dict = {i:artist[i] for i in artist if i!='_id'}
        out_dict['id'] = artist_id
        artist_works = [work for work in works.find({'artist':artist_id})]
        out_dict['numWorks'] = str(len(artist_works))
        out_dict['works'] = [{i:work[i] for i in work if i!='_id' and i!='artist'} for work in works.find({'artist':artist_id})]
        for dic in out_dict['works']:
            dic['artist_fname'] = artist['firstName']
            dic['artist_lname'] = artist['lastName']
            dic['artist_id'] = artist_id
        ans.append(out_dict)
    pp.pprint(ans)
    return ans

def write_out(output):
    root = os.getcwd()
    new_file = os.path.join(os.path.join(root,'app'),'artist-information.ts')
    with open(new_file,'r') as fp:
        old_data = fp.readlines()
    try:
        with open(new_file,'w') as fp:
            fp.write(TEXT + json.dumps(output, indent=4)+';')
        print('SUCCESS')
    except:
        print('Not successful')
        with open(new_file,'w') as fp:
            fp.write(old_data)
if __name__ == '__main__':
    write_out(generate_new_info())
