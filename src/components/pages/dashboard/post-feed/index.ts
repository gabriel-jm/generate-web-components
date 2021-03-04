import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types'
import { html, raw } from '/core/templates/index.js'
import postsService, { Post } from '/store/services/posts-service.js'

function PostsFeed(element: Component) {
  const feedPosts = postsService.findAll() as Post[]

  element.select('div').innerHTML = !feedPosts.length
    ? html`<p>No posts yet!</p>`
    : html`${feedPosts.reduce((acc, value) => {
      return raw`${acc.html}<p>${value.content} | ${value.publishingDate}</p>`
    }, raw``)}`
}

generateComponent(PostsFeed, {
  tag: 'posts-feed',
  htmlString: '<div></div>'
})
