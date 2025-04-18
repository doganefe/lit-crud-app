import {LitElement, html, css} from 'lit';

export class NotFoundPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      margin-top: 2rem;
    }
  `;

  render() {
    return html`<h2>Page Not Found</h2>`;
  }
}

window.customElements.define('not-found-page', NotFoundPage);
