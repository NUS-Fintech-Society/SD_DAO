# Workflow guide

## **Introduction**

This Workflow Guide documents the team's agreed upon standardization of workflow
practices to adhere to in the development of the project.

## **Project Management**

The team will follow a modified version of the
[Scrum workflow](https://www.scrumstudy.com/whyscrum/scrum-phases-and-processes).
We will have two weekly sprints meetings where we decide on what features to start development on.

## **Branching Workflow**

The team will adopt the
[Feature branch workflow](https://nus-cs2103-ay2021s2.github.io/website/se-book-adapted/chapters/revisionControl.html#feature-branch-flow).
In general, before working ona new issue, an individual will first update their
local master branch with the master branch of the remote repository. Then a
feature branch will be created and later on pushed to the remote repository for
PR into the main branch. Typically, the command to do so would be as such (the
second step is only necessary for the first time):

```
git checkout master
git remote add origin https://github.com/NUS-Fintech-Society/SD_DAO
git fetch origin
git merge origin/master
git checkout -b jovan/authentication
git push
```

## **Issues**

Apart from listing user stories, issues will be used as the primary way to track
in detail the tasks being worked on. When adding new issues, the following
format will be adhered to:

- Issues will be labelled with a type and priority (e.g. task,
  p.High)

## **Pull Requests (PR)**

For code that is ready to be merged, a pull request will be opened from the
working branch to the main branch of the remote repository. In addition, all
pull requests will have the following format:

- PRs will be labelled with only a priority label (e.g. p.High)
- PRs will have no assignees which defaults to the author of the PR
- PRs will link clearly at the bottom of the PR message the issue it will
  address (e.g. Closes #34)
- PRs will need to pass all CI checks and require approval of at least one
  reviewer before merging
- PRs will be merged by the PR author after an approval from a reviewer
- PRs may be merged by the reviewer if given the PR authors permission.

## **Reviews**

Reviews may be done by any members of the team except for the PR author. An
approval will be given only when the PR is deemed fully ready to be merged.
Reviewers may give comments on how to improve the code but not edit the PR
authors branch directly. We included a label called "JUST MERGE IT" that can
be tagged to a PR by the PR author. Thus if the reviewer sees such label, he/she
can immediately merge the PR after approval. This is to reduce unnecessary wait
time.

## **Unfinished Work**

If there is any unfinished work/ work that needs to be improved upon, add the
keyword `//to-do` behind it followed by a comment on the actions that need to be
pursued afterwards. An example is as follows:

`//to-do work on adding more Tests`

Optionally, the author may write their name behind to signal that they will be
continuing work on this `//to-do` so that other members do not write unnecessary
code. An example would be as follows:

`//to-do Jun Xiong work on adding more Tests`
