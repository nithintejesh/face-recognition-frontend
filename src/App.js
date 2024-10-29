// import React, { Component } from 'react';
// import Navigation from './components/Navigation/Navigation';
// import './App.css';
// import { Particles } from 'react-tsparticles';
// import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
// import FaceRecognition from './components/FaceRecognition/FaceRecognition';
// import Rank from './components/Rank/Rank';
// import Clarifai from 'clarifai';
// import InfoModal from './components/InfoModal/InfoModal';
// import SignIn from './components/SignIn/SignIn';
// import Register from './components/Register/Register';
// import axios from 'axios';
// import paper from 'paper';

// // import Particles from 'react-particles-js';
// import { func } from 'prop-types';

// // Initialize Clarifai App with API key from environment variables
// const app = new Clarifai.App({
//   apiKey: process.env.REACT_APP_CLARIFAI_API_KEY,
//   apiEndpoint: process.env.REACT_APP_API_ENDPOINT,
// });

// // Particles options for background effect
// // const particlesOptions = {
// //   particles: {
// //     number: {
// //       value: 30,
// //       density: {
// //         enable: true,
// //         value_area: 800,
// //       },
// //     },
// //   },
// //   interactivity: {
// //     detectsOn: "canvas",
// //     events: {
// //       onHover: {
// //         enable: true,
// //         mode: "repulse",
// //       },
// //       onClick: {
// //         enable: true,
// //         mode: "push",
// //       },
// //       resize: true,
// //     },
// //   },
// // };
// const particlesOptions = {
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// };

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       input: '',
//       imageUrl: '',
//       box: {},
//       clarifaiFaces: [],
//       realFaces: [],
//       faceInfo: [],
//       route: 'signin',
//     };
//   }

//   // Method to handle modal reference
//   modalRef = (obj) => {
//     InfoModal.setVal = obj && obj.handleShow;
//   };

//   // Update input state on change
//   onInputChange = (event) => {
//     this.setState({ input: event.target.value });
//   };

//   // Draw boxes on canvas based on recognized faces
//   drawBoxes = () => {
//     const canvas = document.getElementById("canvas");
//     const image = document.getElementById("inputimage");
//     const width = Number(image.width);
//     const height = Number(image.height);
//     canvas.width = width;
//     canvas.height = height;
//     paper.setup(canvas);


//   this.state.clarifaiFaces.forEach((face, i) => {
//     const box = {
//       x: face.region_info.bounding_box.left_col * width,
//       y: face.region_info.bounding_box.top_row * height,
//       w: (face.region_info.bounding_box.right_col * width) - (face.region_info.bounding_box.left_col * width),
//       h: (face.region_info.bounding_box.bottom_row * height) - (face.region_info.bounding_box.top_row * height),
//     };

//       // this.state.realFaces.push(box);

//       const rect = new paper.Rectangle(box.x, box.y, box.w, box.h);
//       const path = new paper.Path.Rectangle(rect);
//       path.strokeColor = 'blue';
//       path.strokeWidth = 3;
//       path.fillColor = "#ffffff10";

//       // Assign click event for additional information
//       path.onClick = () => this.handlePathClick(i);
//     });

//     paper.view.draw();
//   };

//   // Handle click on face bounding box
//   handlePathClick = (index) => {
//     const faceInfo = this.state.faceInfo[index];
//     let age = '';
//     let gender = '';
//     const appearances = [];
//     // console.log(faceInfo);
//     // console.log(faceInfo);
//     faceInfo.forEach((info) => {
//       if (info.vocab_id === "age_appearance" && age === '') {
//         age = info.name;
//       }
//       if (info.vocab_id === "gender_appearance" && gender === '') {
//         gender = info.name;
//       }
//       if (info.vocab_id === "multicultural_appearance") {
//         appearances.push(info.name);
//       }
//     });

//     InfoModal.setVal(faceInfo);
//     document.getElementById("age").innerHTML = "Age: " + age;
//     document.getElementById("gender").innerHTML = "Gender: " + gender;
//     document.getElementById("appearences").innerHTML = "Appearances:<br/><br/>" + appearances.join(", ");
//   };

// onButtonSubmit = () => {
//   console.log("Button clicked, starting detection...");
//   this.setState({ imageUrl: this.state.input });
//   console.log("Input for Clarifai:", this.state.input);

