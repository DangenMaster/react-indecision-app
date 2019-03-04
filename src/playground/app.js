class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.state = {
      options: props.options
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnMount() {
    console.log('componentWillUnMount!');
  }

  handleOnSubmit(option) {
    if (this.state.options.indexOf(option) === -1) {
      this.setState((state) => ({ options: state.options.concat(option) }));
    }
  }

  handleDeleteOption(optionValue) {
    this.setState((prevState) => ({
      options: prevState.options.filter(option => option !== optionValue)
    }));
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';
    return(
      <div>
        <Header subtitle={subtitle} />
        <Action />
        <Options 
          options={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
          handleDeleteOptions={this.handleDeleteOptions} />
        <AddOption handleOnSubmit={this.handleOnSubmit}  />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
}

const Action = () => {
  return (
    <button>What should I do?</button>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
        {
        props.options.length > 0 ? (
          <ol>
            {
              props.options.map((option, i) => (
                <Option 
                  key={i} 
                  option={option}
                  handleDeleteOption={props.handleDeleteOption} />
              ))
            }
          </ol>
        ) : null
      }
    </div>
  );
};

const Option = (props) => {
  return (
    <li>
      {props.option}
      <button onClick={(e) => {
        //e.preventDefault();
        props.handleDeleteOption(props.option)
      }}>
        Remove
      </button>
    </li>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    if (option) {
      this.props.handleOnSubmit(option);
      e.target.elements.option.value = '';
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" name="option" />
          <button>Add option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));