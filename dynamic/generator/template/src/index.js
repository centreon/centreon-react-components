if (window.parent) {
  import(
    /* webpackChunkName: "COMPONENT_CAPITALIZED_NAME" */ process.env
      .COMPONENT_SOURCE_PATH
  ).then((Component) => {
    window.parent[process.env.COMPONENT_NAME] = Component.default;
    const elem = window.parent.document;
    const event = elem.createEvent('Event');
    event.initEvent(
      `component${process.env.COMPONENT_NAME}Loaded`,
      false,
      true,
    );
    elem.dispatchEvent(event);
  });
}