//   // Send the image URL to the backend to handle Clarifai API call
//   axios.post('http://localhost:5000/clarifai', {
//       imageUrl: this.state.input // Send the image URL to your backend
//   })
//   .then(response => {
//       // Handle the response received from the backend
//       const data = response.data.predictions.data.concepts;
//       if (data) {
//           data.forEach(concept => {
//               console.log(`Concept: ${concept.name}, Value: ${concept.value}`);
//               // Update your state or do something with the received data
//               this.state.faceInfo.push(concept);
//           });
//       }

//       // Assuming `drawBoxes` uses the face information to display results
//       this.drawBoxes();
//       document.getElementById("invisibletext").style.visibility = "visible";

//       // Check user token validity via your existing backend endpoint
//       console.log(`local storage: ${localStorage.getItem('jwt-token')}`);
//       axios.post('https://face-recognition-backend-nine.vercel.app/api/rank', {
//           token: localStorage.getItem('jwt-token')
//       })
//       .then(res => {
//           console.log("Response of the post code");
//           console.log(res);
//           console.dir(res);

//           // If the token is invalid, redirect to signin
//           if (!res.data.success) {
//               this.props.onRouteChange('signin');
//           }
//       })
//       .catch(err => {
//           console.log(err);
//       });

//   })
//   .catch(err => {
//       console.log("Failed to fetch data from backend:", err);
//   });
// };
// // axios.post('http://localhost:5000/clarifai', {
// //   imageUrl: this.state.input // Send the image URL to your backend
// // })
// // .then(response => {
// //   // Handle the response received from the backend
// //   const clarifaiFaces = response.data.outputs[0].data.regions;
// //   if (clarifaiFaces) {
// //       this.setState({ clarifaiFaces }); // Update state with recognized faces
// //       this.drawBoxes(); // Call to draw bounding boxes on the canvas
// //   }
// //   document.getElementById("invisibletext").style.visibility = "visible";

// //   // Check user token validity via your existing backend endpoint
// //   axios.post('https://face-recognition-backend-nine.vercel.app/api/rank', {
// //       token: localStorage.getItem('jwt-token')
// //   })
// //   .then(res => {
// //       if (!res.data.success) {
// //           this.props.onRouteChange('signin');
// //       }
// //   })
// //   .catch(err => console.log(err));

// // })
// // .catch(err => {
// //   console.log("Failed to fetch data from backend:", err);
// // });
// // };


//   // Route change handler
//   onRouteChange = (route) => {
//     this.setState({ route });
//   };

//   // Render method for the component
//   render() {
//     return (
//       <div className="App">
//         <Particles className='particles' options={particlesOptions} />
//         {
//           this.state.route === "home" ?
//           <div>
//             <Navigation onRouteChange={this.onRouteChange} />
//             <Rank />
//             <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
//             <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
//             <InfoModal ref={this.modalRef} faceInfo={this.state.faceInfo[0]} />
//           </div> :
//           (this.state.route === "signin" ?
//             <SignIn onRouteChange={this.onRouteChange} /> :
//             <Register onRouteChange={this.onRouteChange} />
//           )
//         }
//       </div>
//     );
//   }
// }

// export default App;









// // // import React, { Component } from 'react';
// // // import Navigation from './components/Navigation/Navigation'
// // // import './App.css';
// // // // import Logo from './components/Logo/Logo'
// // // import Particles from 'react-particles-js';
// // // import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
// // // import FaceRecognition from './components/FaceRecognition/FaceRecognition'
// // // import Rank from './components/Rank/Rank'
// // // import Clarifai from 'clarifai'
// // // // import { func } from 'prop-types';
// // // import paper from 'paper';
// // // // import { blue } from 'color-name';
// // // import InfoModal from './components/InfoModal/InfoModal';
// // // import SignIn from './components/SignIn/SignIn';
// // // import Register from './components/Register/Register';
// // // import axios from 'axios';
// // // const app=new Clarifai.App({
// // //   apiKey:"05ea648ab6874377a7384b185058ceb5"
// // // })
// // // const particlesOptions = {
// // //   particles: {
// // //     number: {
// // //       value: 30,
// // //       density: {
// // //         enable: true,
// // //         value_area: 800
// // //       }
// // //     }
// // //   }
// // // }
// // // class App extends Component {
  
