import React, { JSXElementConstructor, ReactNode } from "react";
import ReactDOM from "react-dom";

class OnClickOutside extends React.Component<{
  children: JSX.Element;
  onClick: () => void;
}> {
  handleClick = (e: any) => {
    const child = ReactDOM.findDOMNode(this);

    if (!child.contains(e.target)) {
      this.props.onClick();
    }
    return;
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  render() {
    return <>{this.props.children}</>;
  }
}
export default OnClickOutside;