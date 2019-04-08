import React from "react";

export default class AddOption extends React.Component {
  onFormSubmit = (e) => {
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
        <form className="add-option" onSubmit={this.onFormSubmit}>
          <input className="add-option__input" type="text" name="option" autocomplete="off" />
          <button className="button">Add option</button>
        </form>
      </div>
    );
  }
}
