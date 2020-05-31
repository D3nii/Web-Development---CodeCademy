let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ['really', 'very', 'basically'];

let unnecessaryWords = ['extremely', 'literally', 'actually'];

let x=0, y=0, z=0;

let storyWords = story.split(' ');

let betterWords = storyWords.filter(x => {
  for(let i=0; i<storyWords.length; i++) {
  for(let j=0; j<unnecessaryWords.length; j++) {
    if(storyWords[i]==unnecessaryWords[j]) {
      return story[i];
    }
  }
}
});

for(let i=0; i<storyWords.length; i++) {
    if('really'==storyWords[i])
      x++;
    else if('very'==storyWords[i])
      y++;
    else if('basically'==storyWords[i])
      z++;
}

console.log(`The number of sentences is ${story.split('.').length}.`);

console.log(`The number of words is ${story.split(' ').length}.`);

console.log(`"really" is used ${x} times.`);
console.log(`"very" is used ${y} times.`);
console.log(`"basically" is used ${z} times.`);

console.log(betterWords.join(' '));