// // //   constructor(){
// // //     super();
// // //     this.state={
// // //       input:'',
// // //       imageUrl:'',
// // //       box:{},
// // //       clarifaiFaces: [],
// // //       realFaces: [],
// // //       faceInfo:[],
// // //       route:'signin'
// // //     }
    
// // //   }
// // //   modalRef=(obj)=>{
// // //     InfoModal.setVal=obj&&obj.handleShow;
// // //   }
// // //   onInputChange=(event)=>{
// // //     this.setState({
// // //       input:event.target.value
// // //     })
// // //   }
// // //   drawBoxes=()=> {
// // //     var canvas, ctx;
// // //     const image=document.getElementById("inputimage")
// // //     const width=Number(image.width)
// // //     const height=Number(image.height)
// // //     canvas = document.getElementById("canvas");
// // //     canvas.width=width;
// // //     canvas.height=height;
// // //     paper.setup(canvas);
// // //     // ctx = canvas.getContext("2d");
// // //     // ctx.textBaseline = "top";
  
// // //     for(var i=0; i<this.state.clarifaiFaces.length; i++) {
// // //       this.setState({box : {
// // //         x: this.state.clarifaiFaces[i].left_col * width,
// // //         y: this.state.clarifaiFaces[i].top_row * height,
// // //         w: (this.state.clarifaiFaces[i].right_col * width) - (this.state.clarifaiFaces[i].left_col * width),
// // //         h: (this.state.clarifaiFaces[i].bottom_row * height) - (this.state.clarifaiFaces[i].top_row * height)
// // //       }})
// // //       this.state.realFaces.push(this.state.box);
// // //       var rect=new paper.Rectangle(this.state.box.x,this.state.box.y,this.state.box.w,this.state.box.h);
     
// // //       var path=new paper.Path.Rectangle(rect);
// // //       path.strokeColor = 'blue'
// // //       path.strokeWidth=3;
// // //       path.fillColor= "#ffffff10";
// // //       var x=this;
// // //       (function(index){
// // //         path.onClick=function(e){
// // //           console.log(x.state.faceInfo[index][0].vocab_id);
// // //           var age='';
// // //           var gender='';
// // //           var appearences=[];
// // //           for(var i=0;i<x.state.faceInfo[index].length;i++){
// // //               if(age===''){
// // //                   if(x.state.faceInfo[index][i].vocab_id==="age_appearance")
// // //                       age=x.state.faceInfo[index][i].name;
// // //               }
// // //               if(gender===''){
// // //                   if(x.state.faceInfo[index][i].vocab_id==="gender_appearance"){
// // //                       gender=x.state.faceInfo[index][i].name;
// // //                   }
// // //               }
// // //               if(x.state.faceInfo[index][i].vocab_id==="multicultural_appearance"){
// // //                   appearences.push(x.state.faceInfo[index][i].name);
// // //               }
// // //           }
// // //           InfoModal.setVal(x.state.faceInfo[index]);
// // //           document.getElementById("age").innerHTML="Age:"+age;
// // //           document.getElementById("gender").innerHTML="Gender:"+gender;
// // //           document.getElementById("appearences").innerHTML="Appearences:<br/><br/>"+appearences;
// // //         }
// // //       })(i);
// // //     }
// // //     paper.view.draw();
// // //   }
// // //   onButtonSubmit=()=>{
// // //     this.setState({imageUrl:this.state.input});
// // //     app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input).then(response=>{
// // //       console.log(response);
// // //       var data = response.outputs[0].data.regions;
// // //       if (data !== null) {
// // //         for (var i = 0; i < data.length; i++) {
// // //           this.state.clarifaiFaces.push(data[i].region_info.bounding_box);
// // //           this.state.faceInfo.push(data[i].data.concepts);
// // //         }
// // //       }
// // //       this.drawBoxes();
// // //       var temptext=document.getElementById("invisibletext");
// // //       temptext.style.visibility="visible";
// // //       console.log(this.state.faceInfo);
// // //       axios.post('https://facerecognition-backennd.herokuapp.com/api/rank',{
// // //           token:localStorage.getItem('jwt-token')
// // //         }).then(res=>{
// // //           console.log(res);
// // //             if(!res.data.success){
// // //               this.props.onRouteChange('signin');
// // //             }
// // //         }).catch(err=>{
// // //                 console.log(err);
// // //         })
// // //     }).catch(err=>console.log(err));
    
