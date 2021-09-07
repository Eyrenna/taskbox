import '../src/index.css';
export const parameters = {   //'parameters' used to control the behaviour of Storybook's features and addons
                              //'actions' allows us to create callbacks that appear in the actions panel of the Storybook UI when clicked
  actions: { argTypesRegex: "^on[A-Z].*" }, //Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
