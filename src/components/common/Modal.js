import React from 'react';
import Modal from 'react-modal';

const CommonModal = (props) => (
  <Modal 
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
    contentLabel="Selected option"
    closeTimeoutMS={50}
    className="modal"
    ariaHideApp={false} >
    <h3 className="modal__title">Selected option</h3>
    {!!props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
    <button 
      className="button"
      onClick={props.handleClearSelectedOption} >
      Okay
    </button>
  </Modal>
);

export default CommonModal;