// // //   }
// // //   onRouteChange=(route)=>{
// // //     this.setState({
// // //       route:route
// // //     })
// // //   }
// // //   render(){
// // //     return (
// // //       <div className="App">
// // //       <Particles className='particles'
            
// // //           />
// // //         {
// // //           this.state.route==="home"?
// // //           <div>
// // //         <Navigation onRouteChange={this.onRouteChange}/>
// // //         {/* <Logo/> */}
// // //         <Rank/>
// // //         <ImageLinkForm 
// // //           onInputChange={this.onInputChange}
// // //           onButtonSubmit={this.onButtonSubmit}
// // //         />
        
// // //         <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
// // //         <InfoModal ref={this.modalRef} faceInfo={this.state.faceInfo[0]}></InfoModal>
// // //         </div>:
// // //         (
// // //           this.state.route==="signin"?
// // //           <SignIn onRouteChange={this.onRouteChange}/>:<Register onRouteChange={this.onRouteChange}/>
// // //         )
// // //         }
// // //       </div>
// // //     );
// // //   }
// // // }

// // // export default App;




// // // import React, { Component } from 'react';
// // // import Navigation from './components/Navigation/Navigation';
// // // import './App.css';
// // // import Logo from './components/Logo/Logo';
// // // import Particles from 'react-particles-js';
// // // import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
// // // import FaceRecognition from './components/FaceRecognition/FaceRecognition';
// // // import Rank from './components/Rank/Rank';
// // // import Clarifai from 'clarifai';
// // // import { func } from 'prop-types';
// // import paper from 'paper';
// // // import { blue } from 'color-name';
// // // import InfoModal from './components/InfoModal/InfoModal';
// // // import SignIn from './components/SignIn/SignIn';
// // // import Register from './components/Register/Register';
// // // import axios from 'axios';
// // // import process from 'process';
// // import React, { Component } from 'react';
// // import Navigation from './components/Navigation/Navigation';
// // import './App.css';
// // import Logo from './components/Logo/Logo';
// // import { Particles } from 'react-tsparticles'; // Updated import
// // import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
// // import FaceRecognition from './components/FaceRecognition/FaceRecognition';
// // import Rank from './components/Rank/Rank';
// // import Clarifai from 'clarifai';
// // import InfoModal from './components/InfoModal/InfoModal';
// // import SignIn from './components/SignIn/SignIn';
// // import Register from './components/Register/Register';
// // import axios from 'axios';

// // const app = new Clarifai.App({
// //   apiKey: process.env.REACT_APP_CLARIFAI_API_KEY,
// //   apiEndpoint: process.env.REACT_APP_API_ENDPOINT // Use the endpoint here
// // });

// // // const particlesOptions = {
// // //   particles: {
// // //     number: {
// // //       value: 30,
// // //       density: {
// // //         enable: true,
// // //         value_area: 800
// // //       }
// // //     }
// // //   }
// // // }
// // const particlesOptions = {
// //   particles: {
// //     number: {
// //       value: 30,
// //       density: {
// //         enable: true,
// //         value_area: 800
// //       }
// //     },
// //     // Add more configurations as needed
// //   },
// //   interactivity: {
// //     detectsOn: "canvas",
// //     events: {
// //       onHover: {
// //         enable: true,
// //         mode: "repulse",
// //       },
// //       onClick: {
// //         enable: true,
// //         mode: "push",
// //       },
// //       resize: true,
// //     },
// //   },
// // };

// // class App extends Component {
// //   constructor() {
// //     super();
// //     this.state = {
// //       input: '',
// //       imageUrl: '',
// //       box: {},
// //       clarifaiFaces: [],
// //       realFaces: [],
// //       faceInfo: [],
// //       route: 'signin'
// //     }
// //   }

// //   modalRef = (obj) => {
// //     InfoModal.setVal = obj && obj.handleShow;
// //   }

// //   onInputChange = (event) => {
// //     this.setState({
// //       input: event.target.value
// //     });
// //   }

