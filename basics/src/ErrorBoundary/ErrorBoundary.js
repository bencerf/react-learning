import { useState } from "react";

const errorBoundary = (props) => {
  const [state, setState] = useState({
    hasError: false,
    errorMessage: "",
  });

  const componentDidCatch = (error, info) => {
    setState({
      hasError: true,
      errorMessage: error,
    });
  };

  if (state.hasError) {
    return <h1>{state.errorMessage}</h1>;
  } else {
    return props.children;
  }
};

export default errorBoundary;