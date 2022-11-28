const options = {
  httpLink: __DEV__
    ? "http://8447bc40d97d.ngrok.io"
    : "https://shareplan-backend.herokuapp.com",
  wsLink: __DEV__
    ? "http://8447bc40d97d.ngrok.io/"
    : "ws://shareplan-backend.herokuapp.com/",
};

export default options;
