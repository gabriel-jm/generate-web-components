import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types'
import { css, html, raw } from '/core/templates/index.js'
import postsService, { Post } from '/store/services/posts-service.js'
import userService from '/store/services/user-service.js'

function PostsFeed(element: Component) {
  const feedPosts = postsService.findAll() as Post[]

  element.select('div').innerHTML += !feedPosts.length
    ? html`<p>No posts yet!</p>`
    : html`${feedPosts.reduce((acc, value) => {
        const { content, publishingDate, userId } = value
        const user = userService.find(userId)

        return raw`
          ${acc.html}
          <app-post
            content="${content}"
            publishing-date="${publishingDate}"
            username="${user ? user.name : ''}"
          />
        `
      }, raw``)}`
}

generateComponent(PostsFeed, {
  tag: 'posts-feed',
  htmlString: '<div></div>',
  cssString: css`
    div {
      display: flex;
      margin: 12px 0;
      gap: 12px;
      justify-content: flex-start;
      align-items: center;
    }

    app-post {
      margin-bottom: 12px;
    }
  `
})
