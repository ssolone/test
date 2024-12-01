

array_a = [4,5,6,8]
array_b = [2,3,1,0]
array_c = [4,7,2,3]

result = []

for a in array_a:
  for b in array_b:
    for c in array_c:
      result.append(a+b+c)

result=list(set(result))

print(result)
