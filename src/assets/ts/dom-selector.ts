export const $ = <T extends HTMLElement>(
  selector: string,
  context: Document | HTMLElement = document
) => {
  const element = context.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
};

export const $$ = <T extends HTMLElement>(
  selector: string,
  context: Document | HTMLElement = document
) => {
  const elements = context.querySelectorAll<T>(selector);

  if (!elements) {
    throw new Error(`Elements not found: ${selector}`);
  }

  return elements;
};
