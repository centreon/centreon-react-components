import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const getMatchOptions = () => {
  return {
    failureThreshold: 0.2,
    failureThresholdType: 'percent',
  };
};
const beforeScreenshot = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 600),
  );
};

const idxStoryArg = process.argv.indexOf('-story');
let regexp = null;
if (idxStoryArg !== -1) {
  const storyComponents = process.argv.slice(idxStoryArg + 1);
  const componentsToTest = storyComponents.length > 0 ?
    storyComponents[0].split(' ').join('|') : '';
  regexp = componentsToTest ? new RegExp(`^(${componentsToTest})$`, "g") : null;
}

initStoryshots({
  suite: 'Image StoryShots',
  storyKindRegex: regexp,
  test: imageSnapshot({
    storybookUrl: `file://${__dirname}/../.out`,
    getMatchOptions,
    beforeScreenshot,
  })
});
