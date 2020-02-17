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

const getStoryKindRegex = () => {
  const singleStoryArgumentIndex = process.argv.indexOf('-story');
  const givenStories = process.argv.slice(singleStoryArgumentIndex + 1);

  if (singleStoryArgumentIndex === -1 || givenStories.length === 0) {
    return null;
  }

  const [componentsToTest] = givenStories;

  return new RegExp(`^(${componentsToTest || ''})$`, 'g');
};

initStoryshots({
  suite: 'Image StoryShots',
  storyKindRegex: getStoryKindRegex(),
  test: imageSnapshot({
    storybookUrl: `file://${__dirname}/../.out`,
    getMatchOptions,
    beforeScreenshot,
  }),
});
