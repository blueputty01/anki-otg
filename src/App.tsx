import "./App.css";
import * as React from "react";
// import ReactDOM from "react-dom";

class InsertCard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      Card: "",
      Extra: "",
      Tags: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.shortcutHandler = this.shortcutHandler.bind(this);
    this.Field = this.Field.bind(this);
  }

  Field(props: any) {
    return (
      <div className="field">
        <label htmlFor={props.name}>{props.name}</label>
        <input
          type="text"
          title={props.name}
          name={props.name}
          id="card"
          value={this.state[props.name]}
          onChange={this.handleChange}
          onKeyUp={props.onKeyUp}
          onKeyDown={props.onKeyDown}
        />
      </div>
    );
  }

  handleSubmit(e: React.MouseEvent) {
    console.log(this.state);
  }

  handleChange(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  shortcutHandler(e: KeyboardEvent) {
    // console.log(e);

    const shortcuts = (() => {
      function cloze(e: KeyboardEvent) {
        //find new cloze id
        let i: number = 1;
        let open;
        do {
          open = `{{c${i}::`;
          i++;
        } while (value.indexOf(open) !== -1);

        insertWrap(open, "}}");
      }

      function mathjax(e: KeyboardEvent) {
        insertWrap("\\(", "\\)");
      }

      return { cloze, mathjax };
    })();

    const insertWrap = (open: string, close: string) => {
      const selectionStart = target.selectionStart as number;
      const selectionEnd = target.selectionEnd as number;

      this.setState({
        [name]: wrap(value, selectionStart, selectionEnd, open, close),
      });
      console.log(this.state);

      target.focus();
      const pos =
        Math.max(selectionEnd as number, selectionStart as number) +
        open.length +
        close.length;
      target.setSelectionRange(pos, pos);
    };

    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = this.state[name];

    if (this.state.chord) {
      //handle chords
      if (e.code === "KeyM") {
        shortcuts.mathjax(e);
        e.preventDefault();
      }
    }

    let chord: boolean = false;
    if (e.ctrlKey && e.shiftKey && e.code === "KeyC") {
      console.log(e.cancelable);

      e.preventDefault();
      shortcuts.cloze(e);
    } else if (e.ctrlKey && e.code === "KeyM") {
      e.preventDefault();
      chord = true;
    }

    this.setState({ chord: chord });

    function wrap(
      text: string,
      start: number,
      end: number,
      open: string,
      close: string
    ) {
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
