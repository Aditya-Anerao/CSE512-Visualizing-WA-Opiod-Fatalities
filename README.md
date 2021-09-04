# Washington State Counties Opioid-Incident Age-Adjusted Fatality Rates  
**Team Members:** Aditya Anerao, Maggie Dorr, Chethan Jujjavarapu, Andrew Teng  
  
[Visualization Link](https://cse512-19s.github.io/A3-Opioid-Fatalities/)  
  
## Introduction  
### Background  
The opioid epidemic has reached such monumental proportions, and has been declared a national emergency. In 2015, Washington State had 718 fatalities due to opioid overdoses, exceeding the number of deaths due to car accidents. Our group chose to focus on county-level data for the state, given the clustering-based nature of the opioid epidemic.  

### Data  
The dataset was obtained from the Washington State Department of Health’s [Washington Tracking Network](https://fortress.wa.gov/doh/wtn/WTNPortal/home/#!q0=1429). We chose the data which includes age-adjusted rates per 100,000 people for fatal overdoses from all opioids, prescription and illicit, between 2000 and 2017, stratified by Washington State counties. According to the website, the deaths were collected based on the following case definition:  
  
&nbsp;&nbsp;&nbsp;&nbsp;Deaths with any of the following ICD-10 codes as an underlying cause of death:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X40-X44: Accidental poisonings by drugs  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X60-X64: Intentional self-poisoning by drugs  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X85: Assault by drug poisoning  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Y10-Y14: Drug poisoning of undetermined intent  
&nbsp;&nbsp;&nbsp;&nbsp;AND with any of the following ICD-10 contributing cause-of-death codes:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T40.0: Opium  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T40.1: Heroin  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T40.2: Natural and semisynthetic opioids  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T40.3: Methadone  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T40.4: Synthetic opioids, other than methadone  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T40.6: Other and unspecified narcotics  

### TopoJSON Generation  
In addition to obtaining the raw data from the Washington State Department of Health, we had to generate a TopoJSON file for the state. We first obtained a ShapeFile from the [United States Census Bureau website](https://www.census.gov/cgi-bin/geo/shapefiles/index.php), which contained geographic data for all the counties within the United States. To narrow it down to only counties within Washington State, we used [QGIS](https://www.qgis.org/en/site/), an open source geographic information tool, to give us our state ShapeFile. From there, we used [MapShapper](https://mapshaper.org/) to convert ShapeFile of Washington State counties to TopoJSON.  

### Data Processing  
The visualization created for this assignment displays opioid fatalities in every county of the state of Washington from 2000 to 2017. Specifically, the opioid fatalities were visualized as the age-adjusted rates per 100,000 people as a way to standardize between areas with different populations, as well as changing populations over time. Age-adjusted rates, as opposed to crude rates, were used to increase representativeness because they account for areas in which one age group may dominate a population. Fatality data could be saved as .csv files in one, three and five year intervals. While binning the years makes the visual slightly less informative and detailed, it limits the number of counties were the data was labeled “not reliable” or “NR.” The source did not explain what constitutes an “NR” data point, but it is likely related to small sample size or too small of a proportion relative to total population of the county. Our group decided on three-year bins, rather than individual years, to reduce the number of counties that were “not reliable” by a factor of two.  

  
## Visualization  
### Design Rationale  
Our group met in-person to first decide on a topic. Most of our group members had an interest in Public Health, and given the ongoing opioid epidemic combined with availability of data, we chose opioid fatalities as the subject of our visualization project. We decided our intended audience would likely be Public Health staff and policy makers, as well as the curious public. Therefore, our design should be informative, to interest Public Health professionals, without being overly complex, to avoid confusion among the public. Initially we thought about using a radial bar graph to display the dataset and visualize how fatalities change temporally. However, the group decided that a radial bar graph might be better suited for visualizing data that changes by months or seasons, whereas our dataset contained annual measurements. Washington State has county-level data from the past 18 years, so we decided to start with a map, and then evolve our interactivity via step-based goals. We considered using a shape-map, with overlaid circles to represent population or other variables. Our group was concerned that the circles would overwhelm the graph, and the most important information, fatality rate, would not be as clearly seen by the user. Therefore, we settled on a choropleth map highlighting how opioid fatalities in different counties change as a function of time seemed like the optimal visualization strategy for this dataset.  
  
The primary interactive element of our visualization was incorporating a slider that allows the user to select specific data ranges. As a result, the choropleth map shows changes in the age-adjusted rate in the temporal dimension and the spatial (geographic) dimension. A tooltip feature was the secondary interactive element,  which would display more specific data if the user hovers the mouse over each county. Alternatively, we considered using a tooltip which would display line graphs to show the change over time for each county. We ultimately decided on a slider that more effectively shows changes in rates over time, for individual counties as well as the state as a whole. If our group elects to expand on this visualization for the final project, we plan to explore adding a secondary visualization to the tooltip hover.  


### Development Process    
Once we had decided on the topic and visualized, as described above, we started development. The group development time distribution in people-hours:  
* Topic & Visualization Strategy Selection/optimization: 2 hours  
* Total Data Processing: 3-5 hours  
* Total D3 coding and programming: ~60 hours  
* Other formatting: 2 hours  
  
Although the workload was shared, Aditya handled much of the data processing, Andrew and Chethan did the heavy lifting for D3 coding, and Maggie assited in both areas. Data processing itself was not too tedious because the dataset was downloadable as a csv file for a given year. A master csv file had to be created for all years in the range and involved some minor transformation work. A more challenging task was to adjust elements of the choropleth figure to best represent our data. For example how wide or narrow to set the color range values so as to best highlight trends in the data took some trial and error. Style elements and implementing the slider effectively was also time consuming, especially since most of the group was relatively unfamiliar with D3.js. We also had several initial designs which were based on code we found for other states and projects. For example, we had one visual which successfully implemented a slider, and another which successfully had a hover, but were not combined. However, we eventually opted to start from scratch in order to have a better grasp on the coding and each element of design.  

### Color
The primary encoding channel for visualizing the intensity of age-adjusted rates used in this assignment was color. Color was varied from light to dark hues to represent increased intensity proportional to increased rates of opioid overdose. A color ramp was chosen because it can effectively demonstrate changes in quantitative variables and it can effectively show trends over geographic space. The specific color scale was picked because although each color is of similar hue, they each vary greatly in lightness, which is the most important dimension of color for data representation. Differing shades of red were chosen to visualize the dataset, because red is frequently associated with fatality datasets. However, despite all shades being a red hue, the map still passes the ‘black and white test.’ A more intricate color scheme or design would need to be implemented to represent bivariate data or to show changes in other dimension in addition to temporally. Our group is considering implementing a similar choropleth map for the final project, incorporating more advanced methods for using color as an encoding channel.  


## Resources  
https://fortress.wa.gov/doh/wtn/WTNPortal/home/#!q0=1429  
https://www.atg.wa.gov/opioid-epidemic  
http://www.personal.psu.edu/cab38/ColorSch/ASApaper.html  


## Repo Layout  
All current files are in /doc.  
Previous editions are in /dev for posterity.  

