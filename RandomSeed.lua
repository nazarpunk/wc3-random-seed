---@class RandomSeed
RandomSeed = {}
RandomSeed.__index = RandomSeed;

local data = {}
for i = 0, 10 do
    data[i] = 0;
end

for i = 0, 1000000 do
    local v = math.floor(math.random() * 11)
    data[v] = data[v] + 1
end

print('{')
for k, v in pairs(data) do
    print(k, ':', v, ',')
end
print('}')