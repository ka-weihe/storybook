import { createElement, render } from 'rax';
import * as DriverDOM from 'driver-dom';

import { document } from 'global';
import dedent from 'ts-dedent';

const rootElement = document ? document.getElementById('root') : null;

export default function renderMain({
  storyFn,
  kind,
  name,
  showMain,
  showError,
}: // forceRender,
{
  storyFn: Function;
  kind: string;
  name: string;
  showMain: () => any;
  showError: (input: { title: string; description: string }) => void;
}) {
  const Element = storyFn;

  if (!Element) {
    showError({
      title: `Expecting a Rax element from the story: "${name}" of "${kind}".`,
      description: dedent`
        Did you forget to return the Rax element from the story?
        Use "() => (<MyComp/>)" or "() => { return <MyComp/>; }" when defining the story.
      `,
    });
    return;
  }

  showMain();

  // @ts-ignore
  render(createElement(Element), rootElement, {
    driver: DriverDOM,
  });
}