// //   drawBoxes = () => {
// //     const canvas = document.getElementById("canvas");
// //     const image = document.getElementById("inputimage");
// //     const width = Number(image.width);
// //     const height = Number(image.height);
// //     canvas.width = width;
// //     canvas.height = height;
// //     paper.setup(canvas);

// //     const boxes = []; // Store all boxes for later use

// //     for (let i = 0; i < this.state.clarifaiFaces.length; i++) {
// //       const box = {
// //         x: this.state.clarifaiFaces[i].left_col * width,
// //         y: this.state.clarifaiFaces[i].top_row * height,
// //         w: (this.state.clarifaiFaces[i].right_col * width) - (this.state.clarifaiFaces[i].left_col * width),
// //         h: (this.state.clarifaiFaces[i].bottom_row * height) - (this.state.clarifaiFaces[i].top_row * height)
// //       };
// //       boxes.push(box); // Store box data
// //       this.state.realFaces.push(box); // Keep track of real faces

// //       const rect = new paper.Rectangle(box.x, box.y, box.w, box.h);
// //       const path = new paper.Path.Rectangle(rect);
// //       path.strokeColor = 'blue';
// //       path.strokeWidth = 3;
// //       path.fillColor = "#ffffff10";

// //       // Pass index to the click handler
// //       path.onClick = (e) => this.handlePathClick(i);
// //     }

// //     paper.view.draw();
// //   }

// //   handlePathClick = (index) => {
// //     const faceInfo = this.state.faceInfo[index];
// //     console.log(faceInfo[0].vocab_id);
// //     let age = '';
// //     let gender = '';
// //     const appearances = [];

// //     for (let i = 0; i < faceInfo.length; i++) {
// //       if (age === '') {
// //         if (faceInfo[i].vocab_id === "age_appearance") {
// //           age = faceInfo[i].name;
// //         }
// //       }
// //       if (gender === '') {
// //         if (faceInfo[i].vocab_id === "gender_appearance") {
// //           gender = faceInfo[i].name;
// //         }
// //       }
// //       if (faceInfo[i].vocab_id === "multicultural_appearance") {
// //         appearances.push(faceInfo[i].name);
// //       }
// //     }

// //     InfoModal.setVal(faceInfo);
// //     document.getElementById("age").innerHTML = "Age: " + age;
// //     document.getElementById("gender").innerHTML = "Gender: " + gender;
// //     document.getElementById("appearences").innerHTML = "Appearances:<br/><br/>" + appearances.join(", ");
// //   }

// //   // onButtonSubmit = () => {
// //   //   this.setState({ imageUrl: this.state.input });
// //   //   app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input).then(response => {
// //   //     console.log(response);
// //   //     const data = response.outputs[0].data.regions;
// //   //     if (data !== null) {
// //   //       for (let i = 0; i < data.length; i++) {
// //   //         this.state.clarifaiFaces.push(data[i].region_info.bounding_box);
// //   //         this.state.faceInfo.push(data[i].data.concepts);
// //   //       }
// //   //     }
// //   //     this.drawBoxes();
// //   //     const temptext = document.getElementById("invisibletext");
// //   //     temptext.style.visibility = "visible";
// //   //     console.log(this.state.faceInfo);
// //   //     axios.post('https://face-recognition-backend-nine.vercel.app/api/rank', { // change the api end point
// //   //       token: localStorage.getItem('jwt-token')
// //   //     }).then(res => {
// //   //       console.log(res);
// //   //       if (!res.data.success) {
// //   //         this.props.onRouteChange('signin');
// //   //       }
// //   //     }).catch(err => {
// //   //       console.log(err);
// //   //     });
// //   //   }).catch(err => console.log(err));
// //   // }
// //   onButtonSubmit = async () => {
// //     try {
// //         this.setState({ imageUrl: this.state.input });

// //         // Call the Clarifai API
// //         const response = await app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input);
// //         console.log(response);

// //         const data = response.outputs[0].data.regions;
// //         if (data) {
// //             const clarifaiFaces = data.map(region => region.region_info.bounding_box);
// //             const faceInfo = data.map(region => region.data.concepts);
            
// //             this.setState({ clarifaiFaces, faceInfo }, () => {
// //                 this.drawBoxes(); // Make sure to call drawBoxes after state is updated
// //             });

// //             document.getElementById("invisibletext").style.visibility = "visible";

