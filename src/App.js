import "./App.css";
import Clap from "./components/Clap";
import Heart2 from "./components/Heart2";
import Lamp from "./components/Lamp";
import Avatar from "./components/Avatar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Monalisa from "./assets/monalisa.jpg"
import Simon from "./assets/face.jpg"
import Hand from "./assets/hand.jpg"
function App() {
  const personPost1  = "https://images.unsplash.com/photo-1634689252880-25c58720284f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80";
  const personName  = "Json";
  return (
    <div className="App">
      <div className="card">
     
          <Avatar img={personPost1} personName={personName}/>
        <div className="carrousel-fotos">
        <Carousel>
                <div className="div-carousel">
                    <img src={Monalisa} id="foto"/>

                </div>
                <div>
                    <img src={Simon} id="foto"/>
            
                </div>
                <div>
                    <img src={Hand}id="foto"/>
                 
                </div>
            </Carousel>
        </div>
        <div className="footer-icons">
          <Clap />
      <Lamp/>
        <Heart2/>
        </div>
      </div>
    </div>
  );
}

export default App;
