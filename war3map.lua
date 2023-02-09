require 'ujapi.asset.RandomSeed'

local rng = RandomSeed:new(10);

for _ = 1, 10 do
    print('uniform: ', rng:uniform());
end
