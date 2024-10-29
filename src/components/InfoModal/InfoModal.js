// import React, { Component } from 'react'
// import './InfoModal.css'
// import { 
//     // Popover,
//     // Tooltip,
//     Modal
//   } from 'react-bootstrap';
// class InfoModal extends Component{
//     setVal=(data)=>{
//         this.handleShow();
        
//     }
//     constructor(){
//         super();
//         this.setVal=this.setVal.bind(this);
//         this.handleShow = this.handleShow.bind(this);
//         this.handleClose = this.handleClose.bind(this);
//         this.state={
//             show:false
//         }
//         // this.setVal();
//         // console.log(this.state.age);
//     }
//     handleShow() {
//         console.log(this.state)
//         this.setState({ show: true })
//     }
//     handleClose(){
//         this.setState({ show: false })
//     }
//     render() {
    
//         return (
//            <div>
//               <Modal show={this.state.show} animation={true} onHide={this.handleClose} size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered scrollable={true}> 
//               <Modal.Body>
//                    <p id="age">Age:</p>
//                    <p id="gender">Gender:</p>
//                    <p id="appearences">Appearences:</p>
//                  </Modal.Body>
//                  <Modal.Header closeButton>
//                  </Modal.Header>
                 
//               </Modal>
//             </div>
//         )
//       }
//     }
// export default InfoModal;

import React, { Component } from 'react';
import './InfoModal.css';
import { Modal } from 'react-bootstrap';

class InfoModal extends Component {
  constructor(props) {
    super(props);

    // Refs and bindings
    this.modalRef = React.createRef();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setVal = this.setVal.bind(this);

    // Initialize state
    this.state = {
      show: false,
      age: '',
      gender: '',
      appearances: ''
    };
  }

  // Method to update state and show modal
  setVal(data) {
    if (data) {
      const age = data.find(info => info.vocab_id === "age_appearance")?.name || '';
      const gender = data.find(info => info.vocab_id === "gender_appearance")?.name || '';
      const appearances = data
        .filter(info => info.vocab_id === "multicultural_appearance")
        .map(info => info.name)
        .join(', ');

      this.setState({ age, gender, appearances, show: true });
    } else {
      this.handleClose(); // Close modal if no data is passed
    }
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div ref={this.modalRef}>
        <Modal
          show={this.state.show}
          animation={true}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable={true}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p id="age">Age: {this.state.age}</p>
            <p id="gender">Gender: {this.state.gender}</p>
            <p id="appearances">Appearances: {this.state.appearances}</p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default InfoModal;
