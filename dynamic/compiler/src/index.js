import DynamicComponentSource from './example2'; // TO:DO Replace with process.env.COMPONENT_SOURCE_PATH

if (window.parent) {
  window.parent[process.env.COMPONENT_NAME] = DynamicComponentSource;
  const elem = window.parent.document;
  const event = elem.createEvent('Event');
  event.initEvent(`component${process.env.COMPONENT_NAME}Loaded`, false, true);
  elem.dispatchEvent(event);
}
