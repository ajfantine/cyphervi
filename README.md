## Inspiration
Reading through the news can sometimes be boring. It's all very same-y and unengaging, and it's hard to find cool new news articles. This solves that by making finding "New News" way more fun!

## What it does
A python script running on a Flask server chooses a random news article, then scrapes it for 3 special "hint" words related to the content of the article. But _uh-oh_, the hint words are hidden! The Chrome browser extension "New News" then hides a button randomly on whatever webpage you're currently browsing, effectively turning your browsing session into a scavenger hunt. Each time you find the button, another hint word is revealed. Once you've uncovered all the words, you're taken to your "New News" article!

## How we built it
We created a chrome extension for the base of the project, since we wanted our application to work on any website. Through this extension, we communicate with a python script running on a Flask server (deployed locally), which is how we scrape the news sites for an article and three hint words, both chosen at random (so your experience is new every time). We use a google chrome API called "storage" to sync the words and article URL to the current user, so hint button progress can be tracked without having to keep the extension open.

## Challenges we ran into
Creating the combo JavaScript-Python program, figuring out how to approach of these new aspects of coding we have never dealt with before, and creating the extension. Making a browser extension was new for both of us, so we ran into plenty of challenges trying to finesse JavaScript into doing what we wanted.

## Accomplishments that we're proud of
Overcoming all of those challenges, and producing an actual chrome extension that pretty much works the way we intended! 

## What we learned
Lots of things! We learned how to scrape websites, alter html, combine two unrelated coding languages, how to create a chrome extension, how to use ngrok (we had to learn what ngrok is first), inject html elements programmatically, all sorts of nonsense about HTTPS and SSL Certificates (which ended up being all but useless), use JavaScript promises (okay maybe we are still working on that one) and a whole lot more.

## What's next for News Game
Randomize everything, including what articles the extension can provide for you. From there, creating a blacklist to prevent the willing spread of disinformation. If we had financial backing, to incorporate a leaderboard in which the person who's discovered the greatest number of articles in any given time gets a more tangible reward: some type of collectible or a small gift card. 
