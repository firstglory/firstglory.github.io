from PIL import Image
import copy
import json

img = Image.open("land.png")
data = img.getdata()
x = data.size[0]
y = data.size[1]
print('x =', x, 'y =', y)

lsts = []
for j in range(y):
	lst = []
	for i in range(x):
		if data[j*x+i][0]:
			lst.append(0)
		else:
			lst.append(1)
	lsts.append(copy.deepcopy(lst))

for i in range(y):
	print(lsts[i])

with open('data.txt', 'w') as outfile:
    json.dump(lsts, outfile)
