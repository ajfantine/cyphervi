# -*- coding: utf-8 -*-
import requests
import random
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from nltk.tokenize import RegexpTokenizer
from bs4 import BeautifulSoup


def generate_words(url):

    stop_words = set(stopwords.words('english'))
    article = url

    page = requests.get(article)

    contents = BeautifulSoup(page.content, 'html.parser' )

    title_elem = contents.find('h1', {'class': 'article-hero__headline f8 f9-m fw3 mb3 mt0 f10-xl founders-cond lh-none'})
    title_text = title_elem.text

    body_elem = contents.find('div', {'class': 'article-body__content'})
    body_text = body_elem.text

    total_words = body_text.split()

    punctuation = RegexpTokenizer(r'\w+')

    words = punctuation.tokenize(body_text)

    for x in range (len(words)):
        words[x] = words[x].lower()

    filtered_text = [w for w in words if w not in stop_words]

    fdist = FreqDist(filtered_text)

    frequency = fdist.most_common(50)

    three_words = random.sample(frequency, 3)

    return [word for word, freq in three_words]

if __name__ == '__main__':

    three_words = generate_words('https://www.nbcnews.com/news/world/inside-egypt-s-3-000-year-old-lost-golden-city-n1263585')
    print(three_words)
