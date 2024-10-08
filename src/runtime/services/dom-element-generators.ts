
type ElementBuilder<
  T extends HTMLElement,
  P extends Record<string, (args: unknown) => T | ElementBuilder<T, P>> = {}
> = {
  element: T;
  new: () => ElementBuilder<T, P>;
  classes: (...classes: string[]) => ElementBuilder<T, never>;
  insert: (parent: HTMLElement) => T;
} & P;

type ImageElementBuilder = ElementBuilder<
  HTMLImageElement,
  {
    src: (src: string) => ImageElementBuilder;
  }
>;

export const ImageElementBuilder = {
  new: function (): ImageElementBuilder {
    this.image = document.createElement("img");
    return this;
  },
  src: function (src: string): ImageElementBuilder {
    this.image.src = src;
    return this;
  },
  classes: function (...classes: string[]): ImageElementBuilder {
    this.image.classList.add(...classes);
    return this;
  },
  insert: function (parent: HTMLElement): HTMLImageElement {
    parent.appendChild(this.button);
    return this.button;
  },
};

type AnchorElementBuilder = ElementBuilder<
  HTMLAnchorElement,
  {
    href: (href: string) => AnchorElementBuilder;
    text: (text: string) => AnchorElementBuilder;
  }
>;

export const AnchorElementBuilder = {
  new: function (): AnchorElementBuilder {
    this.anchor = document.createElement("a");
    return this;
  },
  text: function (text: string): AnchorElementBuilder {
    this.anchor.textContent = text;
    return this;
  },
  href: function (href: string): AnchorElementBuilder {
    this.anchor.href = href;
    return this;
  },
  classes: function (...classes: string[]): AnchorElementBuilder {
    this.anchor.classList.add(...classes);
    return this;
  },
  insert: function (parent: HTMLElement): HTMLAnchorElement {
    parent.appendChild(this.anchor);
    return this.anchor;
  },
};

type FlexBoxElementBuilder = ElementBuilder<
  HTMLDivElement,
  {
    direction: (direction: "row" | "column") => FlexBoxElementBuilder;
    backgroundColor: (color: string) => FlexBoxElementBuilder;
    justifyContent: (
      justifyContent:
        | "start"
        | "center"
        | "end"
        | "space-around"
        | "space-between"
        | "space-evenly"
    ) => FlexBoxElementBuilder;
    alignItems: (
      alignItems: "start" | "center" | "end" | "stretch" | "baseline"
    ) => FlexBoxElementBuilder;
  }
>;

export const FlexBoxElementBuilder = {
  new: function (): FlexBoxElementBuilder {
    this.flexBox = document.createElement("div");
    return this;
  },
  backgroundColor: function (color: string): FlexBoxElementBuilder {
    this.flexBox.style.backgroundColor = color;
    return this;
  },
  direction: function (direction: "row" | "column"): FlexBoxElementBuilder {
    this.flexBox.style.flexDirection = direction;
    return this;
  },
  justifyContent: function (
    justifyContent:
      | "start"
      | "center"
      | "end"
      | "space-around"
      | "space-between"
      | "space-evenly"
  ): FlexBoxElementBuilder {
    this.flexBox.style.justifyContent = justifyContent;
    return this;
  },
  alignItems: function (
    alignItems: "start" | "center" | "end" | "stretch" | "baseline"
  ): FlexBoxElementBuilder {
    this.flexBox.style.alignItems = alignItems;
    return this;
  },
  classes: function (...classes: string[]): FlexBoxElementBuilder {
    this.flexBox.classList.add(...classes);
    return this;
  },
  insert: function (parent: HTMLElement): HTMLDivElement {
    parent.appendChild(this.flexBox);
    return this.flexBox;
  },
};
