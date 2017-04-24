from PIL import Image
import copy
import json

img = Image.open("map4.png")
data = img.getdata()
x = data.size[0]
y = data.size[1]
print('x =', x, 'y =', y)

colorlist = [(255,255,255), (208,181,0), (0,153,0), (0,120,120), (0,130,130), (0,194,194), (255,0,0), (127,127,127), (78,255,0), (0,148,235), (252,115,0), (255,97,171), (127,150,245)]

# 0 = ocean
# 1 = land
# 2 = forest
# 3 = mountain
# 4 = image mountain
# 5 = big mountain
# 6 = volcano
# 7 = rock
# 8 = grass
# 9 = statue
# 10 = light trees
# 11 = hidden gun in stone
# 12 = hidden item underground

lsts = []
for j in range(y):
	lst = []
	for i in range(x):
		for k in range(len(colorlist)):
			if (data[j*x+i][0], data[j*x+i][1], data[j*x+i][2]) == colorlist[k]:
				lst.append(k)
				break
	lsts.append(copy.deepcopy(lst))

for i in range(y):
	print(lsts[i])

with open('data.txt', 'w') as outfile:
    json.dump(lsts, outfile)

