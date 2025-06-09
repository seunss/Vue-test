import {
  figmaMapping,
  type BaseFigmaProps,
  html,
  ChildrenNode,
} from "@builder.io/dev-tools/figma";
import WelcomeButton from "src/components/WelcomeButton.vue";

// ❖ btn-light
interface FigmaBtnLightProps extends BaseFigmaProps {
  "Show Icon"?: boolean;
  "Button Label"?: string;
  Icon?: ChildrenNode;
  "Chevron-icon"?: ChildrenNode;
  Type?: "Primary" | "Secondary" | "Tertiary" | "Split" | "Neutral";
  State?:
    | "Enabled"
    | "Hover"
    | "Pressed"
    | "Loader"
    | "Disabled"
    | "Destructive";
  Size?: "Large" | "Medium" | "Small" | "XL";
}

// Read more at https://www.builder.io/c/docs/mapping-functions
export default figmaMapping({
  componentName: "btn-light",
  componentKey: "0c4424fb8faf54989f9fe44f692aa7ce5dd95dfd",
  mapper(figma: FigmaBtnLightProps) {
    const showIcon = figma["Show Icon"] ?? false;
    const buttonLabel = figma["Button Label"] ?? "";

    return html`
      <${WelcomeButton}>
        ${showIcon && figma.Icon ? figma.Icon : ""} ${buttonLabel}
      <//>
    `;
  },
});
