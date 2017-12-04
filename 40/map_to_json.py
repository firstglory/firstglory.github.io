from PIL import Image
import json

img = Image.open("map.png")
data = img.getdata()
x = data.size[0]
y = data.size[1]


color_list = []

json_data = []
for j in range(y):
    lst = []
    for i in range(x):
        index = x*j + i
        for k in range(len(color_list)):
            if colorlist[k] in (data[index][0], data[index][1], data[index][2]):
                lst.append(k)
                break
    json_data.append(list(lst))

with open('json_data.txt', 'w') as outfile:
    json.dump(json_data, outfile)
