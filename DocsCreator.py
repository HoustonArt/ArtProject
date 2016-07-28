from markdown2 import Markdown
import os
import json
from collections import OrderedDict

def get_all_markdown():
    _ans = {}
    for file in os.listdir("docs"):
        if file.endswith('.md'):
            with open('docs/' + file,'r') as f:
                _ans[file.split('.md')[0]] = f.read()
    return _ans
    
def convert_markdown(_dict):
    _md = Markdown()
    ans = {}
    for key, item in _dict.items():
        ans[key] = _md.convert(item)
    return ans
    
def sort_dictionary(dic):
    """create ordered dictionary with alphebetical keys from
    dict
    """
    keys = sorted(list(dic.keys()))
    out = OrderedDict()
    for key in keys:
        out[key] = dic[key]
    return out
    
        
    
HEADER = 'export var DOCS: string[] = {0};'

if __name__ == '__main__':
    files_dict = get_all_markdown()
    html_dict = sort_dictionary(convert_markdown(files_dict))
    out = HEADER.format(json.dumps(html_dict))
    with open('./app/docs.ts','w') as fp:
        fp.write(out)
    
    sort_dictionary(html_dict)