# challanges

Challenges repository
This is an open source project which has Licensed by MIT which allow you to contribute and used open source codes used in this repo (All Branches).
More info: https://g.co/kgs/QWcHhF

  - Branches are named as module[n] and each one of them its unique challenge.
  - Master Branch contain the last solved challenge. (the read me your are reading trough, it is a defult guid when NO challage availabel to help you do a pre-setup.)
  
 # how to use the module and deploy
 
  - Clone the repo and make it own
      # Https url : 
          git clone https://github.com/miladesmailpour/challanges.git
      # ssh url :
          git clone git@github.com:miladesmailpour/challanges.git
      # Checking the fetch/pull and push url : 
          git remote -v
      # Modifing origin url : 
          git remote add origin [https/ssh url of you repo] https://docs.github.com/en/get-started/quickstart/create-a-repo
      # Verifing the fetch/pull and push url : 
          git remote -v https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories
      # Chacking the status of local : 
          git status
          
          "if local NOT updated"
          git add .
          git commit -m "[your comment]"
          git push origin master/main
   
   - Checkout to the module (the challenge you want to used and deploy)
      # Checkout to the disred challage : 
          git checkout module[n]
      # Verifing : 
          git status
      # [Make the change you wish to have]
          What do you think needed to improve?
      # Commiting to local and updating the GitHub repo: 
            git add .
            git commit -m "[your comment]"
            git push origin [your module name]
  - Moving Modules to Master Branch and deploy :
      # Creating a pull request to update the master/main : 
         https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request
      # Deploy through the GitHub : 
         https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

# 05 Third-Party APIs: Work Day Scheduler

## Your Task

Create a simple calendar application that allows a user to save events for each hour of the day by modifying starter code. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

You'll need to use the [Day.js](https://day.js.org/en/) library to work with date and time. Be sure to read the documentation carefully and concentrate on using Day.js in the browser.

## User Story

```md
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```md
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```
