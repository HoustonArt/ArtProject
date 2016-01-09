"""Class to parse and site information from File Structure given as
Artists
    info.json (have artists and ids)
    Artist(name)...
        info.json
        Works
            Work(name)...
                info.json
                pictures(name)
"""
import json
import os
import pprint

def load_json(filename):
    with open(filename) as data_file:
        data = json.load(data_file)
    return data

def fix_name(key, work,x):
    return '../Artists/{0}/{1}/{2}'.format(
        'Artist_' + key,
        'Work_' + work,
        x)
def get_artist_dicts(list_of_keys):
    path = os.getcwd()
    result = []
    for key in list_of_keys:
        new_path = os.path.join(path,'Artist_' + key)
        os.chdir(new_path)
        temp_result = {}
        temp_result.update(load_json('info.json'))
        temp_result['works'] = []
        for i in range(int(temp_result['numWorks'])):
            work_path = os.path.join(new_path, 'Work_' + str(i+1))
            os.chdir(work_path)
            temp_dict = load_json('info.json')
            #now fix up Works
            temp_dict["mainFile"] = fix_name(key,str(i+1),temp_dict['mainFile'])
            for i in range(len(temp_dict['files'])):
                temp_dict['files'][i] = fix_name(key,str(i+1),temp_dict['files'][i])
            temp_result['works'].append(temp_dict)
        result.append(temp_result)
    return result

TEXT = """import {Artist} from './artist';
import {ArtPiece} from './art-piece';
export var ARTISTS: Artist[] =
"""
if __name__ == '__main__':
    root = os.getcwd()
    artists_path = os.path.join(root, 'Artists')
    os.chdir(artists_path)
    index_dict = load_json('info.json')
    sub_dicts = get_artist_dicts(list(index_dict.keys()))
    new_file = os.path.join(os.path.join(root,'app'),'artist-information.ts')
    pp = pprint.PrettyPrinter(indent = 4)
    pp.pprint(sub_dicts)
    with open(new_file,'r') as fp:
        old_data = fp.readlines()
    try:
        with open(new_file,'w') as fp:
            fp.write(TEXT + json.dumps(sub_dicts, indent=4)+';')
        print('SUCCESS')
    except:
        print('Not successful')
        with open(new_file,'w') as fp:
            fp.write(old_data)
