import React, { Component } from 'react';

class Modal extends Component {
  render() {
    const {
      title, body, state, close,
    } = this.props;
    const styleModal = { display: state ? 'block' : 'none' };
    const cnModal = ['modal', state ? 'show' : 'fade'].join(' ');

    return (
      <div className={cnModal} style={styleModal} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ title }</h5>
              <button type="button" className="close" onClick={close}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              { body }
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={close}>Close</button> */}
              {/* <button type="button" className="btn btn-primary" onClick={action}>Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
