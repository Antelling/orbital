# orbital

This is a very naive implementation of gravity between points. There's no calculus or anything, it just computes vectors 
100 times a second. Which gives pretty looking 
results for the first 10 seconds or so, but after that the accumulation of floating point errors kills any patterns. 
