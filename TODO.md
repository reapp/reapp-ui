
1. port ref cursors to omniscient
2. port app to omniscient cursors
3. diagram a global pane management solution (ui state cursor)
4. add ability to view user profile in a pane
5. test global pane solution using nested panes (home>article>user)

With immutability you can add in rewind easily... just need to store everything that can be rewound.

What to store: ui + data

UI state
- routes
- "active" elements
- form data
- alerts/notifications
- scroll positions

ui: {
route
element data (visible/scroll pos/sorts/forms)
}

HN
- add refresh button
- add delete article just to test

- pull out ui and release on github

LeftNavView
- Allow all styling to be overridden

Architecture
- store for UI state (zIndex management)
- Extract ENV into plugin