// //             // Make the POST request to update rank
// //             const rankResponse = await axios.post('https://facerecognition-backennd.herokuapp.com/api/rank', {
// //                 token: localStorage.getItem('jwt-token')
// //             });

// //             console.log(rankResponse);
// //             if (!rankResponse.data.success) {
// //                 this.onRouteChange('signin'); // Redirect if rank update failed
// //             }
// //         }
// //     } catch (err) {
// //         console.error("Error during API call:", err);
// //         alert("An error occurred while processing your request. Please try again."); // Alert user for errors
// //     }
// // }


// //   onRouteChange = (route) => {
// //     this.setState({
// //       route: route
// //     });
// //   }

// //   render() {
// //     return (
// //       <div className="App">
// //         <Particles className='particles'
// //           params={particlesOptions}
// //         />
// //         {
// //           this.state.route === "home" ?
// //             <div>
// //               <Navigation onRouteChange={this.onRouteChange} />
// //               {/* <Logo/> */}
// //               <Rank />
// //               <ImageLinkForm
// //                 onInputChange={this.onInputChange}
// //                 onButtonSubmit={this.onButtonSubmit}
// //               />
// //               <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
// //               <InfoModal ref={this.modalRef} faceInfo={this.state.faceInfo[0]}></InfoModal>
// //             </div> :
// //             (
// //               this.state.route === "signin" ?
// //                 <SignIn onRouteChange={this.onRouteChange} /> : <Register onRouteChange={this.onRouteChange} />
// //             )
// //         }
// //       </div>
// //     );
// //   }
// // }

// // export default App;
// // // render() {
// // //   return (
// // //     <div className="App">
// // //       <Particles 
// // //         options={particlesOptions} // Update to the new options prop
// // //       />
// // //       {
// // //         this.state.route === "home" ?
// // //           <div>
// // //             <Navigation onRouteChange={this.onRouteChange} />
// // //             {/* <Logo/> */}
// // //             <Rank />
// // //             <ImageLinkForm
// // //               onInputChange={this.onInputChange}
// // //               onButtonSubmit={this.onButtonSubmit}
// // //             />
// // //             <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
// // //             <InfoModal ref={this.modalRef} faceInfo={this.state.faceInfo[0]}></InfoModal>
// // //           </div> :
// // //           (this.state.route === "signin" ?
// // //             <SignIn onRouteChange={this.onRouteChange} /> :
// // //             <Register onRouteChange={this.onRouteChange} />
// // //           )
// // //       }
// // //     </div>
// // //   );
// // // }
// // // }

// // // export default App;








