import {
  figmaMapping,
  type BaseFigmaProps,
  html,
} from "@builder.io/dev-tools/figma";
import HeaderComposition from "src/components/HeaderComposition.vue";

// ❖ IconCard/Header
interface FigmaIconCardHeaderProps extends BaseFigmaProps {
  Title?: string;
}

// Read more at https://www.builder.io/c/docs/mapping-functions
export default figmaMapping({
  componentName: "IconCard/Header",
  componentKey: "e036b21a0418f163a9deba3e0f581b95d62165fa",
  mapper(figma: BaseFigmaProps) {
    // Find main sections
    const menuOptions = figma.$findOneByName("Menu Options");
    const shoppingCart = figma.$findOneByName("Shopping Cart");
    const signInButton = figma.$findOneByName("Sign In Button");
    const logo = figma.$findOneByName("SHOPAHOLIC");

    return html`
      <${HeaderComposition}>
        <nav class="header-nav">
          <!-- Logo Section -->
          <div class="logo-section">${logo?.$textContent ?? "SHOPAHOLIC"}</div>

          <!-- Menu Options -->
          <div class="menu-options">
            ${menuOptions?.$children.map(
              (item) => html`
                <a href="#" class="menu-link"> ${item?.$textContent} </a>
              `,
            )}
          </div>

          <!-- Actions Section -->
          <div class="actions-section">
            ${shoppingCart
              ? html`
                  <button class="cart-button">
                    <span class="sr-only">Shopping Cart</span>
                  </button>
                `
              : ""}
            ${signInButton
              ? html`
                  <button class="sign-in-button">
                    ${signInButton.$findOneByName("SIGN IN")?.$textContent ??
                    "SIGN IN"}
                  </button>
                `
              : ""}
          </div>
        </nav>
      <//>
    `;
  },
});
