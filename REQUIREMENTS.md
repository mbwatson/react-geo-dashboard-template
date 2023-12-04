# Application Requirements

## Analytic Inights

The interface will be equipped with functionality to answer some specific questions about the data. Some examples of such questions are the following.

1. Which PFAS compounds are present in house dust /tap water/human serum in U.S. homes and at what concentrations?
2. Which substances are detected in paired/multiple environmental and/or biomonitoring samples (e.g., the concentrations of PFOA or PFOS in dust/drinking water/serum at the same location)?
3. How many sources are within 5/10 km from location of dust/tap water/human serum measurements?
4. How many PFAS compounds are detected above detection limit in certain locations (e.g., in NC or in NC + SC)?
5. What percentage of tap water samples/dust have detectable PFAS?
6. What percentage of tap water/dust samples contain a distinctive mixture of PFAS compounds (e.g., containing both PFOS and PFOA)? 

## User Behavior

We'll start by defining some "The user will be able to..." statements.

- The user will be able to **log in to access private areas of the site.**
- The user will be able to **see details about available datasets and related studies contained in the integrated database.**
- The user will be able to **see an overview of the contents of the integrated database via something like summary stats at-a-glance**
  (these are high-level stats, e.g. counts of media types--dust, water, paired samples, etc).
- The user will be able to **filter data contained in the integrated database by attribute(s) and look at results from across datasets/studies.**
- The user will be able to **see at-a-glance stats or similar summaries and/or visualizations of [filtered] data subset.**
- The user will be able to **save filtered results and/or access saved query from one session to another.**
- The user will be able to **download a curated subset of data as CSV.**
- The user will be able to **share curated datasets and visualizations via URL.**

Next we'll group these into similar or related behaviors.
That is, we'll categorize behaviors that are similar or those that may be accomplished on the same portion of the application.

### Access
- Log in to access private areas of the site.

### Landing
- See an overview of the contents of the integrated database via something like summary stats at-a-glance
- See details about available datasets and related studies contained in the integrated database.
  (these are high-level stats, e.g. counts of media types--dust, water, paired samples, etc).
- The user will be able to see at-a-glance stats or similar summaries and/or visualizations of [filtered] data subset.

### Data Curation
- Filter data contained in the integrated database by attribute(s) and look at results (❓as dataviz, table, ?) from across datasets/studies.
- Save filtered results and/or access saved query from one session to another.
- Download a curated subset of data as CSV.
- Share curated datasets and visualizations via URL.

## User Journeys

Next we'll consider the details of the user's journey while carrying out each action.
This is essentially the same list as above, just with more detail.

### Access

#### Log in to access private areas of the site.
  + unauthenticated user arrives on landing page, with reduced access
    * user clicks LOGIN button in top-right of header bar
    * the user is presented with a login form to either
      (1) provide username/password or
      (2) select an IDP for SSO
    * near the bottom of the login form, the unregistered user can find a registration link
      - registration form collects: username, password, name, email address, ...?
      - near the bottom of the registration form, the registered user can find a login link
    * upon login, the user sees:
      - more menu options: analysis, map, ...?
      - application preferences


### Landing

#### See an overview of the contents of the integrated database via something like summary stats at-a-glance

#### See details about available datasets and related studies contained in the integrated database.

#### The user will be able to see at-a-glance stats or similar summaries and/or visualizations of [filtered] data subset.

### Data Curation

#### Filter data contained in the integrated database by attribute(s) and look at results (❓as dataviz, table, ?) from across datasets/studies.

#### Save filtered results and/or access saved query from one session to another.
  + the user curates a subset of data by narrowing results via filters or other means
  + the user locates a SAVE button and clicks it
  + feedback toast informs the user of success (or failure)
  + the user notices a subtle visual indication that their "collection" was updated
    ("collection" is not set terminology, but is shorthand for the set of their saved items)
  + ❓ are we saving the reults or the query?
    * dep: how often are these data changing?

#### Download a curated subset of data as CSV.

#### Share curated datasets and visualizations via URL.
  + the user curates a subset of data by narrowing results via filters or other means
  + the URL updates upon the application of each filter
  + the user locates a SHARE button
    * a modal appears with two URLs for copying-and-pasting
      - one is a link to the application with the current filters applied
      - two is a link to the resulting visualization as PNG (or something else)
      - each link is copyable by clicking a COPY button
      - feedback toast informs the user of success (or failure)
      - the user switches to another application (e.g., slack, another browser window)
      - then pastes the URL for consumption by another user
        + that _other_ user's journey:
          * link type 1:
            - click a shared dataset link
            - browser opens application
              + if already authed, show the result
              + otherwise, stand up login view
          * link type 2:
            - click a shared viz link
            - browser opens raw image
            - ❓ how necessary is this?



### The user will be able to...

#### ...log in to access private areas of the site.

### ...see details about available datasets and related studies contained in the integrated database.
- user

### ...see an overview of the contents of the integrated database via something like summary stats at-a-glance
  (these are high-level stats, e.g. counts of media types--dust, water, paired samples, etc).

### ...filter data contained in the integrated database by attribute(s) and look at results from across datasets/studies.

### ...see at-a-glance stats or similar summaries and/or visualizations of [filtered] data subset.
- this doesn't feel different enough to the preceding item; team insights may clarify.

### ...save filtered results and/or access saved query from one session to another.

### ...download a curated subset of data as CSV.
- 

### ...share curated datasets and visualizations via URL.