import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import { Particles } from 'react-tsparticles';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import InfoModal from './components/InfoModal/InfoModal';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import axios from 'axios';
import paper from 'paper';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY,
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT,
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      clarifaiFaces: [],
      realFaces: [],
      faceInfo: [],
      route: 'signin',
    };
  }

  modalRef = (obj) => {
    InfoModal.setVal = obj && obj.handleShow;
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  drawBoxes = () => {
    const canvas = document.getElementById("canvas");
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    canvas.width = width;
    canvas.height = height;
    paper.setup(canvas);

    this.state.clarifaiFaces.forEach((boundingBox, i) => {
        // Ensure boundingBox exists before attempting to use it
        if (boundingBox) {
            const box = {
                x: boundingBox.left_col * width,
                y: boundingBox.top_row * height,
                w: (boundingBox.right_col * width) - (boundingBox.left_col * width),
                h: (boundingBox.bottom_row * height) - (boundingBox.top_row * height),
            };

            const rect = new paper.Rectangle(box.x, box.y, box.w, box.h);
            const path = new paper.Path.Rectangle(rect);
            path.strokeColor = 'blue';
            path.strokeWidth = 3;
            path.fillColor = "#ffffff10";

            path.onClick = () => this.handlePathClick(i);
        }
    });

    paper.view.draw();
};


  // handlePathClick = (index) => {
  //   const faceInfo = this.state.faceInfo[index];
  //   let age = '';
  //   let gender = '';
  //   const appearances = [];
    
  //   faceInfo.forEach((info) => {
  //     if (info.vocab_id === "age_appearance" && !age) {
  //       age = info.name;
  //     }
  //     if (info.vocab_id === "gender_appearance" && !gender) {
  //       gender = info.name;
  //     }
  //     if (info.vocab_id === "multicultural_appearance") {
  //       appearances.push(info.name);
  //     }
  //   });

  //   InfoModal.setVal(faceInfo);
  //   document.getElementById("age").innerHTML = `Age: ${age}`;
  //   document.getElementById("gender").innerHTML = `Gender: ${gender}`;
  //   document.getElementById("appearences").innerHTML = `Appearances:<br/><br/>${appearances.join(", ")}`;
  // };
  handlePathClick = (index) => {
    const faceInfo = this.state.faceInfo[index];
    let age = '';
    let gender = '';
    const appearances = [];
    
    faceInfo.forEach((info) => {
        if (info.vocab_id === "age_appearance" && !age) {
            age = info.name;
        }
        if (info.vocab_id === "gender_appearance" && !gender) {
            gender = info.name;
        }
        if (info.vocab_id === "multicultural_appearance") {
            appearances.push(info.name);
        }
    });

    InfoModal.setVal(faceInfo);

    const ageElement = document.getElementById("age");
    const genderElement = document.getElementById("gender");
    const appearancesElement = document.getElementById("appearences");

    if (ageElement) ageElement.innerHTML = `Age: ${age}`;
    if (genderElement) genderElement.innerHTML = `Gender: ${gender}`;
    if (appearancesElement) appearancesElement.innerHTML = `Appearances:<br/><br/>${appearances.join(", ")}`;
};


  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    axios.post('https://face-recognition-backend-nine.vercel.app/clarifai', { imageUrl: this.state.input })
      .then(response => {
        const predictions = response.data.predictions;

        if (predictions) {
          // Extract bounding boxes and concepts based on the response structure
          const clarifaiFaces = predictions.map(prediction => prediction.region_info.bounding_box);
          const faceInfo = predictions.map(prediction => prediction.data.concepts);

          // Update state and call drawBoxes
          this.setState({ clarifaiFaces, faceInfo }, () => this.drawBoxes());
          document.getElementById("invisibletext").style.visibility = "visible";
        }

        axios.post('https://face-recognition-backend-nine.vercel.app/api/rank', {
          token: localStorage.getItem('jwt-token')
        })
        .then(res => {
          if (!res.data.success) {
            this.props.onRouteChange('signin');
          }
        })
        .catch(err => console.log("Token verification error:", err));
      })
      .catch(err => console.log("Failed to fetch data from backend:", err));
  };
  // onButtonSubmit = () => {
  //   this.setState({ imageUrl: this.state.input });
  
  //   // Call the Clarifai API first
  //   axios.post('http://localhost:5000/clarifai', { imageUrl: this.state.input })
  //     .then(response => {
  //       const predictions = response.data.predictions;
  
  //       if (predictions) {
  //         const clarifaiFaces = predictions.map(prediction => prediction.region_info.bounding_box);
  //         const faceInfo = predictions.map(prediction => prediction.data.concepts);
  
  //         // Update state and call drawBoxes
  //         this.setState({ clarifaiFaces, faceInfo }, () => this.drawBoxes());
  //         document.getElementById("invisibletext").style.visibility = "visible";
  
  //         // After successfully processing the image, update the rank
  //         return axios.post('https://face-recognition-backend-nine.vercel.app/api/rank', {
  //           token: localStorage.getItem('jwt-token')
  //         });
  //       } else {
  //         throw new Error("No predictions received.");
  //       }
  //     })
  //     .then(res => {
  //       if (!res.data.success) {
  //         this.props.onRouteChange('signin');
  //       }
  //       // Handle rank response if needed
  //       console.log("Rank updated successfully:", res.data);
  //     })
  //     .catch(err => {
  //       console.error("Error in API call:", err);
  //       alert("There was an error processing your request. Please try again.");
  //     });
  // };
  


  onRouteChange = (route) => {
    this.setState({ route });
  };

  render() {
    return (
      <div className="App">
        <Particles className='particles' options={particlesOptions} />
        {
          this.state.route === "home" ?
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            <InfoModal ref={this.modalRef} faceInfo={this.state.faceInfo[0]} />
          </div> :
          (this.state.route === "signin" ?
            <SignIn onRouteChange={this.onRouteChange} /> :
            <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
