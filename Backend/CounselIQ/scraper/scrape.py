import requests
from bs4 import BeautifulSoup
response = requests.get("https://engineering.careers360.com/colleges/ranking?sort_by=1")
# print(response.text)
content = response.text
soup = BeautifulSoup(content, "html.parser")

college_names = soup.find_all('h3', class_= 'college_name')
link_tags = []
for i in college_names:
    link_tags.append(i.find('a', href = True))
engineering_links = []
for i in link_tags:
    engineering_links.append(i.get('href'))
ratings = soup.find_all('p', class_ = 'college-rank-rating')
fees_list = soup.find_all('li', class_ = 'college-fees-text')
location = []
for i in range(15):
    response = requests.get(engineering_links[i])
    content = response.text
    soup = BeautifulSoup(content, 'html.parser')
    location.append(soup.find_all('div', class_ = 'bannerTags')[0])
engineering_dict = {"Name":[],"Ratings": [], "Fees": [], 'Location':[]}
# print(ratings)

ratings_list = []
for i in range(3,len(ratings),4):
    ratings_list.append(ratings[i])

# print(ratings_list)

for i in range(15):
    engineering_dict['Name'].append(college_names[i].text.strip())
    engineering_dict['Fees'].append(fees_list[i].text.split()[1].strip())
    engineering_dict['Ratings'].append(ratings_list[i].text.strip())
    engineering_dict['Location'].append(location[i].text.strip())

import pandas as pd
df = pd.DataFrame(engineering_dict)
df

import requests
from bs4 import BeautifulSoup
response = requests.get("https://medicine.careers360.com/colleges/ranking")
# print(response.text)
content = response.text
soup = BeautifulSoup(content, "html.parser")

college_names = soup.find_all('h3', class_= 'college_name')
link_tags_m = []
for i in college_names:
    link_tags_m.append(i.find('a', href = True))
medical_links = []
for i in link_tags_m:
    medical_links.append(i.get('href'))
ratings = soup.find_all('p', class_ = 'college-rank-rating')
fees_list = soup.find_all('li', class_ = 'college-fees-text')
location = []
for i in range(10):
    response = requests.get(medical_links[i])
    content = response.text
    soup = BeautifulSoup(content, 'html.parser')
    location.append(soup.find_all('div', class_ = 'bannerTags')[0])
medical_dict = {"Name":[],"Ratings": [], "Fees": [], 'Location':[]}
# print(ratings)

ratings_list = []
for i in range(3,len(ratings),4):
    ratings_list.append(ratings[i])

# print(ratings_list)


for i in range(10):
    medical_dict['Name'].append(college_names[i].text.strip())
    medical_dict['Fees'].append(fees_list[i].text.split()[1].strip())
    medical_dict['Ratings'].append(ratings_list[i].text.strip())
    medical_dict['Location'].append(location[i].text.strip())

import pandas as pd
med_df = pd.DataFrame(medical_dict)
med_df

import requests
from bs4 import BeautifulSoup
response = requests.get("https://university.careers360.com/colleges/ranking?sort_by=1&exam=9384&stream=")
# print(response.text)
content = response.text
soup = BeautifulSoup(content, "html.parser")

college_names = soup.find_all('h3', class_= 'college_name')
link_tags_o = []
for i in college_names:
    link_tags_o.append(i.find('a', href = True))
other_links = []
for i in link_tags_o:
    other_links.append(i.get('href'))
ratings = soup.find_all('p', class_ = 'college-rank-rating')
fees_list = soup.find_all('li', class_ = 'college-fees-text')
location = []
for i in range(5):
    response = requests.get(other_links[i])
    content = response.text
    soup = BeautifulSoup(content, 'html.parser')
    location.append(soup.find_all('div', class_ = 'bannerTags')[0])
others_dict = {"Name":[],"Ratings": [], "Fees": [], 'Location':[]}
# print(ratings)

ratings_list = []
for i in range(3,len(ratings),4):
    ratings_list.append(ratings[i])

# print(ratings_list)


for i in range(5):
    others_dict['Name'].append(college_names[i].text.strip())
    others_dict['Fees'].append(fees_list[i].text.split()[1].strip())
    others_dict['Ratings'].append(ratings_list[i].text.strip())
    others_dict['Location'].append(location[i].text.strip())

import pandas as pd
others_df = pd.DataFrame(others_dict)
others_df

final_df = pd.concat([df, med_df, others_df], ignore_index=True)
final_df.to_csv("combined.csv", index=False)