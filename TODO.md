- finish card view horizontal and vertical
- extract scroller parts
- use scroller parts in viewlists, etc

- icons from ionic

- redo scroller with physics library from that guy
- then,
- search bar under title
- pull to refresh
- swipe list items to side

roadmap
- dont use omniscient, take out pieces of it
  - direct integration with react, but
  - pre-mixed in:
    - cursor shouldComponentUpdate
- stores

UI state
- all elements attributes
- routes
- scroll positions

HN
- frosted glass headers
- swipe right to add to "read later"
- add refresh button


// module.exports = ImmutableView('Articles', {
//   stores: ['Articles', 'HotArticles'],
//   props: {
//     views: [
//       { id: 'hot', title: 'Hot', content: null },
//       { id: 'top', title: 'Top', content: null }
//     ]
//   },
//   renderComponent: Articles
// });

// for each store we can define a "loaded" function on it
// when we add stores under immutableviews it will automatically listen
// to make sure that it's loaded
// we may need to tie the loaded function to the route....
