import "./App.css";
import React from "react";
// import ReactDOM from "react-dom";

class InsertCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.shortcutHandler = this.shortcutHandler.bind(this);
    this.Field = this.Field.bind(this);
  }

  Field(props) {
    return (
      <div className="field">
        <label htmlFor={props.name}>{props.name}</label>
        <input
          type="text"
          name={props.name}
          id="card"
          onChange={this.handleChange}
          onKeyDown={props.onKeyDown}
        />
      </div>
    );
  }

  handleSubmit(e) {
    console.log(this.state);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  shortcutHandler(e) {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyC") {
      cloze(e);
      e.preventDefault();
    }

    function cloze(e) {
      insertWrap(e, "{{c1::", "}}");
    }

    function insertWrap(e, open, close) {
      const ele = e.target;
      const text = ele.value;

      const { selectionStart, selectionEnd } = ele;

      ele.value = wrap(text, selectionStart, selectionEnd, open, close);
      ele.focus();
      const pos =
        Math.max(selectionEnd, selectionStart) + open.length + close.length;
      console.log(pos);
      ele.setSelectionRange(pos, pos);
    }

    function wrap(text, start, end, open, close) {
      return (
        text.substring(0, start) +
        open +
        text.substring(start, end) +
        close +
        text.substring(end)
      );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="input">
          <this.Field name="Card" onKeyDown={this.shortcutHandler} />
          <this.Field name="Extra" />
          <this.Field name="Tags" />
          <button id="submit" onClick={this.handleSubmit}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <InsertCard />
    </div>
  );
}

export default App;
