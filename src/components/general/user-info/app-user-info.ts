import { generateComponent } from '/core/component-factory/index.js'
import { UserInfo } from './app-user-info-actions.js'
import { css } from '/core/templates/index.js'

generateComponent(UserInfo, {
  tag: 'app-user-info',
  cssPaths: ['css/styles.css'],
  cssString: css`
    .more {
      color: white;
      height: 24px;
      cursor: pointer;
      outline: 0;
      position: relative;
      border-radius: 4px;
      transition: all 0.3s;
    }
    
    .more:focus {
      background-color: #7778;
    }
    
    .user-options {
      --scale: 0;
    
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: white;
      border: 0;
      border-radius: 4px;
      box-shadow: 0 1px 2px #3335;
      color: #333;
      list-style: none;
      padding: 8px 0;
      transform: scale(var(--scale));
      transform-origin: top right;
      transition: transform 0.18s;
    }
    
    .user-options.show {
      --scale: 1;
    }
    
    .user-options li {
      font-size: 0.95rem;
      padding: 4px 16px;
      transition: all 0.3s;
    }
    
    .user-options li:hover {
      background-color: #eee;
    }  
  `
})
